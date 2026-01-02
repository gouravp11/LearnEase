import React from 'react'

function Navbar() {
  return (
    <>
    <div className="flex justify-evenly items-center py-2">
      <h1 className="flex items-center justify-center font-bold text-blue-900 uppercase text-lg">
        <img
          className="w-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Domino%27s_pizza_logo.svg/768px-Domino%27s_pizza_logo.svg.png?20140812202816"
          alt=""
        />
        Domino's
      </h1>
      <div className="flex gap-10 ml-70 uppercase font-semibold">
        <h6 className="cursor-pointer">Our Menu</h6>
        <h6 className="cursor-pointer">Domino's Stories</h6>
        <h6 className="cursor-pointer">Gift Card</h6>
        <h6 className="cursor-pointer">Corporate Enquiry</h6>
        <h6 className="cursor-pointer">Contact</h6>
      </div>
      <button className="bg-red-500 font-semibold rounded text-sm text-white px-4 py-2 cursor-pointer hover:bg-red-600 transition">
        Download App
      </button>
    </div>
    </>
  )
}

export default Navbar