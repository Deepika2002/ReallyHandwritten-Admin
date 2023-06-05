import { Fragment, useState, useEffect } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { ShieldCheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

import { useSession, getSession } from "next-auth/react";

import Link from "next/link";

const product = {
  name: "Everyday Ruck Snack",
  price: "$220",
  rating: 3.9,
  href: "#",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-quick-preview-03-detail.jpg",
  imageAlt:
    "Interior of light green canvas bag with padded laptop sleeve and internal organization pouch.",
  sizes: [
    { name: "18L", description: "Perfect for a reasonable amount of snacks." },
    { name: "20L", description: "Enough room for a serious amount of snacks." },
  ],
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default function SelectTemplate({ openBox, onClose,onPreferenceSelect }) {
  const [open, setOpen] = useState(openBox);

  const [userPreferences, setUserPreferences] = useState([]);
  const [editingPreference, setEditingPreference] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    fetchUserPreferences();
  }, []);

  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(`/api/userpreferences/userpreferences?userId=${session?.user?.id}`);
      if (response.ok) {
        const preferences = await response.json();
        setUserPreferences(preferences);
      } else {
        throw new Error("Failed to fetch user preferences");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTemplate = () => {
    setOpen(false);
    router.push("/stepform");
  };
  const handleClose = () => {
    setOpen(false);
    onClose(); // Call the onClose callback passed from the parent component
  };

  const handleSelectPreference = (preferenceId) => {
    // Find the selected preference by id
    const selectedPreference = userPreferences.find(
      (preference) => preference.id === preferenceId
    );

    // Update the selected state of the preference
    const updatedPreferences = userPreferences.map((preference) =>
      preference.id === preferenceId
        ? { ...preference, selected: true }
        : { ...preference, selected: false }
    );

    setUserPreferences(updatedPreferences);

    onPreferenceSelect(preferenceId); // Call the onPreferenceSelect callback and pass the preference id
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-3xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="flex flex-col bg-white">
                    <div className="flex-1  py-16 px-4 sm:py-24 sm:px-6  lg:px-8">
                      <div className="flex    space-x-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                          My Card Templates
                        </h2>
                        <button
                          onClick={handleCreateTemplate}
                          className="inline-flex items-end px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-900 hover:bg-red-1000 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Create Template
                        </button>
                      </div>
                      <ul className="divide-y divide-gray-100">
                        {userPreferences.map((preference) => (
                          <li
                            key={preference.id}
                            className="flex items-center justify-between gap-x-6 py-5"
                          >
                            <div className="w-full">
                              <div className="items-start gap-x-3">
                                <p className="text-xl font-semibold leading-6 text-gray-900">
                                  {preference.name}
                                </p>
                                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                  <p className="whitespace-nowrap text-lg">
                                    {preference.selectCard}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-none items-center gap-x-4">
                            <button
              onClick={() => handleSelectPreference(preference.id)}
              className={classNames(
                "rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset",
                preference.selected ? "bg-green-500 text-white" : "bg-red-800 text-white ring-red-300 hover:bg-red-900"
              )}
            >
              {preference.selected ? "Selected" : "Select"}
              <span className="sr-only"></span>
            </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
