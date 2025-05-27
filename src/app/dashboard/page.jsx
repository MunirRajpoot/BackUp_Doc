'use client';

import PatientSidebar from "@/component/PatientSidebar/PatientSidebar";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import XrayGrid from "@/component/XrayGrid/XrayGrid";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const userState = useSelector((state) => state.user) || {};
  const { user_type } = userState;
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => {
      const combined = [...prev, ...selectedFiles];
      const unique = Array.from(new Set(combined.map(f => f.name)))
        .map(name => combined.find(f => f.name === name));
      return unique;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => {
      const combined = [...prev, ...droppedFiles];
      const unique = Array.from(new Set(combined.map(f => f.name)))
        .map(name => combined.find(f => f.name === name));
      return unique;
    });
  };

  const uploadFiles = async () => {
    setIsUploading(true);
    const progressData = {};
    const authToken = Cookies.get("auth_token");

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('files', files[i]);

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/xray/upload/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            progressData[i] = percent;
            setUploadProgress({ ...progressData });
          },
        });

        if (response.status === 201) {
          window.location.reload();
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }

    setIsUploading(false);
    setFiles([]);
    setUploadProgress({});
  };

  const currentIndex = Object.keys(uploadProgress).length;
  const totalFiles = files.length;

  const fetchPatientsXrays = async () => {
    try {
      const authToken = Cookies.get("auth_token");
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/xray/images/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching patients x-rays:', error);
    }
  };

  useEffect(() => {
    if (user_type === "patient") {
      fetchPatientsXrays();
    }
  }, [user_type]);

  const renderPatientView = () => (
    <>
      {data.count > 0 ? (
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <XrayGrid />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white px-4 py-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-1">
              Welcome, {userState.user.first_name} {userState.user.last_name}
            </h1>
            <p className="text-sm text-gray-400">You can Upload your X-Rays here!</p>
          </div>

          {!isUploading ? (
            <>
              <div
                className="border-2 border-dashed border-blue-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition w-full max-w-md"
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
                <p className="text-xs text-gray-400 mt-1">Supports JPG, JPEG, PNG</p>
                <small>Note: non xrays or irrelevant xrays images will be skip!</small>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg, .jpeg, .png"
                />
              </div>

              {files.length > 0 && (
                <button
                  onClick={uploadFiles}
                  className="mt-6 bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition cursor-pointer w-full max-w-xs"
                >
                  Upload {files.length} Image{files.length > 1 ? 's' : ''}
                </button>
              )}
            </>
          ) : (
            <>
              <p className="mb-3 text-blue-400 font-medium">
                Uploading {currentIndex}/{totalFiles} image{totalFiles > 1 ? 's' : ''}
              </p>
              <div className="w-full max-w-md h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                  style={{
                    width: `${(currentIndex / totalFiles) * 100}%`,
                  }}
                ></div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );

  const renderDefaultView = () => (
    <div className="flex text-white flex-col md:flex-row min-h-screen bg-[#0f172a]">
      <PatientSidebar />
      <div className="flex flex-col items-center justify-center w-full px-4 py-8">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <p className="text-sm text-gray-400">Select a patient to get started</p>
      </div>
    </div>
  );

  return user_type === "patient" ? renderPatientView() : renderDefaultView();
};

export default DashboardPage;
