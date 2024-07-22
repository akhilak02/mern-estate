/* eslint-disable react/prop-types */
import { createContext, useState } from "react";



const ImageContext=createContext({});

export const ImageDataProvider=({children})=>{
      const [images, setImages] = useState([]);
    //  const formImage = new FormData();
      return(
        <ImageContext.Provider value={{images,setImages}}>
            {children}
        </ImageContext.Provider>
      );
};
export default ImageContext