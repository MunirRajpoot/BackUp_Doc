'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

const FILTER_OPTIONS = [
  { label: "All", value: "" },
  { label: "Today", value: "today" },
  { label: "Last 3 Days", value: "3days" },
  { label: "Last Week", value: "week" },
  { label: "Last Month", value: "month" },
  { label: "Last Year", value: "year" },
];

const page = () => {
  const [showFullNote, setShowFullNote] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [data, setData] = useState([]); // Stores X-ray image data
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showOriginal, setShowOriginal] = useState(false);


  // Retrieve the user state from Redux store
  const userState = useSelector((state) => state.user) || {};
  const { user_type } = userState;

  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const xraysPerPage = 12; // Number of X-rays per page


  const fetchPatientsXrays = async (page = 1) => {
    try {
      const authToken = Cookies.get("auth_token");

      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/engine/analysis-list/?page=${page}`;


      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setData(response.data);
    } catch (error) {
      console.error('Error fetching patients x-rays:', error);
    }
  };


  // useEffect with a stable dependency array
  useEffect(() => {
    fetchPatientsXrays(currentPage);
  }, [user_type, currentPage]);



  const fetchAnalyses = async (filterValue) => {
    try {
      const authToken = Cookies.get("auth_token");
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/engine/analyses/filter`, {
        params: { filter: filterValue },
        headers: {
          Authorization: `Bearer ${authToken}`, // or use cookies
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching analyses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total number of pages safely
  const totalPages = Math.ceil((data?.count || 0) / xraysPerPage);
  const validTotalPages = Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 0;

  // Extract the subset of X-rays for the current page
  const currentXrays = Array.isArray(data?.results) ? data.results : [];



  return (
    <div className='flex-1 bg-[#0B0F19] h-screen text-white px-6 py-8 w-full overflow-y-auto'>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#111827] border-blue-600 border-1 p-6 rounded-2xl shadow-lg mb-6">
        {/* User Name */}
        <div>
          <h1 className="text-2xl font-bold">
            {`${userState.user.first_name} ${userState.user.last_name}`}
          </h1>
        </div>
        <div className="flex space-x-2 items-center">

          <span>Sort By</span>

          {/* Upload Button */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              className="block w-full bg-gray-800 text-white px-2 py-2 rounded-md border border-white/20 focus:outline-none"
              value={selectedFilter}
              onChange={(e) => fetchAnalyses(e.target.value)}
            >
              {FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>



      {/* X-ray Display Grid Section */}
      <div className="bg-[#111827] rounded-2xl h-auto  w-full mb-6 p-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentXrays.map((img, idx) => (
            <div
              key={idx}
              className="relative bg-[#1F2937] rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow"
            >


              {/* Display the X-ray image */}
              <img
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${img.analyzed_image}`}
                alt={`X-ray ${idx + 1}`}
                className="w-full h-32 object-cover cursor-pointer"
                loading='lazy'
                onClick={() => {
                  setSelectedImage(img);
                  setShowOriginal(false); // default to analyzed view
                  setShowModal(true);
                }}
              />

            </div>
          ))}
        </div>
      </div>

      {/* Footer Section: Pagination and Analyze button */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Pagination Buttons */}
        <div className="flex flex-wrap justify-center md:justify-end items-center mt-4 space-x-1">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${currentPage === 1
              ? "bg-[#1F2937] text-gray-500 cursor-not-allowed"
              : "bg-[#1F2937] text-white hover:bg-[#374151]"}`}
          >
            &laquo;
          </button>

          {/* Show only a few surrounding pages */}
          {Array.from({ length: validTotalPages }, (_, i) => i + 1)
            .filter((page) =>
              page === 1 ||
              page === validTotalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            )
            .map((page, idx, arr) => (
              <React.Fragment key={page}>
                {idx > 0 && page - arr[idx - 1] > 1 && (
                  <span className="text-gray-400 px-2">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md ${currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-[#1F2937] text-gray-300 hover:bg-[#374151]"}`}
                >
                  {page}
                </button>
              </React.Fragment>
            ))}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, validTotalPages))}
            disabled={currentPage === validTotalPages}
            className={`px-3 py-1 rounded-md ${currentPage === validTotalPages
              ? "bg-[#1F2937] text-gray-500 cursor-not-allowed"
              : "bg-[#1F2937] text-white hover:bg-[#374151]"}`}
          >
            &raquo;
          </button>
        </div>



      </div>
      {showModal && selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/5 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-11/12 lg:w-3/4 xl:w-2/3 shadow-lg max-h-[90vh] overflow-y-auto relative">

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

              {/* Left Side - Image */}
              <div className="flex justify-center items-center">
                <img
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${showOriginal ? selectedImage.raw_image : selectedImage.analyzed_image}`}
                  alt="Selected X-ray"
                  className="rounded-lg max-h-[70vh] object-contain"
                />
              </div>

              {/* Right Side - Toggle and Predictions */}
              <div className="flex flex-col justify-start">

                {/* Toggle Switch */}
                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <span className="mr-3 font-semibold text-gray-800">Show Original</span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={showOriginal}
                      onChange={() => setShowOriginal(!showOriginal)}
                    />
                    <div
                      className={`w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 ${showOriginal ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                    >
                      <div
                        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${showOriginal ? 'translate-x-7' : ''
                          }`}
                      ></div>
                    </div>
                  </label>
                </div>

                {/* Prediction Labels */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-3 text-gray-800">Predictions</h2>

                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto"
                  >
                    {selectedImage.predictions.map((pred, i) => (
                      <div
                        key={i}
                        className="p-2 bg-gray-200 rounded-lg w-fit text-sm text-black"
                      >
                        {pred.result_prediction}
                      </div>
                    ))}
                  </div>
                </div>
                {
                  selectedImage.note && (
                    <div>
                      <h2 className="text-lg font-semibold mb-3 text-gray-800">My Note</h2>
                      <p className="text-black">
                        <i>
                          {showFullNote
                            ? selectedImage.note
                            : `${selectedImage.note.slice(0, 200)}${selectedImage.note.length > 200 ? '...' : ''}`}
                        </i>
                      </p>

                      {selectedImage.note.length > 200 && (
                        <button
                          className="mt-1 text-blue-600 hover:underline text-sm"
                          onClick={() => setShowFullNote(!showFullNote)}
                        >
                          {showFullNote ? 'Show Less' : 'Show More'}
                        </button>
                      )}
                    </div>
                  )
                }

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default page
