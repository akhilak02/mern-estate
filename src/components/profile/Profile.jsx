import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import converToBase64 from "../../utils/imageConverter";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import DeleteProfile from "./DeleteProfile";


function Profile() {
  const { loading, currentUser } = useSelector((state) => state.user);

  const token=useSelector((state)=>state.user.token)
  console.log("token",token);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const navigate=useNavigate()
  console.log("current user first",currentUser);
  const [image, setImage] = useState(currentUser?.avatar);
  const getBase64Image = async (file) => {
    try {
      const image64 = await converToBase64(file);
      setImage(image64);
    } catch (error) {
      console.error(error);
    }
  };

 

  const formik = useFormik({
    initialValues: {
      username:currentUser?.username,
      email: currentUser?.email,
    },
    enableReinitialize:true,
    validationSchema: yup.object({
      username: yup.string().required().min(5).max(20),
      email: yup
        .string()
        .required()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "not a valid address"),
    }),
    onSubmit: async (values) => {
      dispatch(updateUserStart());
          if (
            currentUser?.username === values?.username &&
            currentUser?.email === values?.email &&
            currentUser?.avatar === image
          ) {
           toast.error("There are no change");
          dispatch(updateUserFailure())
          return;
          }
      try {
     
        const { data } = await axios.post(
          `http://localhost:3001/backend/user/update/${currentUser?._id}`,
          { ...values, avatar: image }, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json",
              "Content-type": "application/json",
            }
          
          }
          
        );
        console.log(data,"data in up date");
       
    //  {validUser:currentUser?.validUser,token:currentUser?.token}
       console.log("values in update",values);
      console.log(image);
        if(data.success){
          dispatch(
            updateUserSuccess({
              validUser: data?.validUser,
              token: token,
            })
          );
          toast.success("profile updated succesfully")
          navigate('/')
           console.log("update data:", data);
        }else{
          toast.error(data.err_msg)
          dispatch(updateUserFailure(data.error))
          
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message)
        dispatch(updateUserFailure());
      }
    },
    
  });
 
   useEffect(() => {
     if (!currentUser) {
       toast.error("please login to view profile");
       navigate("/");
     }
   }, [currentUser, navigate]);
console.log("currentUser last",currentUser);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
     
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          id="image"
          name="image"
          onChange={(e) => getBase64Image(e.target.files[0])}
          className="hidden"
        />
        <img
          src={
            image
              ? image
              : "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-curly-hair-brown-hat_1142-42780.jpg?size=626&ext=jpg&ga=GA1.1.934652532.1695620733&semt=sph"
          }
          alt="avatar"
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          name="username"
          className="border rounded-lg p-3"
          value={formik.values.username}
          onChange={formik.handleChange}
        />

        <p className="text-sm text-red-700">{formik.errors.username}</p>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="border rounded-lg p-3"
        />
        <p className="text-sm text-red-700">{formik.errors.email}</p>
     
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            "  update"
          )}
        </button>
        <Link className="bg-orange-300 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to="/createListing">
        Create Listing
        </Link>
      </form>

     <DeleteProfile/>
    </div>
  );
}

export default Profile;
