import { useState } from "react";
import { FaCog, FaHome, FaUsers } from "react-icons/fa";
import { LuTableProperties } from "react-icons/lu";
import { NavLink } from "react-router-dom";



function Sidebar() {
   const [isOpen, setIsOPen] = useState(false);
  const navLink = [
    {
      icon: <FaHome />,
      page: "DashBoard",
      link: "/admin/",
    },
    {
      icon: <FaUsers />,
      page: "Users",
      link: "/admin/users/new",
    },
    {
      icon: <LuTableProperties />,
      page: "Properties",
      link: "/admin/users",
    },
    {
      icon: <FaCog />,
      page: "Setting",
      link: "",
    },
  ];
  // const navigate=useNavigate()
  return (
    <div
      className="bg-gray-800  text-white max-h-6xl flex flex-col  transition-all duration-300"
    >
      <div className="p-4 text-2xl font-semibold flex justify-between items-center">
        {isOpen && <span>Admin Dashboard</span>}
        <i
          className={`fa-solid ${
            isOpen ? "fa-xmark " : "fa-bars"
          } cursor-pointer text-xl hover:scale-105 duration-200 md:hidden`}
          onClick={() => setIsOPen(!isOpen)}
        ></i>
      </div>
      {/* Sidebar Navigation */}
      <ul className="flex flex-col gap-4">
        {navLink.map((ele) => (
          <NavLink
            key={ele.link}
            to={ele.link}
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-white"
            }
          >
            <div className="flex gap-4 items-center  hover:bg-gray-700 p-2">
              <li className="text-lg inline-block mr-2">{ele.icon}</li>
              {isOpen && <li>{ele.page}</li>}
            </div>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar