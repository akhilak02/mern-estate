import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import OAuth from "./OAuth";
import Avatar from "./Avatar";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
    const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", email: "", password: "" },
    validationSchema: yup.object({
      username: yup.string().required().min(5).max(20),
      email: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*_)(?!.*\W)(?!.* ).{8,16}$/,
          "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one underscore but no other special character, no space and it must be 8-16 characters long"
        ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // if (!image) return toast.error("please add an avatar");
        const { data } = await axios.post(
          "http://localhost:3001/backend/auth/signup",
          { ...values, }
        );
        if (data.success) {
          formik.resetForm();
          toast.success("successfully sign up");
          setLoading(false);
          navigate("/sign-in");
          console.log("signup data",data);
        } else {
          toast.error(data.err_msg);
          setLoading(false);
        }
        console.log(data);
      } catch (error) {
        toast.error(error?.message);
        console.error(error);
        setLoading(false);
      }
    },
  });

  return (
    <div className="p-3 max-w-lg mx-auto">
      <Avatar image={image} setImage={setImage} />
      <h1 className="capitalize text-center text-2xl p-3">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg "
          id="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <p className="text-sm text-red-700">{formik.errors.username}</p>
        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <p className="text-sm text-red-700">{formik.errors.email}</p>
        <div className="relative">
          <input
            type={visible ? "text" : "password"}
            placeholder="password"
            className="border p-3 rounded-lg w-full "
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <i
            className={`fa-solid  ${
              visible ? "fa-eye" : "fa-eye-slash"
            } absolute right-1 p-4 text-gray-500 `}
            onClick={() => {
              setVisible(!visible);
            }}
          ></i>
        </div>

        <p className="text-sm text-red-700">{formik.errors.password}</p>
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 p-3 uppercase text-white rounded-lg hover:opacity-60"
        >
      
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            "Sign up"
          )}
        </button>
        <OAuth />
      </form>
      <p className="text-slate-600">
        Have an account?
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
