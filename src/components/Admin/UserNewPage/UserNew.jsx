import axios from "axios";
import { useEffect, useState } from "react";


function UserNew() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

     useEffect(() => {
       const fetchAllUsers = async () => {
         try {
           const response = await axios.get(
             "http://localhost:3001/admin/total-usersdet"
           );
          console.log(response);
          
           setAllUsers(response.data.allUsers);
           setLoading(false);
         } catch (error) {
           console.error("Error fetching recent users:", error);
           setError("Failed to load recent users");
           setLoading(false);
         }
       };

       fetchAllUsers();
     }, []);
     
     
     
      
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto mt-3 ms-3">
      <div className="p-4 font-bold text-lg">All Users</div>
      {loading ? (
        <p className="text-center p-4">Loading...</p>
      ) : error ? (
        <p className="text-center p-4 text-red-500">{error}</p>
      ) : (
        <table className="min-w-full divide-y border  divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                profile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Password
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 ">
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-12 object-cover h-12 rounded-full sm:w-16 sm:h-16"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500  hidden lg:table-cell">
                  {user.password}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserNew