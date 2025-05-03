import React, { useEffect, useState } from "react";

export default function PatientModal({ showModal, setShowModal }) {
  const [animateModal, setAnimateModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      setAnimateModal(true);
    } else {
      setAnimateModal(false);
    }
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`bg-[#0f172a] text-white rounded-lg shadow-lg p-6 w-full max-w-md transform transition-all duration-300 ease-out
          ${animateModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-blue-600">Add New Patient</h3>
          <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>

        <form className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">First Name</label>
              <input type="text" className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none" />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Last Name</label>
              <input type="text" className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input type="text" className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none" />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Age</label>
              <input type="number" className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none" />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Gender</label>
              <select className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
            >
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
