/* eslint-disable react/prop-types */
import { createContext, useState } from "react";



const ImageContext=createContext({});

export const ImageDataProvider=({children})=>{
      const [images, setImages] = useState([]);
const [uploading, setUploading] = useState(false);
      return(
        <ImageContext.Provider value={{images,setImages,uploading,setUploading}}>
            {children}
        </ImageContext.Provider>
      );
};
export default ImageContext