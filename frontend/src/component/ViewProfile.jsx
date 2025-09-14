import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CalendarDays } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Banner */}
        <div className="relative h-40 sm:h-48 lg:h-60 bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100">
          <button
            onClick={() => navigate("/edit-profile")}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white text-indigo-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg shadow-lg hover:bg-gray-100 transition text-sm sm:text-base"
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-4 sm:px-6 lg:px-10 pb-8 sm:pb-12">
          <div className="relative -mt-16 sm:-mt-20 lg:-mt-24 flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-8">
            {/* Profile Picture */}
            {user.profilePhoto ? (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${user.profilePhoto}`}
                alt="Profile"
                className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 object-cover rounded-full border-4 border-white shadow-xl"
              />
            ) : (
              <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl sm:text-4xl lg:text-5xl font-bold shadow-xl border-4 border-white">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
            )}

            {/* User Details */}
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                {user.fullName}
              </h2>
              <p className="flex items-center justify-center md:justify-start text-gray-600 gap-2 mt-2 text-base sm:text-lg">
                <MapPin size={18} className="sm:w-5 sm:h-5" />{" "}
                {user.location || "Unknown"}
              </p>
              <p className="flex items-center justify-center md:justify-start text-green-600 gap-2 mt-1 text-sm sm:text-base">
                <CalendarDays size={18} className="sm:w-5 sm:h-5" />{" "}
                {user.availability || "Available"}
              </p>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                Profile:{" "}
                <span className="font-medium">
                  {user.isPublic ? "Public" : "Private"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Skills Offered */}
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md hover:shadow-xl transition">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-indigo-800 mb-4 sm:mb-6 flex items-center gap-2">
              ✨ Skills Offered
            </h3>
            {user.skillsOffered.length > 0 ? (
              <ul className="flex flex-wrap gap-2 sm:gap-3">
                {user.skillsOffered.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-indigo-200 px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-indigo-900 shadow-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm sm:text-base">
                No skills added yet
              </p>
            )}
          </div>

          {/* Skills Wanted */}
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md hover:shadow-xl transition">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-pink-800 mb-4 sm:mb-6 flex items-center gap-2">
              ⚡ Skills Wanted
            </h3>
            {user.skillsWanted.length > 0 ? (
              <ul className="flex flex-wrap gap-2 sm:gap-3">
                {user.skillsWanted.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-pink-200 px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-pink-900 shadow-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm sm:text-base">
                No skills added yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
