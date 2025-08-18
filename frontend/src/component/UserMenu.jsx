import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserMenu = ({handleLogout, isOpen, onClose }) => {
  const menuRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-10 w-40 bg-white rounded-xl shadow-lg border z-50 animate-fadeIn"
    >
      <ul className="py-2">
        <li>
          <Link
            to="/view-profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Open Profile
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              handleLogout();
              onClose();
              alert("Sign out logic here");
            }}
            className="w-full text-left px-4 cursor-pointer py-2 text-red-600 hover:bg-red-50"
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
