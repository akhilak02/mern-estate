import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ImageContext from "../../context/ImageContext";

function UpdateListing() {

    const token = useSelector((state) => state.user.token);
    const currentUser = useSelector((state) => state.user.currentUser);
      const [error, setError] = useState(false);
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const params=useParams()

      
  const { images, setImages, setUploading, uploading } =useContext(ImageContext);
  const [imageUploadError, setImageUploadError] = useState(false);

     const [formData, setFormData] = useState({
       name: "",
       description: "",
       address: "",
       type: "rent",
       parking: false,
       furnished: false,
       offer: false,
       bedrooms: 1,
       bathrooms: 1,
       regularPrice: 50,
       discountPrice: 0,
       imageUrls: [],
     });

     useEffect(()=>{
        const fetchListing=async()=>{
            const listingId=params.listingId
            
            const { data } = await axios.get(`http://localhost:3001/backend/createlisting/get/${listingId}`)
           
            if(data.success){
            setFormData(data.listing);
            toast.success()
            }
            
        }
        fetchListing()
     },[params.listingId])

     const handleChange=(e)=>{
         if (e.target.id === "sale" || e.target.id === "rent") {
           setFormData({ ...formData, type: e.target.id });
         }
         if (
           e.target.id === "parking" ||
           e.target.id === "furnished" ||
           e.target.id === "offer"
         ) {
           setFormData({ ...formData, [e.target.id]: e.target.checked });
         }
         if (
           e.target.type === "number" ||
           e.target.type === "text" ||
           e.target.type === "textarea"
         ) {
           setFormData({ ...formData, [e.target.id]: e.target.value });
         }
        
     }

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (formData.imageUrls.length < 1) {
      return setError("You must upload atleast one image");
    }
    if (+formData.regularPrice < +formData.discountPrice) {
      return setError("Discount price must be lower than regular price ");
    }
    setLoading(true);
    setError(false);
    const { data } = await axios.post(
      `http://localhost:3001/backend/createlisting/update/${params.listingId}`,
      { ...formData, userRef: currentUser._id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    console.log("data", data);

    if (data.success) {
      toast.success("successfully update listing");
      setLoading(false);
      setError(data.message);
      navigate(`/createlisting/${data?.listing?._id}`);
    } else {
      toast.error(data.err_msg);
      setError(error.message);
    }
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
};


const handleImageChange = (e) => {
  setImages([...images, ...e.target.files]);
};


 const imageHandleSubmit = async () => {
   if (images.length > 0 && images.length + formData.imageUrls.length < 7) {
     setUploading(true);
     setImageUploadError(false);

     const formImage = new FormData();

     images.forEach((image) => formImage.append("imageUrls", image));
     setUploading(true);

     try {
       const response = axios.post(
         "http://localhost:3001/backend/uploads/upload-images",
         formImage,
         {
           headers: {
             "Content-Type": "multipart/form-data",
           },
         }
       );

       console.log("server response", response);

       if (response) {
         console.log("uploaded image URLs:", (await response).data.imageUrls);
         setFormData({
           ...formData,
           imageUrls: (await response).data.imageUrls,
         });
         setImageUploadError(false);
         setUploading(false);
         toast.success("images uploaded successfully");
       } else {
         throw new Error(response.data.message || "Image uploade failed");
       }
     } catch (error) {
       console.error(error, "error uploading images");
       toast.error(error.message || "images upload failed");
       setUploading(false);
       setImageUploadError("Image upload failed (2 mb max per image)");
     } finally {
       setUploading(false);
     }
   } else {
     setImageUploadError("You can only upload 6 images per listing");
     setUploading(false);
   }
 };

 const handleRemoveImage = (index) => {
   setFormData({
     ...formData,
     imageUrls: formData.imageUrls.filter((_, i) => i !== index),
   });
 };


  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-blue-300">
        Update Listing
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
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg w-28 "
                value={formData.regularPrice}
                onChange={handleChange}
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
          <p className="font-semibold">
            Images:
            <span className="text-gray-600  font-normal ml-2">
              The first image will be the cover (max6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              name=""
              id="imagesUrls"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <button
              className="p-3 border text-blue-700 font-semiibold border-blue-300 rounded uppercase hover:shadow-lg disabled:opacity-80"
              type="button"
              onClick={imageHandleSubmit}
              disabled={uploading}
            >
              upload
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                className="flex justify-between p-3 border items-center"
                key={index}
              >
                <img
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  className="text-red-700 text-2xl m-2 hover:opacity-75"
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          <button
            type="submit"
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            disabled={loading || uploading}
          >
            {loading ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              "Update Listing"
            )}
          </button>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </form>
    </div>
  );
}

export default UpdateListing