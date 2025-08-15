// PendingCard.jsx
import React from "react";

const PendingCard = ({ request }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-[1.02] overflow-hidden border border-gray-200">
      <div className="p-6">
        {/* Profile and Rating */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xl font-bold">
              {request.to.fullName ? request.to.fullName.charAt(0).toUpperCase() : '?'}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {request.to.fullName || "User Name"}
            </h2>
            <div className="flex items-center mt-1">
              <span className="text-sm font-medium text-yellow-500">
                ★ 3.9/5
              </span>
            </div>
          </div>
        </div>

        {/* Skills Offered & Wanted */}
        <div className="space-y-4 my-6">
          <div>
            <p className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-1">
              Skills Offered
            </p>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 shadow-sm">
              {request.offeredSkill}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-1">
              Skill Wanted
            </p>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 shadow-sm">
              {request.wantedSkill}
            </span>
          </div>
        </div>

        <hr className="border-gray-200 my-6" />

        {/* Status and Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center">
            <p className="text-sm font-medium text-gray-500">
              Status:
            </p>
            <span className="ml-2 font-semibold text-indigo-600 capitalize">
              {request.status}
            </span>
          </div>
          <div className="flex space-x-2">
            <button className="flex-1 px-5 py-2 text-sm font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out">
              Accept
            </button>
            <button className="flex-1 px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingCard;