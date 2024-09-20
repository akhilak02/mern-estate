import ListingProp from "../../components/Admin/Dashboard/ListingProp"
import Header from "../../components/Admin/header/Header"
import Sidebar from "../../components/Admin/header/Sidebar"


function ListPage() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <ListingProp />
      </div>
    </>
  );
}

export default ListPage