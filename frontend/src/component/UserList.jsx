import React, { useEffect, useState } from "react";
import UserCard from "./UserCard"
import axios from "axios";

const UserList = () => {
  const CARDS_PER_PAGE = 2;
  const [page, setPage] = useState(0);
  const token = localStorage.getItem("skillSwapToken");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [publicUser, setPublicUser] = useState([]);

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get/all/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const publicUsers = response.data.users;

        const filteredUsers = currentUser
          ? publicUsers.filter((u) => u._id !== currentUser._id)
          : publicUsers;

        setPublicUser(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUser();
  }, []);

  const totalPages = Math.ceil(publicUser.length / CARDS_PER_PAGE);
  const start = page * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-20 py-10 space-y-8 bg-gradient-to-br from-white via-[#f2f2f2] to-[#e0e0e0]">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8 drop-shadow-md">
        🔄 Explore Skill Swap Opportunities
      </h1>

      {publicUser.slice(start, end).map((user, index) => (
        <UserCard key={index} user={user} />
      ))}

      {/* Pagination */}
      <div className="flex justify-center items-center flex-wrap gap-2 mt-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            onClick={() => handlePageChange(n)}
            className={`px-3 py-1 rounded ${
              page === n
                ? "bg-blue-600 text-white font-semibold"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {n + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
