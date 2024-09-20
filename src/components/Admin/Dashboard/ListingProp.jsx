import axios from "axios";
import { useEffect, useState } from "react";


function ListingProp() {
        const [allProperties, setAllProperties] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        useEffect(() => {
          const fetchAllUsers = async () => {
            try {
              const response = await axios.get(
                "http://localhost:3001/admin/all-properties"
              );
              console.log(response);

              setAllProperties(response.data.allProperties);
              setLoading(false);
            } catch (error) {
              console.error("Error fetching recent users:", error);
              setError("Failed to load recent users");
              setLoading(false);
            }
          };

          fetchAllUsers();
        }, []);
     console.log(allProperties.booking);
     
     
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto mt-3 ms-3">
      <div className="p-4 font-bold text-lg">All Properties</div>
      {loading ? (
        <p className="text-center p-4">Loading...</p>
      ) : error ? (
        <p className="text-center p-4 text-red-500">{error}</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                rent/sale
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RegularPrice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discountprice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                bathrooms&bedrooms
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allProperties.map((properties) => (
              <tr key={properties._id}>
                <td className="px-6 py-4 ">{properties.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-xs overflow-hidden     ">
                  {properties.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {properties.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {properties.regularPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {properties.discountPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <img
                    src={`http://localhost:3001/${properties.imageUrls[0]}`}
                    alt=""
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {properties.bathrooms}&{properties.bedrooms}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(properties.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListingProp