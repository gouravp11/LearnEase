import React, { useState } from 'react'
import Form  from './components/Form'
import MyContext from './components/MyContext';

const App = () => {
  const [data, setData] = useState([]);
  const handleAdd = (val) => {
    setData(prev => [...prev, val]);
  }
  const handleDelete = (index) => {
    setData(prev => prev.filter((d, i) => i !== index));
  }
  return (
    <MyContext.Provider value={{data, handleAdd, handleDelete}}>
      <Form />
    </MyContext.Provider>
  )
}

export default App