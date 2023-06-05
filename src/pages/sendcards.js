import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import AdminSidebarheader from "../components/adminsidebarheader";

const generateCSV = (contacts) => {
  const headers = [
    "First Name",
    "Last Name",
    "Phone",
    "Email",
    "Address",
    "Signed Agent",
    "Status",
    "User Preference ID",
    "User Preference Name",
    "User Preference Welcome Input",
    "User Preference Address Clients",
    "User Preference Endearing Term",
    "User Preference Without Name",
    "User Preference Message Input",
    "User Preference Select Card"
  ];

  // Filter the contacts based on the status
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.status === 'Pending' ||
      contact.status === 'In-Progress' ||
      contact.status === null
  );

  // Create a CSV string with the contact information
  const csvContent = [
    headers.join(","),
    ...filteredContacts.map(
      (contact) =>
        `${contact.firstname},${contact.lastname},${contact.phone},${
          contact.email
        },"${contact.address.replace(/"/g, '""')}",${contact.agent},${
          contact.status
        },${contact.userpreference.id},${contact.userpreference.name},"${
          contact.userpreference.welcomeInput
        }",${contact.userpreference.addressClients},${
          contact.userpreference.endearingTerm
        },"${contact.userpreference.withoutName}","${
          contact.userpreference.messageInput
        }","${contact.userpreference.selectCard}"`
    ),
  ].join("\n");

  // Create a Blob object from the CSV content
  const blob = new Blob([csvContent], { type: "text/csv" });

  // Generate a download link and simulate a click to trigger the download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "contacts.csv";
  link.click();

  // Cleanup the created URL object
  URL.revokeObjectURL(link.href);
};

export default function Sendcards() {
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 10;
  const { data: session } = useSession();

  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };

  const { data:contactsWithUserPreferences, error } = useSWR(`/api/contacts/contacts`, fetcher);

  // console.log("conatcts",data)



  const handleEdit = (person) => {
    setEditingRow(person);
    setEditedData({ ...person });
  };

  const handleSave = async (person) => {
    try {
      if (editingRow) {
        console.log("editing row", editingRow.id);
        const updatedContact = await fetch(`/api/contacts/${editingRow.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData), // Update the request body
        });
        console.log(updatedContact);
        if (updatedContact.ok) {
          const updatedRows = rows.map((row) =>
            row.id === editingRow.id ? { ...row, ...editedData } : row
          );
          setRows(updatedRows);
          setEditingRow(null);
          setEditedData({});

          // Manually invalidate the cache to trigger a revalidation
          mutate(`/api/contacts/contacts?userId=${userId}`);
        } else {
          console.error("Failed to update contact:", updatedContact.status);
        }
      }
    } catch (error) {
      console.error("An error occurred while saving the contact:", error);
    }
  };

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const loadTableData = async () => {
    try {
      const response = await fetch(`/api/contacts/contacts`);
      if (response.ok) {
        const data = await response.json();

        // Filter the contacts based on the status
        const filteredContacts = data.filter(
          (contact) =>
            contact.status === "Pending" ||
            contact.status === "In-Progress" ||
            contact.status === null
        );

        setRows(filteredContacts);
      } else {
        console.error("Failed to fetch table data:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while fetching table data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTableData();
  }, [contactsWithUserPreferences]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows ? rows.slice(indexOfFirstRow, indexOfLastRow) : [];

  if (error) return <div>Error loading contacts.</div>;
  if (!contactsWithUserPreferences) {
    return <div>Loading contacts...</div>;
  }
  const statusOptions = ["In-Progress", "Sent", "Pending"];
  const handleStatusChange = (event) => {
    setEditedData({ ...editedData, status: event.target.value });
  };
  const handleExport = () => {
    generateCSV(contactsWithUserPreferences);
  };
  console.log(currentRows);

  return (
    <>
      <AdminSidebarheader/>
      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="flex-1 py-6">
          <div className=" flex justify-between py-4">
          <div className="px-4  dis sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Send Cards</h1>
          </div>
          <div className="px-4 sm:px-6 lg:px-8">
            <button
              onClick={handleExport}
              className="bg-red-900  text-white px-4 py-2 rounded-md"
            >
              Export Contacts
            </button>
          </div>
          </div>
          <div >
            <div className="mt-8 px-8 flow-root">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5  px-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            First Name
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                          >
                            Last Name
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                          >
                            Phone
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                          >
                            Address
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 "
                          >
                            Signed Agent
                          </th>
                        
                          <th
                            scope="col"
                            className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                          >
                            Status
                          </th>
                        
                          <th
                            scope="col"
                            className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pr-6"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {currentRows.map((person) => (
                          <tr key={person.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              <span>{person.firstname}</span>
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                              <span>{person.lastname}</span>
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                              <span>{person.phone}</span>
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                              <span>{person.email}</span>
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                              <span>{person.address}</span>
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                              <span>{person.agent}</span>
                            </td>
                            
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                              {editingRow === person ? (
                                <select
                                  value={editedData.status}
                                  onChange={handleStatusChange}
                                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                  {statusOptions.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                  {person.status}
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm font-medium sm:pr-6">
                              {editingRow === person ? (
                                <button
                                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                                  onClick={() => handleSave(person)}
                                >
                                  Save
                                </button>
                              ) : (
                                <button
                                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                                  onClick={() => handleEdit(person)}
                                >
                                  Edit
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination */}
            <div className="mt-4 mr-8">
              <nav className="flex justify-end" aria-label="Pagination">
                <div className="relative z-0 inline-flex shadow-sm rounded-md">
                  {/* Previous button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </button>

                  {/* Page numbers */}
                  {pageNumbers.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                        pageNumber === currentPage
                          ? "text-indigo-600 hover:bg-indigo-50"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  {/* Next button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
