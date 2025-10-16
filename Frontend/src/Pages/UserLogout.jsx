import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

function UserLogout(){
    const navigate=useNavigate();

    const handleLogout=async (e)=>{
        e.preventDefault();
        try{
            const token=localStorage.getItem('token');
               axios.get("http://localhost:3000/users/logout",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
             }).then((response)=>{
                if(response.status == 200){
                    localStorage.removeItem('token');
                    navigate("/users/login");
                }
             })
          }catch(error){
            console.log(error);
          }        
    }

  return (
    <button
      onClick={(e)=>handleLogout(e)}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
    >
      Logout
    </button>
  );
}

export default UserLogout;
