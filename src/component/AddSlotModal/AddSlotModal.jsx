import React, { useState } from "react";

const AddSlotModal = ({ isOpen, onClose, onSave }) => {
    const [day, setDay] = useState("monday");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = () => {
        if (!startTime || !endTime) return;
        const slot = { day, startTime, endTime };
        onSave(slot);  // send structured data
        onClose();
        setStartTime("");
        setEndTime("");
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <div className="flex items-center justify-between mb-4">

                    <h3 className="text-lg font-semibold text-gray-800">Add Time Slot</h3>
                    <button onClick={() => onClose()} className="text-gray-400 hover:text-dark">
                        &times;
                    </button>
                </div>
                <div className="space-y-4">
                    <select value={day} onChange={(e) => setDay(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-black">
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                    </select>

                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    />
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button onClick={onClose} className="px-4 cursor-pointer py-2 rounded-md text-sm bg-gray-200 hover:bg-gray-300 text-black">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 cursor-pointer py-2 rounded-md text-sm bg-green-500 text-white hover:bg-green-600">Save Slot</button>
                </div>
            </div>
        </div>
    );
};

export default AddSlotModal;
