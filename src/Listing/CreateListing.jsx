

function CreateListing() {
  return (
    <div className="p-3 max-w-4xl mx-auto">
      {/* <img
        src="https://plus.unsplash.com/premium_photo-1671269942050-df7e96b3e4ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJlYWxlc3RhdGV8ZW58MHx8MHx8fDA%3D"
        alt=""
        className="w-full object-cover absolute h-full top-0 left-0 -z-10"
      /> */}
      {/* <div className=" bg-black/30 backdrop-blur p-3 z-50"> */}
      <h1 className="text-3xl font-semibold text-center my-7 text-blue-300">
        Create a Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-4 ">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
          />
          <textarea
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="sale" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="rent" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                className="p-3 border border-gray-300 rounded-lg w-28 "
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                className="p-3 border border-gray-300 rounded-lg w-28"
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                name="regularPrice"
                className="p-3 border border-gray-300 rounded-lg w-28 "
              />
              <div>
                <p>Regular Price</p>
                <span className="text-sm">(&#8377; /month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="discountPrice"
                name="discountPrice"
                className="p-3 border border-gray-300 rounded-lg w-28 "
              />
              <div>
                <p>Discount Price</p>
                <span className="text-sm">(&#8377; /month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 ms-4">
          <p className="font-semibold">
            Images:
            <span className="text-gray-600  font-normal ml-2">
              The first image will be the cover (max6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              name=""
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 border text-blue-700 font-semiibold border-blue-300 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
   {/* </div> */}
    </div>
  );
}

export default CreateListing