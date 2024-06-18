import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserRouter from "./routes/UserRouter"
import Header from "./components/Header/Header"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/*" element={<UserRouter />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
      <ToastContainer />
    </Provider>
  );
}

export default App
