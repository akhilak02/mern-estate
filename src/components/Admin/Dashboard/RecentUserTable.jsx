import axios from "axios";
import { useEffect, useState } from "react";


function RecentUserTable() {
    const [recentUsers, setRecentUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

      useEffect(() => {
        const fetchRecentUsers = async () => {
          try {
            const response = await axios.get(
              "http://localhost:3001/admin/recent-users"
            );
            setRecentUsers(response.data.recentUsers);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching recent users:", error);
            setError("Failed to load recent users");
            setLoading(false);
          }
        };

        fetchRecentUsers();
      }, []);
      
      
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <div className="p-4 font-bold text-lg">Recent Users</div>
      {loading ? (
        <p className="text-center p-4">Loading...</p>
      ) : error ? (
        <p className="text-center p-4 text-red-500">{error}</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                profile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Password
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 ">
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-16 object-cover h-16 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.password}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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

export default RecentUserTable