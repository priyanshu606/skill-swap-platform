const PendingCard = ({ request, onUpdate }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isSentByMe = request.from === currentUser._id;
  const otherUser = isSentByMe ? request.to : request.from;
  const token = localStorage.getItem("skillSwapToken");

  const handleUpdate = async (status) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/update/status/${request._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        onUpdate(request._id, status);
      }

      const data = await res.json();
      console.log("Updated:", data);
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border border-gray-200 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 lg:gap-8 min-h-[180px]">
      {/* Left: Profile */}
      <div className="flex items-center space-x-3 sm:space-x-5 w-full lg:w-1/3">
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-bold shadow-md flex-shrink-0">
          {otherUser.fullName
            ? otherUser.fullName.charAt(0).toUpperCase()
            : "?"}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
            {otherUser.fullName || "Unknown User"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            {isSentByMe ? "📤 Sent Request" : "📥 Received Request"}
          </p>
        </div>
      </div>

      {/* Middle: Skills */}
      <div className="flex-1 flex flex-col sm:flex-row justify-around gap-4 sm:gap-6 w-full lg:w-auto">
        <div className="text-center">
          <p className="text-xs font-semibold text-green-700 uppercase mb-2 tracking-wide">
            Offered
          </p>
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-green-100 text-green-800 shadow-sm">
            {request.offeredSkill}
          </span>
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold text-blue-700 uppercase mb-2 tracking-wide">
            Wanted
          </p>
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-blue-100 text-blue-800 shadow-sm">
            {request.wantedSkill}
          </span>
        </div>
      </div>

      {/* Right: Status or Actions */}
      <div className="flex items-center justify-center lg:justify-end w-full lg:w-1/3">
        {isSentByMe ? (
          <span
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm
              ${
                request.status === "pending"
                  ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800"
                  : ""
              }
              ${
                request.status === "accepted"
                  ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800"
                  : ""
              }
              ${
                request.status === "rejected"
                  ? "bg-gradient-to-r from-red-100 to-red-200 text-red-800"
                  : ""
              }
            `}
          >
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
        ) : (
          request.status === "pending" && (
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => handleUpdate("accepted")}
                className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-md hover:from-green-600 hover:to-green-700 transition"
              >
                Accept
              </button>
              <button
                onClick={() => handleUpdate("rejected")}
                className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-md hover:from-red-600 hover:to-red-700 transition"
              >
                Reject
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PendingCard;
