import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


function ShowListing() {
const [showListingsErr, setShowListingsErr] = useState(false);
   const { currentUser, token } = useSelector((state) => state.user);
   const[userListings,setUserListings]=useState([])
    const handleShowListings = async () => {
      try {
        setShowListingsErr(false);
        console.log("Current User ID:", currentUser?._id);
        console.log("Token:.....", token);
        const { data } = await axios.get(
          `http://localhost:3001/backend/user/listings/${currentUser?._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-type": "application/json",
            },
          }
        );
        console.log("data",data.listings);
        
        if (data.success) {
            setUserListings(data.listings);
         
          return;
        }
         setShowListingsErr(true);
        
      } catch (error) {
        setShowListingsErr(true);
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error("Error response:", error.response);
          console.error("Status code:", error.response.status);
          console.error("Error data:", error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error("Error request:", error.request);
        } else {
          // Something happened in setting up the request
          console.error("Error message:", error.message);
        }
        console.error(error);
      }
    };

    const handleListingDelete=async(listingId)=>{
        try {
          const { data } = await axios.delete(
            `http://localhost:3001/backend/createlisting/delete/${listingId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          );
          if (data.success) {
           setUserListings((prev)=>prev.filter((listing)=>listing._id!==listingId))
            toast.success("listing deleted successfully")
          }
          console.log(data.message)

          
        } catch (error) {
          console.error(error);
          // res.json({success:false,err_msg:"internam server error"})
        }
    }


  return (
    <>
      <button
        className="text-green-700 w-full font-semibold capitalize m-3"
        onClick={handleShowListings}
      >
        Show Listing
      </button>
      <p className="text-red-700 mt-5 text-sm">
        {showListingsErr ? "Error showing listing" : ""}
      </p>
      {userListings && userListings.length > 0 && (
        <div className=" flex flex-col gap-4">
          <h1 className="text-slate-900 capitalize text-center mt-7 text-3xl font-semibold">
            your listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4 "
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="flex-1 text-slate-700 font-semibold  hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button className="text-red-700" onClick={()=>handleListingDelete(listing._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button className="text-green-700">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ShowListing