import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';

function UserProtectedWrapper({children}) {
    // const {user}=useContext(UserDataContext);
    const token=localStorage.getItem('token');
    const navigate=useNavigate();
   useEffect(()=>{
    if(!token){
      navigate("/login/user");
  }
   })
  return (
   <>
   {children}
   </>
  )
}

export default UserProtectedWrapper
