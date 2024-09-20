import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .matches(
          /(?=^.{8,15}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?!.*\s).*$/,
          "Minimum eight characters, at least one letter and one number:"
        ),
    }),
    onSubmit: async (value) => {
      try {
        const { data } = await axios.post(
          "http://localhost:3001/admin/auth/login",
          value
        );
        if (data.success) {
          toast.success("Logged in successfully");
          navigate("/admin/");
        } else {
          toast.error(data.err_msg);
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.message);
      }
    },
  });
  return (
    <div className="flex justify-center items-center ">
      <div className="shadow shadow-black rounded p-6 mt-10">
        <h1 className=" font-bold text-2xl text-center uppercase p-3">
          <i className="fa-regular fa-user"></i> Login Page
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-3 relative">
            <label className="text-base capitalize">email</label>
            <input
              type="text"
              name="email"
              className="border w-full text-base  px-2 py-1 focus:outline-none focus:ring-0  focus:border-gray-600"
              placeholder="Enter Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <i className="fa-regular fa-envelope absolute right-1 p-2 text-gray-600"></i>
          </div>
          <p className="text-base text-red-600">{formik.errors.email}</p>
          <div className="mt-3 relative">
            <label className="text-base capitalize">password</label>
            <input
              type="password"
              name="password"
              className="border w-full text-base  px-2 py-1 focus:outline-none focus:ring-0  focus:border-gray-600"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <i className="fa-regular fa-eye absolute right-1 p-2 "></i>
          </div>

          <p className="text-base text-red-600">{formik.errors.password}</p>
          <div className="flex justify-between mt-3">
            <div>
              <input type="checkbox" />
              <label htmlFor=""> Remember Me</label>
            </div>
            <p className="text-blue-800 font-semibold">Forgot password?</p>
          </div>

          <button
            type="submit"
            className="bg-blue-300 p-2 w-80 mt-4 rounded-md shadow-md shadow-black text-white font-bold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
