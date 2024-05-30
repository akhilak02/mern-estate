import { NavLink } from "react-router-dom";

function Header() {
  const navLink = [
    { page: "Home", link: "/" },
    { page: "About", link: "/About" },
    { page: "Sign in", link: "/sign-in" },
  ];
  return (
    <div className="bg-slate-200 shadow-sm">
      <div className=" flex justify-between p-3 max-w-6xl mx-auto items-center sticky top-0 z-50">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-gray-400">DreamLoom</span>
          <span className="text-gray-700">Realty</span>
        </h1>
        <form className="bg-slate-100 p-2 rounded-lg ">
          <input
            type="text"
            placeholder="Search..."
            className=" outline-none bg-transparent w-24 sm:w-64 "
          />
          <i className="fa-brands fa-searchengin sm:text-2xl text-slate-800 "></i>
        </form>
        <ul className="md:flex hidden gap-5">
          {navLink.map((ele) => (
             <NavLink key={ele.link} to={ele.link} className={({isActive})=>isActive?'text-slate-800 font-semibold hover:underline':'text-gray-400'}>
                 <li>{ele.page}</li>
            </NavLink>

          )
           
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
