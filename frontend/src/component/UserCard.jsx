import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const UserCard = ({ user }) => {
  const { showPopup, setShowPopup } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowPopup(true);
      return;
    }
    navigate(`/user/${user._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white text-gray-800 rounded-2xl border-2 border-gray-200 p-6 w-full md:w-[90%] mx-auto flex items-center justify-between shadow-md hover:shadow-lg transition"
    >
      {/* Left: Profile + Info */}
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold border-2 border-gray-400">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${user.profilePhoto}`}
            alt=""
          />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">{user.fullName}</h2>

          <div className="text-green-600 text-sm font-semibold">
            Skills Offered ⇒
          </div>
          <div className="flex gap-2 flex-wrap">
            {user.skillsOffered.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="text-blue-600 text-sm font-semibold mt-2">
            Skill Wanted ⇒
          </div>
          <div className="flex gap-2 flex-wrap">
            {user.skillsWanted.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Button + Rating */}
      <div className="flex flex-col items-end gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-semibold shadow-md transition">
          Request
        </button>
        <div className="text-sm text-gray-700">
          <span className="text-gray-500">Rating</span>{" "}
          <span className="font-semibold">4.5/5</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
