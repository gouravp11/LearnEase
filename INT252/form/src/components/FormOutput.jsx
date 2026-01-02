import React, { useContext } from "react";
import MyContext from "./MyContext";

const FormOutput = () => {
  const {data, handleDelete} = useContext(MyContext);
  return (
    <div className="flex-row p-4 gap-5">
      {data.map((d, i) => (
        <div className="w-[30%] bg-slate-100 p-3 mb-2 flex justify-between" key={i}>
          <span className="font-semibold opacity-50">{i+1}</span>
          <span className="font-bold uppercase">{d.name}</span>
          <span className="font-semibold lowercase">{d.email}</span>
          <span className="font-bold">{d.age}</span>
          <button onClick={()=>handleDelete(i)} className="bg-red-400 hover:bg-red-500 rounded p-1 px-2 cursor-pointer text-white">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default FormOutput;
