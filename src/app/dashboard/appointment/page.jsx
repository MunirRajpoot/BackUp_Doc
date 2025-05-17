'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    const userState = useSelector((state) => state.user) || {};
    const user_type = 'doctor'; // change as needed

    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const appointmentsPerPage = 4; // <-- Changed to 4

    // Dummy data with unique IDs
    const doctorDummyAppointments = [
        { id: 1, full_name: 'John Doe', email: 'john@example.com', date: '2025-05-18', time: '10:00 AM', status: 'pending' },
        { id: 2, full_name: 'Jane Smith', email: 'jane@example.com', date: '2025-05-19', time: '11:30 AM', status: 'pending' },
        { id: 3, full_name: 'Mike Johnson', email: 'mike@example.com', date: '2025-05-20', time: '01:00 PM', status: 'pending' },
        { id: 4, full_name: 'Emily Davis', email: 'emily@example.com', date: '2025-05-21', time: '02:30 PM', status: 'pending' },
        { id: 5, full_name: 'Chris Lee', email: 'chris@example.com', date: '2025-05-22', time: '04:00 PM', status: 'pending' },
        { id: 6, full_name: 'Sara Wilson', email: 'sara@example.com', date: '2025-05-23', time: '09:30 AM', status: 'pending' },
        { id: 7, full_name: 'David Martinez', email: 'david@example.com', date: '2025-05-24', time: '11:00 AM', status: 'pending' },
    ];

    const patientDummyAppointments = [
        { id: 1, full_name: 'Dr. Alice Brown', email: 'alicebrown@hospital.com', date: '2025-05-18', time: '10:00 AM', status: 'pending' },
        { id: 2, full_name: 'Dr. Bob Green', email: 'bobgreen@hospital.com', date: '2025-05-19', time: '11:30 AM', status: 'done' },
        { id: 3, full_name: 'Dr. Carol White', email: 'carolwhite@hospital.com', date: '2025-05-20', time: '02:00 PM', status: 'pending' },
        { id: 4, full_name: 'Dr. Daniel Black', email: 'danielblack@hospital.com', date: '2025-05-21', time: '03:30 PM', status: 'done' },
        { id: 5, full_name: 'Dr. Eva Grey', email: 'evagrey@hospital.com', date: '2025-05-22', time: '05:00 PM', status: 'pending' },
    ];

    useEffect(() => {
        if (user_type === 'doctor') {
            setAppointments(doctorDummyAppointments);
        } else {
            setAppointments(patientDummyAppointments);
        }
        setCurrentPage(1);
    }, [user_type]);

    const handleMarkDone = (appointmentId) => {
        setAppointments((prev) =>
            prev.map((app) => (app.id === appointmentId ? { ...app, status: 'done' } : app))
        );
        toast.success('Appointment marked as done!');
    };

    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
    const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

    return (
        <div className="flex-1 bg-[#0B0F19] h-screen text-white px-6 py-8 w-full overflow-y-auto">
            <ToastContainer position="top-right" autoClose={2000} />

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#111827] border border-blue-600 p-6 rounded-2xl shadow-lg mb-6">
                <h1 className="text-2xl font-bold">
                    {userState.user ? `${userState.user.first_name} ${userState.user.last_name}` : 'Test User'}
                </h1>
                <h2 className="text-lg font-medium mt-2 md:mt-0">
                    {user_type === 'doctor' ? 'Doctor View: All Appointments' : 'Patient View: Your Appointments'}
                </h2>
            </header>

            {currentAppointments.length === 0 ? (
                <p className="text-gray-400">No appointments available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"> {/* 4 columns on md and up */}
                    {currentAppointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className="bg-[#1F2937] p-5 rounded-xl shadow-lg flex flex-col justify-between"
                        >
                            <div>
                                <p><strong>Name:</strong> {appointment.full_name}</p>
                                <p><strong>Email:</strong> {appointment.email}</p>
                                <p><strong>Date:</strong> {appointment.date}</p>
                                <p><strong>Time:</strong> {appointment.time}</p>
                                <p className="mt-2">
                                    <strong>Status:</strong>{' '}
                                    <span className={appointment.status === 'done' ? 'text-green-400' : 'text-yellow-400'}>
                                        {appointment.status}
                                    </span>
                                </p>
                            </div>
                            {user_type === 'doctor' && appointment.status !== 'done' && (
                                <button
                                    onClick={() => handleMarkDone(appointment.id)}
                                    className="mt-4 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
                                >
                                    Mark as Done
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <nav className="flex justify-center mt-8 space-x-3">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${currentPage === 1
                            ? 'bg-[#1F2937] text-gray-500 cursor-not-allowed'
                            : 'bg-[#1F2937] text-white hover:bg-[#374151]'
                        }`}
                >
                    &laquo;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-md ${currentPage === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'bg-[#1F2937] text-gray-300 hover:bg-[#374151]'
                            }`}
                    >
                        {pageNum}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages
                            ? 'bg-[#1F2937] text-gray-500 cursor-not-allowed'
                            : 'bg-[#1F2937] text-white hover:bg-[#374151]'
                        }`}
                >
                    &raquo;
                </button>
            </nav>
        </div>
    );
};

export default Page;
