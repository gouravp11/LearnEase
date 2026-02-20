import React, { useState } from 'react'

const Todo = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    const handleAdd = () => {
        setData([...data, input]);
        setInput("");
    }
  return (
    <>
        <input onChange={e => {setInput(e.target.value)}} type="text" placeholder='enter your task'/>
        <button onClick={handleAdd}>Add</button>

        {
            data.map((d, i) => <div key={i}>d <button>delete</button></div>)
        }
    </>
  )
}

export default Todo