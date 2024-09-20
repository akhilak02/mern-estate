import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserRouter from "./routes/UserRouter"
import Header from "./components/Header/Header"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ImageDataProvider } from "./context/ImageContext";
import AdminRoute from "./routes/AdminRoute";

function App() {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ImageDataProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/*" element={<UserRouter />} />
              <Route path="/admin/*" element={<AdminRoute/>} />
            </Routes>
          </BrowserRouter>
        </ImageDataProvider>
      </PersistGate>
      <ToastContainer />
    </Provider>
  );
}

export default App
