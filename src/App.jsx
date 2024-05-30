import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserRouter from "./routes/UserRouter"
import Header from "./components/Header/Header"

function App() {


  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/*" element={<UserRouter/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
