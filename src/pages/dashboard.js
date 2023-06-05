import React from 'react';
import AdminSidebarheader from "../components/adminsidebarheader";
import { useSession, getSession } from 'next-auth/react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import DonutChart from '../components/DonutChart';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  console.log("admin",session)
  const router = useRouter();
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  };

  const { data: contacts, error } = useSWR(`/api/contacts/contacts`, fetcher);

  useEffect(() => {
    if (!session || session.user.role !== 'ADMIN') {
      setShowUnauthorized(true);
      setTimeout(() => {
        router.replace('/');
      }, 3000); // Delay of 3 seconds before redirection
    }
  }, [session, router]);

  if (error) return <div>Error loading contacts.</div>;
  if (!contacts) return <div>Loading contacts...</div>;

  // No of contacts in DB
  const totalContacts = contacts ? contacts.length : 0;
   // Calculate the length of contacts with status "Sent"
  const totalCardsSent = contacts ? contacts.filter((contact) => contact.status === "Sent").length : 0;

  // Calculate the length of contacts with status "Pending", null, or empty
  const pending = contacts ? contacts.filter((contact) => !contact.status || contact.status === "Pending" ||contact.status === "pending").length : 0;

  const stats = [
    { name: 'Total Contacts', stat: totalContacts, link: '/totalcontacts' },
    { name: 'Total Cards Sent', stat: totalCardsSent, link: '/sentcards' },
    { name: 'Pending', stat: pending, link: '/sendcards' },
  ];

  const handleButtonClick = (link) => {
    router.push(link);
  };

  return (
    <>
      <AdminSidebarheader />
      <div className="flex flex-1 flex-col lg:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              {showUnauthorized && (
                <div>You are not authorized to access this page.</div>
              )}
              {!showUnauthorized && (
                <>
                  <div className="py-4">
                    <div>
                      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {stats.map((item) => (
                          <button
                            key={item.name}
                            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                            onClick={() => handleButtonClick(item.link)}
                          >
                            <div className="truncate text-sm font-medium text-gray-500">
                              {item.name}
                            </div>
                            <div className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                              {item.stat}
                            </div>
                          </button>
                        ))}
                      </div>
                      <DonutChart
                    totalContacts={totalContacts}
                    totalCardsSent={totalCardsSent}
                    pending={pending}
                  />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
