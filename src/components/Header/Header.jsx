import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const navLink = [
    { page: "Home", link: "/" },
    { page: "About", link: "/About" },
    // { page: "Sign in", link: "/sign-in" },
  ];

  const[isOpen,setIsOPen]=useState(false)
  const {currentUser}=useSelector(state=>state.user)
 
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
        <div className="flex items-center gap-3">
          <ul className="md:flex hidden gap-5">
            {navLink.map((ele) => (
              <NavLink
                key={ele.link}
                to={ele.link}
                className={({ isActive }) =>
                  isActive
                    ? "text-slate-800 font-semibold hover:underline"
                    : "text-gray-400"
                }
              >
                <li>{ele.page}</li>
              </NavLink>
            ))}
          </ul>
          {currentUser ? (
            <Link to="/profile">
             
              <img
                src={currentUser?.avatar}
                alt="avatar"
                className="rounded-full h-10 w-10 border-2 hover:cursor-pointer object-cover object-center"
              />
              
            </Link>
          ) : (
            <Link to="/sign-in">
              <h1 className="text-slate-700 hover:underline font-semibold">
                sign in<i className="fa-solid fa-user"></i>
              </h1>
            </Link>
          )}
          <i
            className={`fa-solid ${
              isOpen ? "fa-xmark" : "fa-bars"
            } cursor-pointer text-xl hover:scale-105 duration-200 md:hidden`}
            onClick={() => setIsOPen(!isOpen)}
          ></i>
        </div>
        <div className="w-full h-full absolute top-0 left-0 -z-10">
          <ul
            className={`md:hidden ${
              isOpen
                ? "flex flex-col top-full bg-slate-100  gap-6 left-0"
                : " top-full -left-full"
            } absolute items-center  w-full duration-300  `}
          >
            {navLink.map((ele) => (
              <NavLink
                key={ele.link}
                to={ele.link}
                className={({ isActive }) =>
                  isActive
                    ? "text-slate-800 font-semibold hover:underline"
                    : "text-gray-400"
                }
              >
                <li>{ele.page}</li>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
