import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SubmitRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("skillSwapToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const [yourSkills, setYourSkills] = useState([]);
  const [theirSkills, setTheirSkills] = useState([]);
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState("");
  const [selectedWantedSkill, setSelectedWantedSkill] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user || !token) return;

    const fetchData = async () => {
      try {
        const [resTheir, resYours] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/get/user/${user._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        setTheirSkills(resTheir.data.userData.skillsWanted || []);
        setYourSkills(resYours.data.userData.skillsOffered || []);
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data || error.message
        );
      }
    };

    fetchData();
  }, [id, token, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/swap-request`,
        {
          to: id,
          offeredSkill: selectedOfferedSkill,
          wantedSkill: selectedWantedSkill,
          message,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Request submitted:", res.data);
      alert("Request sent successfully!");
      navigate("/");
    } catch (error) {
      console.error(
        "Error submitting request:",
        error.response?.data || error.message
      );
      alert("Failed to send request");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-8 px-4 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-xl border border-gray-300 rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-6"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
          Send Skill Swap Request
        </h2>

        {/* Offered Skill Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose one of your offered skills
          </label>
          <select
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            value={selectedOfferedSkill}
            onChange={(e) => setSelectedOfferedSkill(e.target.value)}
            required
          >
            <option value="">-- Select a Skill --</option>
            {yourSkills.length > 0 ? (
              yourSkills.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))
            ) : (
              <option disabled>No skills found</option>
            )}
          </select>
        </div>

        {/* Wanted Skill Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose one of their wanted skills
          </label>
          <select
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            value={selectedWantedSkill}
            onChange={(e) => setSelectedWantedSkill(e.target.value)}
            required
          >
            <option value="">-- Select a Skill --</option>
            {theirSkills.length > 0 ? (
              theirSkills.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))
            ) : (
              <option disabled>No skills found</option>
            )}
          </select>
        </div>

        {/* Message Box */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            rows="4"
            placeholder="Type your message here..."
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow transition text-sm sm:text-base font-semibold w-full sm:w-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitRequest;
