"use client";
import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";

const UploadXrayModal = ({ isOpen, onClose, patient_id = null }) => {
  const userState = useSelector((state) => state.user) || {};
  const { user_type } = userState;

  const fileInputRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});


  useEffect(() => {
    if (isOpen) {
      // Trigger animation after mount
      setTimeout(() => setShowAnimation(true), 10);
    } else {
      setShowAnimation(false);
    }
  }, [isOpen]);


  // Handle file selection
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

      // Conditionally include patient_id
      if (patient_id && user_type === 'doctor') {
        formData.append('patient_id', patient_id);
      }

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div
        className={`bg-[#0F172A] text-white rounded-2xl shadow-xl w-full max-w-md p-6 relative transform transition-all duration-300 ${showAnimation ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold mb-6">Upload X-Ray</h2>

        {!isUploading ? (
          <>
            {/* Upload Box */}
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
              <p className="text-xs text-gray-400 mt-1">Supports JPG, JPEG, PNG</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".jpg, .jpeg, .png"
              />


            </div>

            {/* {files.length > 0 && (
              <button
                onClick={uploadFiles}
                className="mt-6 bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
              >
                Upload {files.length} Image{files.length > 1 ? 's' : ''}
              </button>
            )} */}
          </>
        ) : (
          <>
            <p className="mb-3 text-blue-400 font-medium">
              Uploading {currentIndex}/{totalFiles} image{totalFiles > 1 ? 's' : ''}
            </p>
            <div className="w-[400px] h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                style={{
                  width: `${(currentIndex / totalFiles) * 100}%`,
                }}
              ></div>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-white px-4 py-2 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={uploadFiles}
            className={`text-sm px-4 py-2 rounded-md transition ${files.length > 0
              ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            disabled={files.length === 0}
          >
            {files.length > 0
              ? `Upload ${files.length} Image${files.length > 1 ? "s" : ""}`
              : "Upload"}
          </button>


        </div>
      </div>
    </div>
  );
};

export default UploadXrayModal;
