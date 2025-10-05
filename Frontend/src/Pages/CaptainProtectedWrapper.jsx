import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

function CaptainProtectedWrapper({children}) {
   const [isloading,setisloading]=useState(true);
   const [captain,setCaptain]=useContext(CaptainDataContext);
   const navigate=useNavigate();
   useEffect(()=>{
   if(!token){
    navigate("/captain/login");
   }
   const response=axios.get("http://localhost:3000/users/profile",{
    header:{
        Authorization: `Bearer ${token}`
    }
   }).then((response)=>{
    if(response.status === 200){
        setCaptain(response.captain);
        setisloading(false);
    }
   }).catch((err)=>{
    console.log(err);
    localStorage.removeItem('token');
    navigate("/captain/login");
   })
   },[token,navigate])

   if(isloading){
    <div>
        loading...
    </div>
   }
  return (
    <div>
      {children}
    </div>
  )
}

export default CaptainProtectedWrapper
