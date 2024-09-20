import UserNew from "../../components/Admin/UserNewPage/UserNew"
import Header from "../../components/Admin/header/Header"
import Sidebar from "../../components/Admin/header/Sidebar"



function NewPage() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <UserNew />
      </div>
    </>
  );
}

export default NewPage