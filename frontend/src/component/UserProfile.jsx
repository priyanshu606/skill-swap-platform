import axios from "axios";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [form, setForm] = useState({
    fullName: "",
    location: "",
    skillsOffered: [],
    skillsWanted: [],
    availability: "",
    profile: "Public",
    profilePhoto: "",
  });

  const [newOfferedSkill, setNewOfferedSkill] = useState("");
  const [newWantedSkill, setNewWantedSkill] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleOfferedSkillKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newOfferedSkill.trim()) {
        setForm((prevForm) => ({
          ...prevForm,
          skillsOffered: [...prevForm.skillsOffered, newOfferedSkill.trim()],
        }));
        setNewOfferedSkill("");
      }
    }
  };

  const handleWantedSkillKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newWantedSkill.trim()) {
        setForm((prevForm) => ({
          ...prevForm,
          skillsWanted: [...prevForm.skillsWanted, newWantedSkill.trim()],
        }));
        setNewWantedSkill("");
      }
    }
  };

  const removeOfferedSkill = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      skillsOffered: prevForm.skillsOffered.filter((_, i) => i !== index),
    }));
  };

  const removeWantedSkill = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      skillsWanted: prevForm.skillsWanted.filter((_, i) => i !== index),
    }));
  };

  const token = localStorage.getItem("skillSwapToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const updatedForm = {
      ...form,
      isPublic: form.profile === "Public", // Convert string to boolean
    };
    try {
      const response = await axios.put(`http://localhost:8009/api/update/${userId}`, updatedForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Profile updated:", response.data);
      alert("Profile updated successfully!");
      setForm({
      ...updatedForm,
      profile: updatedForm.isPublic ? "Public" : "Private", // ensure UI stays consistent
    });
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await axios.get(`http://localhost:8009/api/get/user/${userId}`,
          {
             headers: {
               Authorization: `Bearer ${token}`,
             },
          }
        )

        const userData = response.data.userData;
        console.log(userData);
        setForm({
        fullName: userData.fullName || "",
        location: userData.location || "",
        skillsOffered: userData.skillsOffered || [],
        skillsWanted: userData.skillsWanted || [],
        availability: userData.availability || "",
        profile: userData.isPublic ? "Public" : "Private", // convert boolean to string
        profilePhoto: userData.profilePhoto || "",
      });
        
      } catch (error) {
        console.error("Failed to fetch user data", error);
        alert("Error loading profile.");
      }
    }
    fetchData();
  },[userId, token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-teal-100 p-8 font-sans text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        Edit Your Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-3xl p-10 mt-6 max-w-5xl mx-auto shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column */}
          <div>
            <label className="block mb-2 font-semibold text-indigo-700">
              Name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-md w-full p-2"
            />

            <label className="block mt-6 mb-2 font-semibold text-indigo-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-md w-full p-2"
            />

            <label className="block mt-6 mb-2 font-semibold text-indigo-700">
              Skills Offered
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.skillsOffered.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-700 border border-indigo-300 px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-200"
                  onClick={() => removeOfferedSkill(index)}
                >
                  {skill} ×
                </span>
              ))}
            </div>
            <input
              type="text"
              value={newOfferedSkill}
              onChange={(e) => setNewOfferedSkill(e.target.value)}
              onKeyDown={handleOfferedSkillKey}
              className="bg-gray-100 border border-gray-300 rounded-md w-full p-2"
              placeholder="Add Skill and press Enter"
            />

            <label className="block mt-6 mb-2 font-semibold text-indigo-700">
              Availability
            </label>
            <input
              type="text"
              name="availability"
              value={form.availability}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-md w-full p-2"
            />

            <label className="block mt-6 mb-2 font-semibold text-indigo-700">
              Profile Visibility
            </label>
            <select
              value={form.profile}
              name="profile"
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-md w-full p-2"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Right Column */}
          <div className="text-center">
            <div className="relative border-4 border-dashed border-indigo-300 w-48 h-48 rounded-full mx-auto mb-6 flex items-center justify-center bg-gray-50">
              <div>
                <p className="text-sm text-indigo-700">Profile Photo</p>
                <p className="underline text-blue-500 cursor-pointer">
                  Add / Edit <span className="text-red-500">Remove</span>
                </p>
              </div>
            </div>

            <label className="block mb-2 font-semibold text-indigo-700">
              Skills Wanted
            </label>
            <div className="flex flex-wrap gap-2 mb-2 justify-center">
              {form.skillsWanted.map((skill, index) => (
                <span
                  key={index}
                  className="bg-pink-100 text-pink-700 border border-pink-300 px-3 py-1 rounded-full cursor-pointer hover:bg-pink-200"
                  onClick={() => removeWantedSkill(index)}
                >
                  {skill} ×
                </span>
              ))}
            </div>
            <input
              type="text"
              name="skillsWanted"
              value={newWantedSkill}
              onChange={(e) => setNewWantedSkill(e.target.value)}
              onKeyDown={handleWantedSkillKey}
              className="bg-gray-100 border border-gray-300 rounded-md w-full p-2"
              placeholder="Add Skill and press Enter"
            />
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 rounded-full text-white transition ${
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
