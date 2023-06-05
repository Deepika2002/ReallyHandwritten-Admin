import React, { useEffect, useState } from "react";
import AdminSidebarheader from "../../components/adminsidebarheader";
import { useSession, getSession } from "next-auth/react";
import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default function Users() {
  const { data: session, status } = useSession();
  console.log("admin", session);
  const router = useRouter();
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };

  const { data: users, error } = useSWR(`/api/users/users`, fetcher);

  const handleUserClick = (userId) => {
    router.push(`/users/${userId}/contacts`);
  };

  useEffect(() => {
    if (!session || session.user.role !== "ADMIN") {
      setShowUnauthorized(true);
      setTimeout(() => {
        router.replace("/");
      }, 3000); // Delay of 3 seconds before redirection
    }
  }, [session, router]);

  if (error) return <div>Error loading users.</div>;
  if (!users) return <div>Loading users...</div>;

  return (
    <>
      <AdminSidebarheader />
      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="flex-1">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
            </div>
            <div className="px-4 pt-6 sm:px-6 lg:px-8">
              {showUnauthorized && (
                <div>You are not authorized to access this page.</div>
              )}
              {!showUnauthorized && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-red-900 focus-within:ring-offset-2 hover:border-gray-400"
                      >
                        <button
                          type="button"
                          onClick={() => handleUserClick(user.id)}
                          className="min-w-0 flex-1 focus:outline-none"
                        >
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          <p className="text-sm font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="truncate text-sm text-gray-500">
                            {user.role} ({user.contactCount} contacts)
                          </p>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
