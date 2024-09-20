import axios from "axios";
import { useEffect, useState } from "react";
import RecentUserTable from "./RecentUserTable";


function Dashboard() {
     const [totalUsers, setTotalUsers] = useState(0);
     const [totalProperties, setTotalProperties] = useState(0);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
       const fetchTotalUsers = async () => {
         try {
           const response = await axios.get(
             "http://localhost:3001/admin/total-user"
           );
           console.log("users",response);
           
           setTotalUsers(response.data.totalUsersCount);
           setLoading(false);
         } catch (error) {
           console.error("Error fetching total users:", error);
           setError("Failed to load users");
           setLoading(false);
         }
       };

       fetchTotalUsers();
     }, []);
       useEffect(() => {
         const fetchTotalProperties = async () => {
           try {
             const response = await axios.get(
               "http://localhost:3001/admin/total-properties"
             );
             setTotalProperties(response.data.totalProperties);
             setLoading(false);
           } catch (error) {
             console.error("Error fetching total users:", error);
             setError("Failed to load users");
             setLoading(false);
           }
         };

         fetchTotalProperties();
       }, []);
       console.log(totalUsers);
       
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 mt-3 ms-3">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm text-gray-500">Total Users</h3>
          {loading ? (
            <p className="text-2xl font-bold">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-2xl font-bold">{totalUsers}</p>
          )}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md ">
          <h3 className="text-sm text-gray-500">Properties Listed</h3>
          {loading ? (
            <p className="text-2xl font-bold">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-2xl font-bold">{totalProperties}</p>
          )}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm text-gray-500">Bookings</h3>
          <p className="text-2xl font-bold">354</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm text-gray-500">Revenue</h3>
          <p className="text-2xl font-bold">$12,000</p>
        </div>
      </div>

      {/* User Table */}
      <RecentUserTable />
    </div>
  );
}

export default Dashboard;
