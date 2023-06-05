import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Totaldatatable(props) {
  const { contacts } = props;
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
const [filteredRows, setFilteredRows] = useState([]);
  const [rows, setRows] = useState([]);
  const rowsPerPage = 10;
  const { data: session } = useSession();

  useEffect(() => {
    // Update the contacts based on the current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = contacts.slice(indexOfFirstRow, indexOfLastRow);
    setRows(currentRows);
  }, [currentPage, contacts]);

  const totalPages = Math.ceil(contacts.length / rowsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="px-6 min-w-full divide-y divide-gray-300">
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
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {rows.map((person) => (
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
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {person.status}
                        </span>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
