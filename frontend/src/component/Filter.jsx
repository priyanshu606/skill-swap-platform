import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { FilterUserContext } from '../context/FilterUserContxt';
import axios from 'axios';

const Filter = ({setSelectedOption,selectedOption}) => {
  const token = localStorage.getItem("skillSwapToken");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [searchSkill,setSearchSkill] = useState("")
  const { setShowPopup } = useContext(AuthContext);
  const {setPublicUser} = useContext(FilterUserContext);
  const handleChange = (e) => {
    const value = e.target.value;
    const token = localStorage.getItem("token"); 
    if (value === "pending" && !token) {
      setShowPopup(true);
      return;
    }

    setSelectedOption(value);
  };
   const handleSearch = async () => {
    if (!searchSkill.trim()) {
      fetchAllUsers();
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/search`,
        {
          params: { skill: searchSkill },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const users = response.data.users;
      const filteredUsers = currentUser
        ? users.filter((u) => u._id !== currentUser._id)
        : users;

      setPublicUser(filteredUsers);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };


  return (
    <div className="w-full flex justify-center py-6 mt-20">
      <div className="w-2/3 flex flex-col md:flex-row items-center justify-between gap-6 px-4">

        {/* Dropdown */}
        <div className="w-full md:w-1/3">
          <select
           value={selectedOption}
           onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="availability">Availability</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Search Box */}
        <div className="w-full md:w-2/3 flex gap-2">
          <input
            type="search"
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
            placeholder="Search skills or users..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Search
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Filter;
