import React, { useEffect, useState } from "react";
import PendingCard from "./PendingCard";

const PendingPage = () => {
  const CARDS_PER_PAGE = 2;
  const [page, setPage] = useState(0);
  const [allRequest, setAllRequest] = useState([]);
  const token = localStorage.getItem("skillSwapToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sentRes, receivedRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get/all/request`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/get/all/recieve-request`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        const [sentData, recData] = await Promise.all([
          sentRes.json(),
          receivedRes.json(),
        ]);

        setAllRequest([
          ...sentData.allSendRequest,
          ...recData.allRecieveReqest.filter((req) => req.status === "pending"),
        ]);
      } catch (error) {
        console.log("Error fetching requests:", error);
      }
    };
    fetchData();
  }, [token]);

  const handleUpdate = (id, status) => {
    setAllRequest((prev) => prev.filter((req) => req._id !== id));
  };
  const totalPages = Math.ceil(allRequest.length / CARDS_PER_PAGE);
  const start = page * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {allRequest.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 sm:p-12 bg-white rounded-xl shadow-lg">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-4"
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
            <p className="text-base sm:text-lg text-gray-600 font-medium text-center">
              No pending requests at the moment.
            </p>
          </div>
        ) : (
          <div className="flex flex-col space-y-4 sm:space-y-6">
            {allRequest.slice(start, end).map((request) => (
              <PendingCard
                key={request._id}
                request={request}
                onUpdate={handleUpdate}
              />
            ))}

            {/* Pagination */}
            <div className="flex justify-center items-center flex-wrap gap-2 mt-4 sm:mt-6">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base transition"
              >
                Prev
              </button>

              {[...Array(totalPages).keys()].map((n) => (
                <button
                  key={n}
                  onClick={() => handlePageChange(n)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base transition ${
                    page === n
                      ? "bg-blue-600 text-white font-semibold"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {n + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages - 1}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingPage;
