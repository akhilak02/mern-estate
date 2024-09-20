import { FaBell } from "react-icons/fa";


function Header() {
  return (
    <header className=" shadow-md flex justify-between mb-0 p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center">
        <FaBell className="mr-4 text-gray-600" />
        <img
          className="w-8 h-8 rounded-full"
          src="https://i.pravatar.cc/300"
          alt="User Avatar"
        />
      </div>
    </header>
  );
}

export default Header