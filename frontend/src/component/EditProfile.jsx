import axios from "axios";
import React, { useEffect, useState } from "react";

const EditProfile = () => {
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
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, profilePhoto: e.target.files[0] }));
  };

  const handleSkillKey = (key, value, setter, field) => {
    if (key === "Enter" && value.trim()) {
      setter((prevForm) => ({
        ...prevForm,
        [field]: [...prevForm[field], value.trim()],
      }));
      return "";
    }
    return value;
  };

  const removeSkill = (index, field) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: prevForm[field].filter((_, i) => i !== index),
    }));
  };

  const token = localStorage.getItem("skillSwapToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, key === "isPublic" ? value === "Public" : value);
      }
    });

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profile updated successfully!");
    } catch {
      alert("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const userData = data.userData;
        setForm({
          fullName: userData.fullName || "",
          location: userData.location || "",
          skillsOffered: userData.skillsOffered || [],
          skillsWanted: userData.skillsWanted || [],
          availability: userData.availability || "",
          profile: userData.isPublic ? "Public" : "Private",
          profilePhoto: userData.profilePhoto || "",
        });
      } catch {
        alert("Error loading profile.");
      }
    };

    fetchData();
  }, [userId, token]);

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
        Edit Profile
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-6 bg-white shadow-xl rounded-xl p-4 sm:p-6 lg:p-8"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-sm sm:text-base mb-1">
                Full Name
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block font-medium text-sm sm:text-base mb-1">
                Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block font-medium text-sm sm:text-base mb-1">
                Availability
              </label>
              <input
                name="availability"
                value={form.availability}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block font-medium text-sm sm:text-base mb-1">
                Profile Visibility
              </label>
              <select
                name="profile"
                value={form.profile}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-sm sm:text-base mb-1">
                Upload Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-medium text-sm sm:text-base mb-1">
                Skills Offered
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.skillsOffered.map((skill, idx) => (
                  <span
                    key={idx}
                    onClick={() => removeSkill(idx, "skillsOffered")}
                    className="bg-indigo-200 px-2 sm:px-3 py-1 rounded-full cursor-pointer text-xs sm:text-sm hover:bg-indigo-300 transition"
                  >
                    {skill} ×
                  </span>
                ))}
              </div>
              <input
                value={newOfferedSkill}
                onChange={(e) => setNewOfferedSkill(e.target.value)}
                onKeyDown={(e) =>
                  setNewOfferedSkill(
                    handleSkillKey(
                      e.key,
                      newOfferedSkill,
                      setForm,
                      "skillsOffered"
                    )
                  )
                }
                className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                placeholder="Add a skill and press Enter"
              />
            </div>

            <div>
              <label className="block font-medium text-sm sm:text-base mb-1">
                Skills Wanted
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.skillsWanted.map((skill, idx) => (
                  <span
                    key={idx}
                    onClick={() => removeSkill(idx, "skillsWanted")}
                    className="bg-pink-200 px-2 sm:px-3 py-1 rounded-full cursor-pointer text-xs sm:text-sm hover:bg-pink-300 transition"
                  >
                    {skill} ×
                  </span>
                ))}
              </div>
              <input
                value={newWantedSkill}
                onChange={(e) => setNewWantedSkill(e.target.value)}
                onKeyDown={(e) =>
                  setNewWantedSkill(
                    handleSkillKey(
                      e.key,
                      newWantedSkill,
                      setForm,
                      "skillsWanted"
                    )
                  )
                }
                className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                placeholder="Add a skill and press Enter"
              />
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-indigo-700 disabled:opacity-50 transition text-sm sm:text-base font-semibold"
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
