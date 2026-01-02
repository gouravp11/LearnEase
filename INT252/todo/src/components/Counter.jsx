import React, { useState } from 'react'

const Counter = () => {
  const [cnt, setCnt] = useState(0);
  const inc = (e) => {
    e.ctrlKey? setCnt(prev => prev+10) : setCnt(prev => prev+1);
  }
  const dec = (e) => {
    e.ctrlKey? setCnt(prev => prev-10) : setCnt(prev => prev-1);
  }

  return (
    <div className="p-5">
      <div className="w-fit flex gap-5 text-4xl">
        <button className='cursor-pointer' onClick={inc}>+</button>
        <div className="w-72 text-center bg-slate-200 rounded">{cnt}</div>
        <button className='cursor-pointer' onClick={dec}>-</button>
      </div>
      <div className="w-fit">
        <button className="text-red-600 underline cursor-pointer hover:text-red-700" onClick={() => setCnt(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter