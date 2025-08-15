import React from 'react';

const Filter = ({setSelectedOption,selectedOption}) => {
  return (
    <div className="w-full flex justify-center py-6 mt-20">
      <div className="w-2/3 flex flex-col md:flex-row items-center justify-between gap-6 px-4">

        {/* Dropdown */}
        <div className="w-full md:w-1/3">
          <select
           value={selectedOption}
           onChange={(e)=>{setSelectedOption(e.target.value)}}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="availability">Availability</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Search Box */}
        <div className="w-full md:w-2/3 flex gap-2">
          <input
            type="search"
            placeholder="Search skills or users..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Search
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Filter;
