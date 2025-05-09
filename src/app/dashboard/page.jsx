'use client';

import PatientSidebar from "@/component/PatientSidebar/PatientSidebar";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
/**
 * DashboardPage handles rendering of different dashboard views
 * based on the user_type from the Redux store.
 */
const DashboardPage = () => {
  // Retrieve the user state from Redux store
  const userState = useSelector((state) => state.user) || {};
  const { user_type } = userState;
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setSelectedFile(e.dataTransfer.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Uploading:", selectedFile.name);
      onClose();
    }
  };


  /**
   * Render the patient-specific dashboard view.
   */
  const renderPatientView = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0f172a] text-white">
      <div className="mb-5">
      <h1 className="text-2xl font-bold">
        Welcome, {`${userState?.user?.first_name || ""} ${userState?.user?.last_name || ""}`}
      </h1>

      <p className="text-sm text-gray-400">You can Upload you X-Rays here!</p>
      </div>
      {/* Add patient-specific components here */}
      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-blue-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition w-[400px]"
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex justify-center mb-4">
          <div className="bg-blue-700 text-white p-3 rounded-full">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4" />
            </svg>
          </div>
        </div>
        <p className="text-sm font-medium text-blue-400">
          Click or drag file to upload
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Supports JPG, JPEG, PNG
        </p>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".jpg, .jpeg, .png"
        />
      </div>

    </div>
  );

  /**
   * Render the default dashboard view for other user types (e.g., admin, doctor).
   */
  const renderDefaultView = () => (
    <div className="flex text-white flex-col md:flex-row h-screen bg-[#0f172a]">
      <PatientSidebar />
      <div className="flex flex-col items-center justify-center w-full h-screen bg-[#0f172a]">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <p className="text-sm text-gray-400">Select a patient to get started</p>
        {/* Add admin/doctor-specific components here */}
      </div>
    </div>
  );

  // Decide which layout to render based on the user_type
  return user_type === "patient" ? renderPatientView() : renderDefaultView();
};

export default DashboardPage;
