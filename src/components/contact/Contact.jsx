/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"



function Contact({listing}) {
    const[landlord,setLandlord]=useState(null)
    const[message,setMessage]=useState('')
    const token = useSelector((state) => state.user.token);
    const onChange=(e)=>{
        setMessage(e.target.value)
    }

    useEffect(()=>{
        (async()=>{
            try {
               const { data } = await axios.get(
                 `http://localhost:3001/backend/user/${listing?.userRef}`,
                 {
                   headers: {
                     Authorization: `Bearer ${token}`,
                     Accept: "application/json",
                     "Content-type": "application/json",
                   },
                 }
               );
               setLandlord(data.validUser) 
            } catch (error) {
                console.error(error);
            }
        })()
    },[listing?.userRef])

  return (
    <>
    {landlord && (
        <div className="flex flex-col gap-2">
            <p>Contact <span className="font-semibold">{landlord.username}</span>{' '}
            for{' '}
            <span className="font-semibold">{listing?.name.toLowerCase()}</span>
            </p>
            <textarea name="message" id="message" rows="2" value={message} onChange={onChange} placeholder="Enter Your Message here..." className="w-full border p-3 rounded-lg"></textarea>
            <Link 
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            >
            Send Message
            </Link>
        </div>
    )}
    </>
  )
}

export default Contact