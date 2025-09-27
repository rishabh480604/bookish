import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [title,setTitle]=useState("");
  const navigate=useNavigate();

  const handleTitleChange=(e)=>{
    setTitle(e.target.value);
    console.log(title);
  }
  const goToSearch=()=>{
    navigate("/search/"+title);
  }
  

  
  const goToHome=()=>{
    navigate("/");
  }
    
  return (
        <nav className="shadow p-2 w-full bg-white text-amber-600">
      <div className="grid grid-cols-9 gap-2 items-center md:gap-4">
        {/* Brand */}
        
        <div className="col-span-3 md:col-span-1 font-bold text-xl ">
          Bookish
        </div>

        {/* Links */}
        <div className="col-span-2 flex justify-center space-x-8 text-sm md:text-base">
          {/* ⬆️ increased from space-x-4 → space-x-8 */}
          <a href="#" className="hover:text-amber-950" onClick={goToHome}>Home</a>
          {/* <a className="hover:text-indigo-400 cursor-pointer">Advance Search</a> */}
        </div>
        <div className="col-span-2 flex justify-center space-x-8 text-sm md:text-base">
          {/* ⬆️ increased from space-x-4 → space-x-8 */}
          {/* <a href="#" className="hover:text-indigo-400">Home</a> */}
          <a className="hover:text-amber-950 cursor-pointer" onClick={goToSearch}>Advance Search</a>
        </div>

        {/* Empty / spacing */}
        {/* <div className="hidden md:block md:col-span-1"></div> */}

        {/* Search input */}
        <div className="col-span-2 md:col-span-2 mx-1 relative">
         <input
           type="text"
           placeholder="Type to search..."
           className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring focus:border-amber-950"
           onChange={handleTitleChange}
         />
         <button
           onClick={goToSearch} // add your handler
           className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-900 focus:outline-none focus:ring"
         >
           <MagnifyingGlassIcon className="h-5 w-5" />
         </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar