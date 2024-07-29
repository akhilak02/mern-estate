import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/client/HomePage";
import AboutPage from "../pages/client/AboutPage";
import SigninPage from "../pages/client/SigninPage";
import SignUpPage from "../pages/client/SignUpPage";
import ProfilePage from "../pages/client/ProfilePage";
import PrivateRoute from "../components/privateRoute/PrivateRoute";
import CreateListingPage from "../pages/client/CreateListingPage";
import UpdateListingPage from "../pages/client/UpdateListingPage";
import ListingPage from "../pages/client/ListingPage";
import SearchPage from "../pages/client/SearchPage";

function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="About" element={<AboutPage />} />
      <Route path="Sign-in" element={<SigninPage />} />
      <Route path="Sign-up" element={<SignUpPage />} />
      <Route path="/search" element={<SearchPage/>}/>
      <Route path="/listing/:listingId" element={<ListingPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/createListing" element={<CreateListingPage />} />
        <Route
          path="/updateListing/:listingId"
          element={<UpdateListingPage />}
        />
      </Route>
    </Routes>
  );
}

export default UserRouter;
