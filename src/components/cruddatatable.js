import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Cruddatatable(props) {
  const { contacts } = props;

  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState([]);
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();


  
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
          const updatedRows = contacts.map((row) =>
            row.id === editingRow.id ? { ...row, ...editedData } : row
          );
          setRows(updatedRows);
          setEditingRow(null);
          setEditedData({});
        } else {
          console.error("Failed to update contact:", updatedContact.status);
        }
      } else {
        const createdContact = await fetch(`/api/contacts/contacts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        });
        if (createdContact.ok) {
          const updatedRows = await createdContact.json();
          setRows(updatedRows);
          setEditingRow(null);
          setEditedData({});
          loadTableData();
        } else {
          console.error("Failed to create contact:", createdContact.status);
        }
      }
    } catch (error) {
      console.error("An error occurred while saving the contact:", error);
    }
  };

  const handleDelete = async (event, id) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedRows = contacts.filter((row) => row.id !== id);
        setRows(updatedRows);
        loadTableData();
      } else {
        console.error("Failed to delete contact:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while deleting the contact:", error);
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
      const response = await fetch("/api/contacts/contacts"); 
      if (response.ok) {
        const data = await response.json();
        setRows(data);
        
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
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = contacts ? contacts.slice(indexOfFirstRow, indexOfLastRow) : [];

  return (
    <div>
      <div className="mt-8 flow-root">
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
                        {editingRow === person ? (
                          <input
                            type="text"
                            value={editedData.firstname || ""}
                            className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                firstname: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <span>{person.firstname}</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {editingRow === person ? (
                          <input
                            type="text"
                            value={editedData.lastname || ""}
                            className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                lastname: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <span>{person.lastname}</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {editingRow === person ? (
                          <input
                            type="text"
                            value={editedData.phone || ""}
                            className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                phone: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <span>{person.phone}</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {editingRow === person ? (
                          <input
                            type="text"
                            value={editedData.email || ""}
                            className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                email: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <span>{person.email}</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {editingRow === person ? (
                          <input
                            type="text"
                            value={editedData.address || ""}
                            className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                address: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <span>{person.address}</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        {editingRow === person ? (
                          <input
                            type="text"
                            value={editedData.agent || ""}
                            className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6"
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                agent: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <span>{person.agent}</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {person.status}
                        </span>
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

                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={(e) => handleDelete(e, person.id)}
                        >
                          Delete
                        </button>
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
      <div className="mt-4">
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
                    ? 'text-indigo-600 hover:bg-indigo-50'
                    : 'text-gray-500 hover:bg-gray-50'
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
  );
}
