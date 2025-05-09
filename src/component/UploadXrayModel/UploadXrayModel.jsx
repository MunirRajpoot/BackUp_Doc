"use client";
import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

const UploadXrayModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger animation after mount
      setTimeout(() => setShowAnimation(true), 10);
    } else {
      setShowAnimation(false);
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div
        className={`bg-[#0F172A] text-white rounded-2xl shadow-xl w-full max-w-md p-6 relative transform transition-all duration-300 ${
          showAnimation ? "opacity-100 scale-100" : "opacity-0 scale-95"
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

        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-blue-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition"
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

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-white px-4 py-2 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className={`text-sm px-4 py-2 rounded-md transition ${
              selectedFile
                ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedFile}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadXrayModal;
