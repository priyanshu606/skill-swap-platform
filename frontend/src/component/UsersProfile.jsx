import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UsersProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("skillSwapToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(res.data.userData);
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);
  const navigate = useNavigate();
  const handleRequest = () => {
    navigate(`/user/request/${userId}`);
  };

  if (loading) return <div className="p-6 text-center text-lg">Loading...</div>;
  if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;
  if (!user) return <div className="p-6 text-center">User not found.</div>;

  return (
    <div className="min-h-screen bg-white text-black flex justify-center py-12 px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-10 bg-white rounded-xl shadow-2xl p-8 min-h-[80vh]">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-6">{user.fullName}</h2>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">Skills Offered</h3>
              {Array.isArray(user.skillsOffered) &&
              user.skillsOffered.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm shadow"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No skills listed.</p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">Skills Wanted</h3>
              {Array.isArray(user.skillsWanted) &&
              user.skillsWanted.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.skillsWanted.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm shadow"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No skills listed.</p>
              )}
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">Rating & Feedback</h3>
              <p className="text-gray-700 text-lg">⭐ 4.5 / 5.0</p>
            </div>
          </div>

          {/* Button aligned right at bottom */}
          <div className="mt-8 text-right">
            <button
              onClick={handleRequest}
              className="px-6 py-2 bg-cyan-700 text-white rounded-full hover:bg-cyan-800 transition-all shadow-md"
            >
              Send Request
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-64 flex flex-col items-center justify-start">
          <div className="w-52 h-52 rounded-full bg-gray-100 border-4 border-cyan-700 flex items-center justify-center text-5xl shadow-md">
            👤
          </div>
          <p className="mt-4 text-gray-600">User Profile Avatar</p>
        </div>
      </div>
    </div>
  );
};

export default UsersProfile;
