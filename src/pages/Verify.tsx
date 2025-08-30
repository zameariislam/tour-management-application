import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

 export default function Verify ()  {
     
    const navigate=useNavigate()

     const location=useLocation()
      console.log(location.state)
    
    const[email]  =useState(location.state ||'')

    useEffect(()=>{
        

        if(!email){
            navigate('/login')

        }

    },[])

   
  return (
    <div> This is Verify Page</div>
  );
};
