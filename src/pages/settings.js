import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Sidebarheader from '../components/adminsidebarheader';


export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}



export default function Settings() {
  const { data: session, status } = useSession();
  const router = useRouter()
  const [showUnauthorized, setShowUnauthorized] = useState(false);
  console.log("settings", session)
  const [name, setName] = useState(session?.user?.name || '');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  useEffect(() => {
    if (!session || session.user.role !== 'ADMIN') {
      setShowUnauthorized(true);
      setTimeout(() => {
        router.replace('/');
      }, 3000); // Delay of 3 seconds before redirection
    }
  }, [session, router]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for API request
    const data = {
      name: name,
      email: session?.user?.email || '',
      password: password,
    };
    console.log(data);

    // Make API request to update user details
    fetch('http://localhost:3000/api/user/userapi/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle success response
      })
      .catch((error) => {
        console.error('Error in updating user details', error); // Handle error
      });
  };

  if (status === 'loading') {
    // Render loading state or skeleton UI
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    // Redirect or show appropriate message for unauthenticated users
    return <div>You need to be logged in to access this page.</div>;
  }

  return (
    <>
      <Sidebarheader />

      <div className="flex flex-1 flex-col lg:pl-72">
        <div className="flex-1">
        {showUnauthorized && (
                <div>You are not authorized to access this page.</div>
              )}
              {!showUnauthorized && (
                <>
          <div className="py-6 lg:px-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="name"
                          value={name}
                          id="name"
                          onChange={handleNameChange}
                          autoComplete="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          value={session?.user?.email || ''}
                          readOnly
                          name="email"
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        New Password
                      </label>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          onChange={handlePasswordChange}
                          type="password"
                          autoComplete="password"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center pb-10 gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          </>
              )}
        </div>
        </div>
      </>
    );
  }

