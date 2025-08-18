import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("skillSwapToken");
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(data.userData);
      } catch (err) {
        console.error("Failed to load user profile", err);
      }
    };
    fetchUser();
  }, [userId, token]);

  if (!user) return <p className="text-center mt-20">Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex items-center gap-6">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${user.profilePhoto}`}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border-2 border-indigo-500"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-indigo-700">
            {user.fullName}
          </h2>
          <p className="text-gray-600">{user.location}</p>
          <p className="text-sm text-gray-500">{user.availability}</p>
          <p className="text-sm mt-1 text-gray-500">
            Profile: {user.isPublic ? "Public" : "Private"}
          </p>
        </div>
        <button
          onClick={() => navigate("/edit-profile")}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Edit Profile
        </button>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-lg text-indigo-700">
          Skills Offered
        </h3>
        <ul className="flex flex-wrap gap-2 mt-2">
          {user.skillsOffered.map((skill, index) => (
            <li
              key={index}
              className="bg-indigo-100 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </li>
          ))}
        </ul>

        <h3 className="font-semibold text-lg text-pink-700 mt-4">
          Skills Wanted
        </h3>
        <ul className="flex flex-wrap gap-2 mt-2">
          {user.skillsWanted.map((skill, index) => (
            <li
              key={index}
              className="bg-pink-100 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewProfile;
