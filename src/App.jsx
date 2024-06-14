import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserRouter from "./routes/UserRouter"
import Header from "./components/Header/Header"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/*" element={<UserRouter />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  );
}

export default App
