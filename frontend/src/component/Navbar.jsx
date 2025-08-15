import React, { useEffect, useState } from 'react';
import UserMenu from './UserMenu';

const Navbar = ({ onLoginClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('skillSwapToken');
      if (token) {
        setIsLoggedIn(true);
        const userInfo = JSON.parse(localStorage.getItem('user'));
        setUserProfile(userInfo);
      } else {
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    };

    checkLogin();
    window.addEventListener('login-success', checkLogin);
    return () => window.removeEventListener('login-success', checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('skillSwapToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserProfile(null);
    window.location.reload(); // Optional: Reload the page or redirect
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md py-4 px-6 md:px-20 flex justify-between items-center">
      {/* Logo / Title */}
      <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        SkillSwap
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 text-gray-700 font-medium">
        <p className="hover:text-blue-600 transition duration-300 cursor-pointer">
          Swap Requests
        </p>
        {isLoggedIn && userProfile ? (
          <div
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className="w-10 h-10 flex cursor-pointer"
          >
            <img src="profileIcon.png" alt="profile" />
            <UserMenu
              handleLogout={handleLogout}
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
            />
          </div>
        ) : (
          <button
            onClick={onLoginClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
