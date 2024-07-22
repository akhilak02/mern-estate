

import {  useContext, useState } from "react";
import UploadImage from "./UploadImage";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ImageContext from "../context/ImageContext";
import { useNavigate } from "react-router-dom";

function CreateListing() {


const token=useSelector(state=>state.user.token)
const currentUser=useSelector(state=>state.user.currentUser)
const{uploading}=useContext(ImageContext)
const navigate=useNavigate()
console.log({"currentUser":currentUser,"token":token});



  const[formData,setFormData]=useState({
        name: "",
        description: "",
        address: "",
        type:'rent',
        parking: false,
        furnished: false,
        offer: false,
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        imageUrls: [],

  })
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
console.log( "form data",formData);


const handleChange=(e)=>{
  if(e.target.id==='sale' || e.target.id==='rent'){
    setFormData({...formData,type:e.target.id})
  }
  if(e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='offer'){
    setFormData({...formData,[e.target.id]:e.target.checked})
  }
  if (
    e.target.type === "number" ||
    e.target.type === "text" ||
    e.target.type === "textarea"
  ) {
    setFormData({...formData,[e.target.id]:e.target.value})
  }
}


const handleSubmit=async(e)=>{
e.preventDefault()

try {
  
  if(formData.imageUrls.length<1){
    return setError("You must upload atleast one image")
  }
  if(+formData.regularPrice<+formData.discountPrice){
    return setError("Discount price must be lower than regular price ")
  }
  setLoading(true);
  setError(false)
   const { data } = await axios.post(
     "http://localhost:3001/backend/createlisting/create",
     { ...formData, userRef: currentUser._id },
     {
       headers: {
         Authorization: `Bearer ${token}`,
         Accept: "application/json",
     
       },
     }
   );
   console.log("data",data);
  
           if (data.success) {
             toast.success("successfully create listing");
               setLoading(false);
               setError(data.message);
               navigate(`/createlisting/${data?.listing?._id}`)
          
           } else {
             toast.error(data.err_msg);
              setError(error.message);
           
           }

  
} catch (error) {
  setError(error.message)
  setLoading(false)
}
}
  
  return (
    <div className="p-3 max-w-4xl mx-auto">
      {/* <img
        src="https://plus.unsplash.com/premium_photo-1671269942050-df7e96b3e4ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJlYWxlc3RhdGV8ZW58MHx8MHx8fDA%3D"
        alt=""
        className="w-full object-cover absolute h-full top-0 left-0 -z-10"
      /> */}
      {/* <div className=" bg-black/30 backdrop-blur p-3 z-50"> */}
      <h1 className="text-3xl font-semibold text-center my-7 text-blue-300">
        Create a Listing
      </h1>

      <form
        className="flex flex-col sm:flex-row gap-4 "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            name="name"
            maxLength="62"
            minLength="5"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <textarea
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={formData.type === "sale"}
                onChange={handleChange}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={formData.type === "rent"}
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
                checked={formData.parking}
                onChange={handleChange}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
                checked={formData.furnished}
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                className="w-5"
                checked={formData.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                className="p-3 border border-gray-300 rounded-lg w-28 "
                value={formData.bedrooms}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                className="p-3 border border-gray-300 rounded-lg w-28"
                value={formData.bathrooms}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                name="regularPrice"
                value={formData.regularPrice}
                onChange={handleChange}
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg w-28 "
              />
              <div>
                <p>Regular Price</p>
                {formData.type === "rent" && (
                  <span className="text-sm">(&#8377; /month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="discountPrice"
                  name="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg w-28 "
                  value={formData.discountPrice}
                  onChange={handleChange}
                />
                <div>
                  <p>Discount Price</p>
                  {formData.type === "rent" && (
                    <span className="text-sm">(&#8377; /month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 ms-4">
          <UploadImage formData={formData} setFormData={setFormData} />
          <button
            type="submit"
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            disabled={loading||uploading}
          >
            {loading ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              "Create Listing"
            )}
          </button>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </form>
      {/* </div> */}
    </div>
  );
}

export default CreateListing