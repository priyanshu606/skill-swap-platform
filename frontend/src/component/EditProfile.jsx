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
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-xl rounded-xl p-8"
        encType="multipart/form-data"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <label className="block font-medium mt-4">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <label className="block font-medium mt-4">Availability</label>
            <input
              name="availability"
              value={form.availability}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <label className="block font-medium mt-4">Profile Visibility</label>
            <select
              name="profile"
              value={form.profile}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>

            <label className="block font-medium mt-4">
              Upload Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <div className="mb-4">
              <label className="block font-medium">Skills Offered</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.skillsOffered.map((skill, idx) => (
                  <span
                    key={idx}
                    onClick={() => removeSkill(idx, "skillsOffered")}
                    className="bg-indigo-200 px-3 py-1 rounded-full cursor-pointer"
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
                className="w-full border p-2 rounded"
                placeholder="Add a skill and press Enter"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Skills Wanted</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.skillsWanted.map((skill, idx) => (
                  <span
                    key={idx}
                    onClick={() => removeSkill(idx, "skillsWanted")}
                    className="bg-pink-200 px-3 py-1 rounded-full cursor-pointer"
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
                className="w-full border p-2 rounded"
                placeholder="Add a skill and press Enter"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
