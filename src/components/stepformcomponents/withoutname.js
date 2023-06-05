import Image from "next/image";
import React, { useState } from "react";
import Sidebarheader from "../sidebarheader";

const nameMethods = [
  { id: "Client", title: "Client" },
  { id: "Valued Client", title: "Valued Client" },
  { id: "Other", title: "Other" },
];

export default function WithoutName({
  handleBack,
  handleNext,
  formValues,
  onChange,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext();
  };
  return (
    <>
      <Sidebarheader />
      <h1 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900 lg:pl-64 sm:text-5xl">
        Welcome to Really Handwritten.{" "}
      </h1>
      <div className="lg:pl-64 flex overflow-hidden bg-white">
        
        <div className="mx-auto  px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-10">
          <div className="mx-auto lg:mx-0  lg:flex-shrink-0 lg:pt-8">
            <p className="mt-8 text-2xl leading-8 font-semibold text-gray-900">
              Super!
            </p>
            <div className="mt-10">
              <label className="text-base font-semibold text-gray-900">
                If a name isn't included, what should we use a default?
              </label>
              <fieldset className="mt-4">
                <legend className="sr-only">Name method</legend>
                <div className="space-y-4">
                  <form onSubmit={handleSubmit}>
                    {nameMethods.map((method) => (
                      <div key={method.id} className="flex items-center">
                        <input
                          id={method.id}
                          name="withoutName"
                          type="radio"
                          value={method.id}
                          checked={formValues.withoutName === method.id}
                          onChange={onChange}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor={method.id}
                          className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                        >
                          {method.title}
                        </label>
                      </div>
                    ))}
                    <div className="pt-4 flex gap-x-6">
                      <div>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            handleBack();
                          }}
                          className="rounded-md bg-indigo-600 px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Back
                        </button>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </fieldset>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
