import axios from "axios";

import { deleteUserSuccess, signOut } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";



function DeleteProfile() {
   const {currentUser,token}=useSelector((state)=>state.user)
   const dispatch= useDispatch()
    const deleteHandler=async()=>{
   
        try {
            const { data } = await axios.delete(
              `http://localhost:3001/backend/user/delete/${currentUser?._id}`,
              {
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Accept": "application/json",
                  "Content-type": "application/json",
                },
              }
            );
            console.log("deleted data",data);
            if(data.success){
                dispatch(deleteUserSuccess())
                toast.success("you have been deleted successfully");
               
            }else{
                toast.error(data.err_msg)
                
            }
            
        } catch (error) {
            console.error(error);
            toast.error(error.message);
          
        }
    }

function sendSignOut(){
  dispatch(signOut())
  
}

  return (
    <div className="flex justify-between mt-5">
      <span className="text-red-700 cursor-pointer font-semibold capitalize " onClick={deleteHandler}>
        Delete Account
      </span>
      <span className="text-red-700 cursor-pointer font-semibold capitalize" onClick={sendSignOut}>
        Sign out
      </span>
    </div>
  );
}

export default DeleteProfile