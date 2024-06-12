import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserRouter from "./routes/UserRouter"
import Header from "./components/Header/Header"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function App() {


  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/*" element={<UserRouter/>}/>
    </Routes>
    <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
