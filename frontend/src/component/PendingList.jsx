// PendingList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PendingCard from "./PendingCard";

const PendingList = () => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("skillSwapToken");

  useEffect(() => {
    const fetchSentRequests = async () => {
      try {
        const res = await axios.get("http://localhost:8009/api/get/all/request", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data.allSendRequest || []);
      } catch (error) {
        console.error("Failed to fetch sent requests:", error.response?.data || error.message);
      }
    };

    fetchSentRequests();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-lg">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2m0 0H5a2 2 0 00-2 2v2m7-3v3m0 0v3m0-3h3m-3 0H9m-3 0V9m0 0H3m3 3h3m0 0h3m-3 0v3m-3-3h3m-3-3V9"
              ></path>
            </svg>
            <p className="text-lg text-gray-600 font-medium">No pending requests at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((request) => (
              <PendingCard key={request._id} request={request} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingList;