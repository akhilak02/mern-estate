/* eslint-disable react/prop-types */

import { useContext, useState } from "react";

import ImageContext from "../context/ImageContext";
import axios from "axios";
import { toast } from "react-toastify";

function UploadImage({ formData, setFormData }) {



  const { images, setImages } = useContext(ImageContext);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);



  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };
  console.log("image", images);



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
  console.log("urls", formData.imageUrls);
  return (
    <>
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
          onChange={handleImageChange}
          id="imagesUrls"
          accept="image/*"
          multiple
        />
        <button
          className="p-3 border text-blue-700 font-semiibold border-blue-300 rounded uppercase hover:shadow-lg disabled:opacity-80"
          type="button"
          onClick={imageHandleSubmit}
          disabled={uploading}
        >
          {uploading ? "Uploading...." : "upload"}
        </button>
      </div>
      {/* <p className="'text-sm text-red-700">{imageUploadError&&imageUploadError}</p> */}
      {/* {Array.from(image).map((item, i) => {
        return (
          <div key={i} className="flex justify-between border ">
            <img
              src={item ? URL.createObjectURL(item) : null}
              alt=""
              className="w-[100px] h-[80px] m-2"
            />
            <button className="text-red-700 text-2xl m-2">
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        );
      })} */}
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
    </>
  );
}

export default UploadImage;
