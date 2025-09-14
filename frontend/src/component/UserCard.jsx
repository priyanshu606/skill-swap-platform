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
      className="bg-white text-gray-800 rounded-2xl border-2 border-gray-200 p-4 sm:p-6 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between shadow-md hover:shadow-lg transition cursor-pointer"
    >
      {/* Left: Profile + Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold border-2 border-gray-400 flex-shrink-0">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${user.profilePhoto}`}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <h2 className="text-lg sm:text-xl font-bold">{user.fullName}</h2>

          <div className="text-green-600 text-xs sm:text-sm font-semibold">
            Skills Offered ⇒
          </div>
          <div className="flex gap-1 sm:gap-2 flex-wrap">
            {user.skillsOffered.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="text-blue-600 text-xs sm:text-sm font-semibold mt-1 sm:mt-2">
            Skill Wanted ⇒
          </div>
          <div className="flex gap-1 sm:gap-2 flex-wrap">
            {user.skillsWanted.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Button + Rating */}
      <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-4 w-full lg:w-auto justify-between lg:justify-end mt-4 lg:mt-0">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2 rounded-md font-semibold shadow-md transition text-sm sm:text-base whitespace-nowrap">
          Request
        </button>
        <div className="text-xs sm:text-sm text-gray-700">
          <span className="text-gray-500">Rating</span>{" "}
          <span className="font-semibold">4.5/5</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
