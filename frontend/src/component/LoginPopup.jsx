import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
const LoginPopup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {showPopup,setShowPopup,signUpPopup,setSignUpPopup} =  useContext(AuthContext);
  const handlePopup = ()=>{
    setSignUpPopup(!signUpPopup),
    setShowPopup(!showPopup);
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          email,
          password,
        }
      );

      // store token in localStorage
      localStorage.setItem("skillSwapToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.location.reload();
      console.log(response.data.token);
      console.log(JSON.stringify(response.data.user));

      window.dispatchEvent(new Event("login-success"));
      alert("Login successful!");
      setShowPopup(!showPopup);
    } catch (err) {
      console.error(err);
      alert("Login failed: " + (err.response?.data?.msg || "Server Error"));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleLogin}
        className="relative bg-white text-gray-600 max-w-[360px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-2xl shadow-2xl shadow-black/20"
      >
        {/* ❌ Close Button */}
        <button
          type="button"
          onClick={()=>{setShowPopup(!showPopup)}}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl cursor-pointer font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-extrabold mb-9 text-center text-gray-800">
          Skill Swap Platform 👋
        </h2>

        {/* Email Input */}
        <div className="flex items-center mb-3 border bg-indigo-50 border-gray-300 rounded-md px-2">
          <svg
            width="18"
            height="18"
            className="mr-1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
              stroke="#6B7280"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"
              stroke="#6B7280"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none bg-transparent py-2.5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center mb-4 border bg-indigo-50 border-gray-300 rounded-md px-2">
          <svg
            width="13"
            height="17"
            className="mr-1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            className="w-full outline-none bg-transparent py-2.5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-indigo-500" />
            Remember me
          </label>
          <a className="text-blue-600 hover:underline" href="#">
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition py-2.5 rounded-lg text-white font-semibold cursor-pointer"
        >
          Log In
        </button>

        {/* Sign up */}
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline font-medium"
            onClick={handlePopup}
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
