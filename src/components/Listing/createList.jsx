

import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
// import {
//   createListingStart,
//   // createListingSuccess,
//   createListingFailure,
// } from "../redux/slices/listingSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function CreateList() {
  const [images, setImages] = useState([]);
  const  loading = useSelector((state) => state.listing);
  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.slice(0, 6)); // Limiting to 6 images
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      address: "",
      sell: false,
      rent: false,
      parking: false,
      furnished: false,
      offer: false,
      beds: "",
      baths: "",
      regularPrice: "",
      discountPrice: "",
    },
    validationSchema: yup.object({
      title: yup.string().required().min(5).max(50),
      description: yup.string().required().min(20).max(500),
      address: yup.string().required(),
      sell: yup.boolean(),
      rent: yup.boolean(),
      parking: yup.boolean(),
      furnished: yup.boolean(),
      offer: yup.boolean(),
      beds: yup.number().required().min(0),
      baths: yup.number().required().min(0),
      regularPrice: yup.number().required().min(0),
      discountPrice: yup.number().min(0),
    }),
    onSubmit: async (values) => {
     

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("address", values.address);
      formData.append("sell", values.sell);
      formData.append("rent", values.rent);
      formData.append("parking", values.parking);
      formData.append("furnished", values.furnished);
      formData.append("offer", values.offer);
      formData.append("beds", values.beds);
      formData.append("baths", values.baths);
      formData.append("regularPrice", values.regularPrice);
      formData.append("discountPrice", values.discountPrice);
      images.forEach((image) => formData.append("images", image));
      console.log(formData);
      try {
        const { data } = await axios.post(
          "http://localhost:3001/backend/createlisting/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("ooo",data);
        // dispatch(createListingSuccess(data.listing));
        toast.success("Listing created successfully");
        navigate("/listings"); // Assuming you have a listings page
      } catch (error) {
        console.error(error);

        toast.error("Failed to create listing");
      }
    },
  });

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="border rounded-lg p-3"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <p className="text-sm text-red-700">{formik.errors.title}</p>

        <textarea
          placeholder="Description"
          name="description"
          className="border rounded-lg p-3"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <p className="text-sm text-red-700">{formik.errors.description}</p>

        <input
          type="text"
          placeholder="Address"
          name="address"
          className="border rounded-lg p-3"
          value={formik.values.address}
          onChange={formik.handleChange}
        />
        <p className="text-sm text-red-700">{formik.errors.address}</p>

        <div className="flex gap-4">
          <label>
            <input
              type="checkbox"
              name="sell"
              checked={formik.values.sell}
              onChange={formik.handleChange}
            />
            Sell
          </label>
          <label>
            <input
              type="checkbox"
              name="rent"
              checked={formik.values.rent}
              onChange={formik.handleChange}
            />
            Rent
          </label>
        </div>

        <div className="flex gap-4">
          <label>
            <input
              type="checkbox"
              name="parking"
              checked={formik.values.parking}
              onChange={formik.handleChange}
            />
            Parking
          </label>
          <label>
            <input
              type="checkbox"
              name="furnished"
              checked={formik.values.furnished}
              onChange={formik.handleChange}
            />
            Furnished
          </label>
          <label>
            <input
              type="checkbox"
              name="offer"
              checked={formik.values.offer}
              onChange={formik.handleChange}
            />
            Offer
          </label>
        </div>

        <input
          type="number"
          placeholder="Beds"
          name="beds"
          className="border rounded-lg p-3"
          value={formik.values.beds}
          onChange={formik.handleChange}
        />
        <p className="text-sm text-red-700">{formik.errors.beds}</p>

        <input
          type="number"
          placeholder="Baths"
          name="baths"
          className="border rounded-lg p-3"
          value={formik.values.baths}
          onChange={formik.handleChange}
        />
        <p className="text-sm text-red-700">{formik.errors.baths}</p>

        <input
          type="number"
          placeholder="Regular Price"
          name="regularPrice"
          className="border rounded-lg p-3"
          value={formik.values.regularPrice}
          onChange={formik.handleChange}
        />
        <p className="text-sm text-red-700">{formik.errors.regularPrice}</p>

        <input
          type="number"
          placeholder="Discount Price"
          name="discountPrice"
          className="border rounded-lg p-3"
          value={formik.values.discountPrice}
          onChange={formik.handleChange}
        />
        <p className="text-sm text-red-700">{formik.errors.discountPrice}</p>

        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="border rounded-lg p-3"
        />

        <div className="flex gap-2 mt-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Preview ${index + 1}`}
              className="w-20 h-20 object-cover"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            "Create Listing"
          )}
        </button>
      </form>
    </div>
  );
}

export default CreateList;
