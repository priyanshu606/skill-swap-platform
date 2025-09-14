import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useContext } from "react";
import { FilterUserContext } from "../context/FilterUserContxt";

const UserList = () => {
  const CARDS_PER_PAGE = 2;
  const [page, setPage] = useState(0);
  const token = localStorage.getItem("skillSwapToken");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { publicUser, setPublicUser } = useContext(FilterUserContext);
  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get/all/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const publicUsers = response.data.users;

        const filteredUsers = currentUser
          ? publicUsers.filter((u) => u._id !== currentUser._id)
          : publicUsers;

        setPublicUser(filteredUsers);
      } catch (error) {
        console.log("Error fetching users:", error);
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
    <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-20 py-4 sm:py-6 space-y-6 sm:space-y-8 bg-gradient-to-br from-white via-[#f2f2f2] to-[#e0e0e0]">
      {publicUser.slice(start, end).map((user, index) => (
        <UserCard key={index} user={user} />
      ))}

      {/* Pagination */}
      <div className="flex justify-center items-center flex-wrap gap-2 mt-6 sm:mt-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base transition"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            onClick={() => handlePageChange(n)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base transition ${
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
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
