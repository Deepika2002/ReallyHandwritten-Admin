export default function Datatable(props) {

  const { contacts } = props;

  return (
    <div>



      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                

                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    First Name
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Last Name
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                    Phone
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                    Address
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                    Signed Agent
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contacts.map((person) => (
                  <tr key={person.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {person.firstname}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 ">{person.lastname}</td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 ">{person.phone}</td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{person.email}</td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{person.address}</td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500 sm:pr-6">{person.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>  
          </div>
        </div>
      </div>
    </div>
  )
}
