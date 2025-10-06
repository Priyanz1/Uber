import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserProtectedWrapper({children}) {
    // const {user}=useContext(UserDataContext);
    const token=localStorage.getItem('token');
    const [isloading,setisloading]=useState(true);
    const { user, setUser } = useContext(UserDataContext);
    const navigate=useNavigate();
   useEffect(()=>{
    if(!token){
      navigate("/users/login");
      // return;
  }

  axios.get("http://localhost:3000/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
      if (response.status === 200) {
        setUser(response.data); 
        setisloading(false);   
      }
    }).catch((err) => {
      console.error(err);
      localStorage.removeItem('token');
      navigate('/users/login');
    });
   }, [token]);


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
