
import Dashboard from "../../components/Admin/Dashboard/Dashboard";
import Header from "../../components/Admin/header/Header"
import Sidebar from "../../components/Admin/header/Sidebar"


function HomePage() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <Dashboard/>
      </div>
    </>
  );
}

export default HomePage