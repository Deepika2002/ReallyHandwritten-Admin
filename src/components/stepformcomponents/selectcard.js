import Image from "next/image";
import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import Sidebarheader from "../sidebarheader";

const nameMethods = [
  {
    id: "$4.47 - Classy Thank You Card",
    title: "$4.47 - Classy Thank You Card",
  },
  {
    id: "$5.60 - Premium Gold Foil Pressed",
    title: "$5.60 - Premium Gold Foil Pressed",
  },
];

const card = [
  {
    name: "$4.47 - Classy Thank You Card",
    price: "$4.47",
    images: [
      {
        id: 1,
        src: "/assets/cardImgs/affordable/first.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 2,
        src: "/assets/cardImgs/affordable/second.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 3,
        src: "/assets/cardImgs/affordable/third.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 4,
        src: "/assets/cardImgs/affordable/forth.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      // More images...
    ],
  },
  {
    name: "$5.60 - Premium Gold Foil Pressed",
    price: "$5.60",
    images: [
      {
        id: 1,
        src: "/assets/cardImgs/premium/first.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 2,
        src: "/assets/cardImgs/premium/second.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 3,
        src: "/assets/cardImgs/premium/third.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
      {
        id: 4,
        src: "/assets/cardImgs/premium/forth.jpg",
        alt: "Angled front view with bag zipped and handles upright.",
      },
    ],
  },
];

export default function SelectCard({
  handleBack,
  handleNext,
  formValues,
  onChange,
}) {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext();
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const filteredCard = card.find((c) => c.name === selectedCard);

  return (
    <>
      <Sidebarheader />
      <h1 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900 lg:pl-64 sm:text-5xl">
        Welcome to Really Handwritten.
      </h1>
      <div className="lg:pl-64 overflow-hidden bg-white">
        <div className="mx-auto max-w-full px-6 pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-full lg:mx-0  lg:flex-shrink-0 lg:pt-8">
           
            <div className="lg:grid lg:grid-cols-2 lg:items-start ">
              <div className="mt-16">
              <p className="mt-8 mb-8 text-2xl font-semibold leading-8 text-gray-900">
              Awesome!
            </p>
                <label className="text-xl font-semibold text-gray-900">
                  Now Choose a Card
                </label>
                <fieldset className="mt-4">
                  <legend className="sr-only">Name method</legend>
                  <div className="space-y-4">
                    <form onSubmit={handleSubmit}>
                      {nameMethods.map((method) => (
                        <div key={method.id} className="flex items-center">
                          <input
                            id={method.id}
                            name="selectCard"
                            type="radio"
                            value={method.id}
                            checked={formValues.selectCard === method.id}
                            onChange={(event) => {
                              setSelectedCard(method.id);
                              onChange(event);
                            }}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor={method.id}
                            className="ml-3 block text-m font-medium leading-6 text-gray-900"
                          >
                            {method.title}
                          </label>
                        </div>
                      ))}
                      <div className="pt-4 flex gap-x-6">
                        <div>
                          <button
                            type="button"
                            onClick={handleBack}
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
             
                <Tab.Group as="div" className="flex md:mt-10 sm:mt-12 flex-col-reverse">
                  <div className="mx-auto mt-6 hidden w-full sm:mt-12  sm:block lg:max-w-none">
                    <Tab.List className="grid grid-cols-4 gap-6">
                      {filteredCard &&
                        filteredCard.images.map((image) => (
                          <Tab
                            key={image.id}
                            className="relative flex h-24 md:max-w-xl cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                          >
                            {({ selected }) => (
                              <>
                                <span className="sr-only">{image.name}</span>
                                <span className="absolute inset-0 overflow-hidden rounded-md">
                                  <Image
                                    src={image.src}
                                    width="500"
                                    height="500"
                                    alt=""
                                    className="h-full w-xl sm:mt-12  object-cover object-center"
                                  />
                                </span>
                                <span
                                  className={classNames(
                                    selected
                                      ? "ring-indigo-500"
                                      : "ring-transparent",
                                    "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </Tab>
                        ))}
                    </Tab.List>
                  </div>

                  <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                    {filteredCard &&
                      filteredCard.images.map((image) => (
                        <Tab.Panel key={image.id}>
                          <Image
                            width="500"
                            height="500"
                            src={image.src}
                            alt={image.alt}
                            className="h-full w-full object-cover object-center sm:rounded-lg"
                          />
                        </Tab.Panel>
                      ))}
                  </Tab.Panels>
                </Tab.Group>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
