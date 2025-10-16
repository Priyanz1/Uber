import React, { useRef, useState } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Home() {
  const [pickup,setpickup]=useState('');
  const [destination,setdestination]=useState('');
  const [click,setclick]=useState(false);
  const myRef = useRef(null); 
  const handleclick=(e)=>{
    if(click){
      setclick(false)
    }else{
      setclick(true);
  }
  }

  useGSAP(() => {
    if(click && myRef.current){
      myRef.current.classList.remove('hidden');
      gsap.to(myRef.current, {
        opacity: 1,
        duration: 0.5,
        y: 0
      });
    }else{
      gsap.to(myRef.current, 
        { opacity: 0, y: -20, duration: 0.5, ease: "power2.in", onComplete: () => {
            myRef.current.classList.add('hidden');
        }}
      );
    }
  }, [click]);

  return (
    <div className='min-h-screen w-screen bg-gray-900 flex justify-center '>
      <div className='bg-gray-800 h-[50%] pb-15 mt-20 py-10 w-[50%] rounded-lg flex justify-center items-center'>
        <form className='space-y-5 px-3' action="">
          <div>
            <label className="block text-gray-300 mb-1">PickUp</label>
            <input
                 type="text"
                 value={pickup} 
                 onClick={(e)=>{handleclick(e)}}
                 onChange={(e)=>{setpickup(e.target.value)}}
                 placeholder="pickup location"
                 className="text-center w-full px-15 py-3 rounded-2xl bg-gray-700 text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                 required
           />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Destination</label>
            <input
                 type="text"
                 value={destination}
                 onChange={(e)=>{setdestination(e.target.value)}}
                 placeholder="final destination"
                 className="text-center w-full px-15 py-3 rounded-2xl bg-gray-700 text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                 required
            />
          </div>
        </form> 
      </div>
      <div ref={myRef} className='bg-white rounded-lg h-[30%] w-[40%] absolute top-[28%] hidden'> hello </div>
    </div>
  )
}

export default Home


