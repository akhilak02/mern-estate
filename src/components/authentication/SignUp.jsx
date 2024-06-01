import { Link } from "react-router-dom"


function SignUp() {
   
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="capitalize text-center">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg "
        />
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
        />
        <button
          type="submit"
          className="bg-slate-700 p-3 uppercase text-white rounded-lg hover:opacity-60"
        >
          Sign up
        </button>
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

export default SignUp