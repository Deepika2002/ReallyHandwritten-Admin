import React from "react";
import Sidebarheader from "./sidebarheader";
import Cruddatatable from "./cruddatatable";

export default function DateContacts({ date, contacts }) {
  return (
    <>
      <Sidebarheader />
      <div className="flex flex-1 flex-col lg:pl-64">
        <main className="flex-1">
          <div className="py-6">
            {/* Page title */}
            <div className="px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Contacts for {date.split("T")[0]} at{" "}
                            {date.split("T")[1].split(".")[0]}
              </h1>
            </div>

            {/* Replace with your content */}
            <div className="px-4 sm:px-6 lg:px-8">
              <Cruddatatable contacts={contacts} />
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}
