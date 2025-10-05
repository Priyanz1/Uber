import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserProtectedWrapper({children}) {
    // const {user}=useContext(UserDataContext);
    const token=localStorage.getItem('token');
    const [isloading,setisloading]=useState(true);
    const {user,setUser} = UserDataContext;
    const navigate=useNavigate();
   useEffect(()=>{
    if(!token){
      navigate("/login/user");
  }

  axios.get("http://localhost:3000/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
      if (response.status === 200) {
        setUser(response.data); 
        setIsLoading(false);   
      }
    }).catch((err) => {
      console.error(err);
      localStorage.removeItem('token');
      navigate('/login');
    });
   },[token,navigate]);


   if(isloading){
    return(
      <div>is loading...</div>
    )
   }
  return (
   <>
   {children}
   </>
  )
}

export default UserProtectedWrapper
