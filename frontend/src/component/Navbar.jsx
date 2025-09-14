import React, { useContext, useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { showPopup, setShowPopup } = useContext(AuthContext);
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("skillSwapToken");
      if (token) {
        setIsLoggedIn(true);
        const userInfo = JSON.parse(localStorage.getItem("user"));
        setUserProfile(userInfo);
      } else {
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    };

    checkLogin();
    window.addEventListener("login-success", checkLogin);
    return () => window.removeEventListener("login-success", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("skillSwapToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserProfile(null);
    window.location.reload(); // Optional: Reload the page or redirect
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md py-3 sm:py-4 px-4 sm:px-6 md:px-20 flex justify-between items-center">
      {/* Logo / Title */}
      <div className="text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        SkillSwap
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 text-gray-700 font-medium">
        <p className="hidden sm:block hover:text-blue-600 transition duration-300 cursor-pointer text-sm md:text-base">
          Swap Requests
        </p>
        {isLoggedIn && userProfile ? (
          <div
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className="w-8 h-8 sm:w-10 sm:h-10 flex cursor-pointer relative"
          >
            <img
              src="profileIcon.png"
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
            <UserMenu
              handleLogout={handleLogout}
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
            />
          </div>
        ) : (
          <button
            onClick={() => {
              setShowPopup(!showPopup);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-lg shadow-md transition duration-300 text-sm sm:text-base"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
