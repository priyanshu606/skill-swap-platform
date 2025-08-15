import React, { useEffect, useState } from 'react';
import UserCard from './userCard';
import axios from 'axios';


const UserList = () => {
  const token = localStorage.getItem('skillSwapToken')
   const currentUser = JSON.parse(localStorage.getItem("user"));
  const [publicUser,setPublicUser] = useState([]);
  useEffect(()=>{
  const fetchAllUser = async()=>{
    try {
    const response = await axios.get('http://localhost:8009/api/get/all/users',
          {
             headers: {
               Authorization: `Bearer ${token}`,
             },
          }
    )
    const publicUsers = response.data.users;
  
   const filteredUsers = currentUser
        ? publicUsers.filter((u) => u._id !== currentUser._id)
        : publicUsers;
    
    setPublicUser(filteredUsers);
    } catch (error) {
       console.error("Error fetching users:", error);
    }
  }
  fetchAllUser();
},[])
  return (
    <div className="min-h-screen   md:px-20 space-y-8 bg-gradient-to-br from-white via-[#f2f2f2] to-[#e0e0e0]">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8 drop-shadow-md">
        🔄 Explore Skill Swap Opportunities
      </h1>

      {publicUser.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
};

export default UserList;
