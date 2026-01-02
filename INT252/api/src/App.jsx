import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]); // backup for searching

  const nameQuery = useRef();

  // FETCH ALL USERS
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(
      "https://69390dbec8d59937aa064de3.mockapi.io/api/demo/users"
    );
    setData(res.data);
    setAllData(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ipData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: password.trim(),
    };

    if (!ipData.name) return alert("Invalid name");
    if (!ipData.email) return alert("Invalid email");
    if (!ipData.phone || ipData.phone.length !== 10)
      return alert("Phone must be 10 digits");
    if (!ipData.password || ipData.password.length < 8)
      return alert("Password must be at least 8 characters");

    await axios.post(
      "https://69390dbec8d59937aa064de3.mockapi.io/api/demo/users",
      ipData
    );

    // reset fields
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");

    // refresh list
    fetchUsers();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = nameQuery.current.value.trim().toLowerCase();

    if (query === "") {
      setData(allData); // restore original
    } else {
      setData(allData.filter((d) => d.name.toLowerCase() === query));
    }

    nameQuery.current.value = "";
  };

  return (
    <div className="p-5">
      {/* SUBMIT FORM */}
      <form className="my-5" onSubmit={handleSubmit}>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mr-5 border p-2 px-4 rounded"
          type="text"
          placeholder="enter your name"
        />

        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mr-5 border p-2 px-4 rounded"
          type="email"
          placeholder="enter your email"
        />

        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mr-5 border p-2 px-4 rounded"
          type="text"  // FIXED: do not use type number
          placeholder="enter your phone"
        />

        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mr-5 border p-2 px-4 rounded"
          type="password"
          placeholder="enter your password"
        />

        <input
          className="mr-5 bg-gray-200 p-2 px-4 rounded cursor-pointer"
          type="submit"
          value="Submit"
        />
      </form>

      {/* SEARCH FORM */}
      <form onSubmit={handleSearch}>
        <input
          ref={nameQuery}
          className="mr-5 border p-2 px-4 rounded"
          type="text"
          placeholder="search by name"
        />
        <input
          className="mr-5 bg-gray-200 p-2 px-4 rounded cursor-pointer"
          type="submit"
          value="Click to search"
        />
      </form>

      {/* DISPLAY DATA */}
      <div className="mt-5">
        {data.map((d, i) => (
          <div className="bg-gray-100 rounded mb-5 p-2 px-4 w-1/2" key={i}>
            <h1 className="font-semibold">{d.name}</h1>
            <p className="font-semibold">{d.email}</p>
            <p className="font-semibold">{d.phone}</p>
            <p className="font-semibold">{d.password}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
