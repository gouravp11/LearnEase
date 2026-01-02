import React from "react";

function Card({cardData}) {
  const {name, image, heading, details} = cardData;
  return (
    <div className="flex max-h-72 w-1/2 bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        className="w-1/2 object-cover"
        src={image}
        alt="Pizza"
      />
      <div className="flex flex-col justify-between p-5 w-1/2">
        <div>
          <h1 className="font-bold text-2xl text-gray-800 mb-2">{name}</h1>
          <p className="text-sm text-gray-500 font-medium mb-3">
            {heading}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            {details}
          </p>
        </div>
        <button className="self-start mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition cursor-pointer">
          Order Now
        </button>
      </div>
    </div>
  );
}

export default Card;
