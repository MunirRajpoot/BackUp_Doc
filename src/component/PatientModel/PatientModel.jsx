import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export default function PatientModal({ showModal, setShowModal, onPatientAdded, fetchPatients }) {
  const [animateModal, setAnimateModal] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "Male",
    phone: "", // Assuming you’ll handle this separately or store it too
  });
  const [loading, setLoading] = useState(false);

  // Animate modal when it's shown or hidden
  useEffect(() => {
    setAnimateModal(showModal);
  }, [showModal]);

  if (!showModal) return null;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const authToken = Cookies.get("auth_token");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/xray/patients/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Assumes JWT is stored here
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Failed to add patient");
      }

      const newPatient = await response.json();

      // Optional callback for parent to update list
      if (onPatientAdded) onPatientAdded(newPatient);

      // Reset form and close modal
      setFormData({
        first_name: "",
        last_name: "",
        age: "",
        gender: "Male",
        phone: "",
      });
      setShowModal(false);
      fetchPatients();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  

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

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">First Name</label>
              <input
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Last Name</label>
              <input
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Age</label>
              <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-800 text-white px-3 py-2 focus:outline-none"
              >
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
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
            >
              {loading ? "Adding..." : "Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
