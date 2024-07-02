import axios from "axios";

import { deleteUserFailure, deleteUserStart, deleteUserSuccess } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";


function DeleteProfile() {
   const {currentUser}=useSelector((state)=>state.user)
   const dispatch= useDispatch()
    const deleteHandler=async()=>{
     
        dispatch(deleteUserStart())
        try {
            const { data } = await axios.delete(
              `http://localhost:3001/backend/user/delete/${currentUser?.validUser?._id}`
            );
            if(data.success){
                dispatch(deleteUserSuccess(data))
                toast.success("you have been deleted successfully");
                console.log(data);
            }else{
                toast.error(data.err_msg)
                dispatch(deleteUserFailure())
            }
            
        } catch (error) {
            console.error(error);
            toast.error(error.message);
             dispatch(deleteUserFailure());
        }
    }
  return (
    <div className="flex justify-between mt-5">
      <span className="text-red-700 cursor-pointer font-semibold capitalize " onClick={deleteHandler}>
        Delete Account
      </span>
      <span className="text-red-700 cursor-pointer font-semibold capitalize">
        Sign out
      </span>
    </div>
  );
}

export default DeleteProfile