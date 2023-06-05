import { useState, useRef } from "react";
import csv from "csvtojson";
import Datatable from "./datatable";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

export default function Csvtojson() {
  const [csvData, setCsvData] = useState("");
  const { data: session, status } = useSession();
  const [contacts, setcontacts] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [filename, setFilename] = useState("");
  const inputRef = useRef(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

  const handleRemoveFile = async (event) => {
    event.preventDefault();
    setCsvData("");
    setcontacts(null);
    setErrorMessage(null);
    setFilename(null);
    inputRef.current.value = "";
  };

  async function handleSave() {
    
    console.log("stringified contacts",JSON.stringify(contacts ))

    const response = await fetch(`/api/contacts/contacts?userId=${session?.user?.id}`, {
    
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify(contacts)
      
    });
    console.log("import response", response)
    const { result } = await response.json();
    console.log(result);
  }


  const handleCsvUpload = async (file) => {
    if (!file || !file.name.endsWith(".csv")) {
      setErrorMessage("Invalid file");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("File size exceeds maximum limit");
      return;
    }
    const csvData = await file.text();
    setFilename(file.name);
    try {
      const jsonArray = await csv().fromString(csvData);

      if (jsonArray.length === 0) {
        setErrorMessage("CSV file is empty");
        setcontacts(null);
        return;
      }
      const headers = Object.keys(jsonArray[0]);
      const requiredHeaders = ["firstname", "lastname", "phone", "email", "address", "agent"]; // Replace with your own required headers
      const missingHeaders = requiredHeaders.filter(
        (header) => !headers.includes(header)
      );
      if (missingHeaders.length > 0) {
        setErrorMessage(`Missing headers: ${missingHeaders.join(", ")}`);
        setcontacts(null);
        return;
      }
      setErrorMessage(null);
      setcontacts(jsonArray);
    } catch (error) {
      setErrorMessage("Error converting CSV to JSON");
      setcontacts(null);
    }
  };

  const handleFileInput = (event) => {
    handleCsvUpload(event.target.files[0]);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    setFilename(file.name);
    handleCsvUpload(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        // style={{ padding: '20px', border: dragging ? '2px dashed #000' : 'h-96  border-4 border-dashed border-gray-200' }}
        className={classNames(
          dragging ? "border-gray-400 bg-gray-50" : "border-gray-200",
          "py-10 mt-10 rounded-lg border-4 border-dashed border-gray-200 flex flex-col items-center justify-center"
        )}
      >
        {/* <label htmlFor="csv-file">Select a CSV file:</label>
      <input
        type="file"
        className=""
        id="csv-file"
        accept=".csv"
        onChange={handleCsvFileChange}
      /> */}

        <svg
          className="mx-auto mb-5 h-10 w-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>

        <div className="flex text-sm text-gray-500">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-500 hover:text-indigo-700"
          >
            <span className="text-lg mr-1 ">Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept=".csv"
              onChange={handleFileInput}
              ref={inputRef}
            />
          </label>
          <p className="pl-1 text-lg">or drag and drop</p>
        </div>
        <p className="mt-2 text-xs text-gray-500">CSV files up to 10MB</p>
        <p className="mt-10 text-sm text-indigo-500 underline">
          <a href="/import-contacts-example.csv" download={true}>
            Download example csv file
          </a>
        </p>
      </div>

      {/* {filename && (
          <div className="mt-16 flex items-center justify-center">
            
            <span className="text-lg text">{filename}</span>
            <button
              className="ml-4 flex items-center justify-center text-red-600 text-sm"
              onClick={handleRemoveFile}
            >
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              Delete
            </button>
          </div>
        )} */}

      {errorMessage && (
        <div className="mt-10 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-md font-medium text-red-800">
                Error uploading the file:{" "}
                <span className="font-bold underline">{filename}</span>
              </h3>

              <div className="mt-2 text-sm text-red-700">
                <ul role="list" className="list-disc space-y-1 pl-5">
                  <li>{errorMessage}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {filename && !errorMessage && (
        <div className="rounded-md bg-green-50 p-4 mt-10 ">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="h-5 w-5 text-green-500"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-md font-medium text-green-800">
                Your file has been uploaded:{" "}
                <span className="font-bold underline">{filename}</span>
              </h3>

              <div className="mt-3 text-sm text-green-700">
                <ul role="list" className="list-disc space-y-1 pl-5">
                  <li>
                    Checkout the &apos;Preview&apos; table below and Click on
                    the &apos;Import Contacts&apos; button to save the contacts
                    to your account.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {contacts && (
        <div className="flex flex-col mt-16">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Preview
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the contacts in the file you&apos;ve uploaded.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                className="mt-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                
                onClick={handleSave}
              >
                <ArrowDownTrayIcon
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Submit Contacts
              </button>
            </div>
          </div>

          <Datatable contacts={contacts} />
        </div>
      )}
    </>
  );
}
