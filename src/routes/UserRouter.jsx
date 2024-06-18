import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/client/HomePage";
import AboutPage from "../pages/client/AboutPage";
import SigninPage from "../pages/client/SigninPage";
import SignUpPage from "../pages/client/SignUpPage";
import ProfilePage from "../pages/client/ProfilePage";
import PrivateRoute from "../components/privateRoute/PrivateRoute";

function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="About" element={<AboutPage />} />
      <Route path="Sign-in" element={<SigninPage />} />
      <Route path="Sign-up" element={<SignUpPage />} />
      <Route  element={<PrivateRoute />} >
      <Route path="/profile" element={<ProfilePage/>}/>
      </Route>
    </Routes>
  );
}

export default UserRouter;
