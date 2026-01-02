import React, { useContext, useRef } from "react";
import MyContext from "./MyContext";

const FormInput = () => {
  const {handleAdd} = useContext(MyContext);

  const name = useRef();
  const email = useRef();
  const age = useRef();
  const handleClick = () => {
    const nameVal = name.current.value.trim();
    const emailVal = email.current.value.trim();
    const ageVal = age.current.value.trim();
    name.current.value = "";
    email.current.value = "";
    age.current.value = "";

    if (!nameVal || !emailVal || !ageVal) {
      alert("All fields are required");
      return;
    }

    const newData = {
      name: nameVal,
      email: emailVal,
      age: ageVal,
    };

    handleAdd(newData);
  };
  return (
    <div className="p-5 space-x-5">
      <input
        className="text-xl p-2 px-4 outline-none border border-slate-300 rounded"
        ref={name}
        type="text"
        placeholder="Enter your name"
      />
      <input
        className="text-xl p-2 px-4 outline-none border border-slate-300 rounded"
        ref={email}
        type="email"
        placeholder="Enter your email"
      />
      <input
        className="text-xl p-2 px-4 outline-none border border-slate-300 rounded"
        ref={age}
        type="age"
        placeholder="Enter your age"
      />
      <button
        className="bg-blue-200 rounded p-1 px-2 cursor-pointer hover:bg-blue-300 "
        onClick={handleClick}
      >
        Click to Add
      </button>
    </div>
  );
};

export default FormInput;
