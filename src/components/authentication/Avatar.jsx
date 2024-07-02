import { useState } from "react";
import converToBase64 from "../../utils/imageConverter";


function Avatar() {
    const[image,setImage]=useState(null)
     const getBase64Image = async (file) => {
       try {
         const image64 = await converToBase64(file);
         setImage(image64);
       } catch (error) {
         console.error(error);
       }
     };
  return (
    <div className="flex justify-center items-center">
      <div className="relative rounded-full overflow-hidden  ">
        <label
          htmlFor="image"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 cursor-pointer bg-gray-300 bg-opacity-90 w-full flex justify-center "
        >
          <i className="fa-solid fa-camera"></i>
        </label>
        <input
          type="file"
          className="hidden"
          onChange={(e) => getBase64Image(e.target.files[0])}
          id="image"
          name="image"
          accept="image/*"
        />

        <img
          src={
            image
              ? image
              : "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-curly-hair-brown-hat_1142-42780.jpg?size=626&ext=jpg&ga=GA1.1.934652532.1695620733&semt=sph"
          }
          className="w-28 object-cover h-28 rounded-full"
          alt="avatar"
        />
      </div>
      <p className="text-xs text-red-600">{!image && "please add an image"}</p>
    </div>
  );
}

export default Avatar