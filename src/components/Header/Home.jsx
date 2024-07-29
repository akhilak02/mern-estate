import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../listing-item/ListingItem";


function Home() {
  const[offerListings,setOfferListings]=useState([])
  const[saleListings,setSaleListings]=useState([])
  const[rentListings,setRentListings]=useState([])
    SwiperCore.use([Navigation]);
console.log("sale",saleListings);
  useEffect(()=>{
    const fetchOfferListing=async()=>{
      try {
        const { data } =await axios.get(
          'http://localhost:3001/backend/createlisting/get?offer=true&limit=4'
        );
        console.log("datahome",data);
        if(data.success){
          setOfferListings(data.listings)
          fetchRentListings()
        }
      } catch (error) {
        console.log(error);
        
      }
    }
const fetchRentListings=async()=>{
  try {
    const { data } = await axios.get(
      "http://localhost:3001/backend/createlisting/get?type=rent&limit=4"
    );
      if (data.success) {
        setRentListings(data.listings)
        fetchSaleListings()
      }
    
  } catch (error) {
    console.log(error);
  }
}

    const fetchSaleListings = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/backend/createlisting/get?type=sale&limit=4"
        );
        if (data.success) {
          
          setSaleListings(data.listings)
        }
      
      } catch (error) {
       console.log(error);
      }
    };

    fetchOfferListing()

  },[])
  return (
    <div>
      {/* top */}
      <div className=" flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="capitalize text-slate-700 font-bold text-3xl lg:text-6xl">
          Find Your next <span className="text-slate-500">Perfect</span> Place
          with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          DreamLoom Realty is the best place to find your next perfect place to
          live
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let&apos;s Start now...
        </Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  backgroundImage: `url(http://localhost:3001/${listing.imageUrls[0]}) `,
                }}
                className="h-[500px] bg-cover bg-center bg-no-repeat"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listing results for offer ,sale and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                to={`/search?offer=true`}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Places for rent
              </h2>
              <Link
                to={`/search?type=rent`}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Places for sale
              </h2>
              <Link
                to={`/search?type=sale`}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more Places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home