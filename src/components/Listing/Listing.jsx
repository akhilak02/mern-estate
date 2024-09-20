import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper,SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper'
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';
import { useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/navigation";
import {
  FaBath,
  FaBed,
  FaChair,
  
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";

import Contact from "../contact/Contact";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { toast } from "react-toastify";
function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [value, setValue] = useState(new Date());//date set
  const [showPicker, setShowPicker] = useState(false); // Control picker visibility
  // Store the submitted date
  const [submittedDate, setSubmittedDate] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:3001/backend/createlisting/get/${params.listingId}`
        );
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setListing(data.listing);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, [params.listingId]);
  // console.log("currentuse",currentUser)
  // console.log("userRef", listing.userRef);
  // console.log("currentuseId",currentUser._id)
  // console.log(listing.imageUrls);
  const handleButtonClick = () => {
    setShowPicker(!showPicker); // Toggle picker visibility
  };

const handleSubmitDate = async () => {
  try {
    // Example of sending the selected date to your backend
    const response = await axios.post(
      `http://localhost:3001/backend/createlisting/book/${params.listingId}`,
      {
        date: value, // The selected date
        userId: currentUser._id, // Include user info if necessary
      }
    );
    console.log("Date submitted:", response.data);
    setSubmittedDate(value);
    toast("Date submited successfully")
  } catch (error) {
    console.error("Error submitting date:", error);
    alert("Failed to submit the date.");
  }
};



  return (
    <main>
      {loading && (
        <p className="text-center items-center my-8 text-2xl animate-spin ">
          <i className="fa-solid fa-spinner  "></i>
        </p>
      )}
      {error && (
        <p className="text-center my-7 text-2xl text-red-700 capitalize">
          something went wrong
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]  bg-no-repeat bg-cover bg-center bg-fixed    "
                  style={{
                    backgroundImage: `url(http://localhost:3001/${url}) `,
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-Us")
                : listing.regularPrice.toLocaleString("en-Us")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />

                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking Spot" : "No Parking Spot"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />

                {listing.parking ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            <div className="p-10">
              <button
                className="w-full bg-orange-900 text-white    text-center p-2 rounded-md mt-4"
                onClick={handleButtonClick}
              >
                Book Your Visit
              </button>
              {showPicker && (
                <div className="mt-4 relative">
                  <div className=" text-center z-50 bg-white p-4 rounded shadow-lg w-100">
                    <DateTimePicker onChange={setValue} value={value} />
                    <button className="p-2 rounded-md ms-1 bg-orange-900 text-white font-semibold" onClick={handleSubmitDate}>
                      submit
                    </button>
                  </div>
                </div>
              )}
              {submittedDate && (
                <p className="mt-4 text-green-600">
                  Submitted Date: {submittedDate.toString()}
                </p>
              )}
            </div>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}

export default Listing;
