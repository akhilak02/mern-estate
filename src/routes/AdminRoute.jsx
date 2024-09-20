import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/Admin/LoginPage"
import HomePage from "../pages/Admin/HomePage"
import ListPage from "../pages/Admin/ListPage"
import SinglePage from "../pages/Admin/SinglePage"
import NewPage from "../pages/Admin/NewPage"


function AdminRoute() {
  return (
    <Routes>
        <Route path="/">
          <Route index element={<HomePage/>}/>
          <Route path="login"element={<LoginPage/>}/>
          
        </Route>
        <Route path="users">
        <Route index element={<ListPage/>}/>
        <Route path=":userId" element={<SinglePage/>}/>
        <Route path="new" element={<NewPage/>}/>
        </Route>
    </Routes>
  )
}

export default AdminRoute