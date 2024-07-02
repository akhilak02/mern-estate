
import axios from "axios";
import { useFormik } from "formik";
import { useRef, useState, } from "react";
import ReactModal from "react-modal"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../../redux/slices/userSlice";
import * as yup from "yup";
import converToBase64 from "../../utils/imageConverter";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};


function Modal() {
        const { currentUser } = useSelector((state) => state.user);
      const [image, setImage] = useState(currentUser?.avatar);
      const [modalIsOpen, setIsOpen] = useState(false);
  const token=useSelector(state=>state.user.token)

 
     const { loading } = useSelector((state) => state.user);
    
  const fileRef = useRef(null);

  const dispatch = useDispatch();
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
      username: currentUser?.username,
      email: currentUser?.email,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      username: yup.string().required().min(5).max(20),
      email: yup.string().required().email(),
    }),
    onSubmit: async (values) => {
      console.log(currentUser.email);
      dispatch(updateUserStart());
      if (
        currentUser.username === values.username &&
        currentUser.email === values.email &&
        currentUser.avatar === image
      ) {
        toast.error("There are no change");
        dispatch(updateUserFailure());
        return;
      }
      try {
        const { data } = await axios.post(
          `http://localhost:3001/backend/user/update/${currentUser._id}`,
          { ...values, avatar: image },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-type": "application/json",
            },
          }
        );
        console.log(data);
        console.log("urtrtuy");
        if (data.success) {
          toast.success(" profile updated successfully");
          dispatch(updateUserSuccess(data));
        } else {
          toast.error(data.err_msg);
          dispatch(updateUserFailure());
        }
        console.log(data);
      } catch (error) {
        toast.error(error?.message);
        dispatch(updateUserFailure());
        console.error(error);
      }
    },
  });

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ReactModal
       isOpen={modalIsOpen}
    //   // onAfterOpen={afterOpenModal}
       onRequestClose={closeModal}
       style={customStyles}
      contentLabel="Example Modal"
       ariaHideApp={false}
    
    >
      <button
        onClick={closeModal}
        className="absolute right-0 top-0 p-2 text-xl text-slate-300 hover:text-slate-600 "
      >
        <i className="fa
        -solid fa-xmark "></i>
      </button>

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
          id="email"
          name="email"
          className="border rounded-lg p-3"
          value={formik.values.email}
          onChange={formik.handleChange}
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
      </form>
</div>
    </ReactModal>
  );
}

export default Modal