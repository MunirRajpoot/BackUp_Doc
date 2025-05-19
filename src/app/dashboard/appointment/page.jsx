'use client';

import FeedbackModal from '@/component/FeedbackModal/FeedbackModal';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

    const openFeedbackForm = (appointmentId) => {
        setSelectedAppointmentId(appointmentId);
        setRating(0);
        setFeedback('');
        setShowModal(true);
    };
    const userState = useSelector((state) => state.user) || {};
    const { user_type } = userState;

    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const appointmentsPerPage = 12;
const fetchAppointments = async () => {
            const auth_token = Cookies.get('auth_token');
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/xray/appointments/list/?page=${currentPage}`, {
                    headers: {
                        Authorization: `Bearer ${auth_token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setAppointments(res.data.results || []);
                setCurrentPage(1); // reset page on new data
            } catch (e) {
                console.error('Error fetching appointments:', e);
                toast.error('Failed to fetch appointments.');
            }
        };

    useEffect(() => {
        
        fetchAppointments();
    }, [user_type]);

    function startChat(appointmentId) {
        // Navigate to chat page or open chat modal
        console.log("Chat started for:", appointmentId);
    }

    const handleSubmitFeedback = async () => {
        try {
            const auth_token = Cookies.get('auth_token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/xray/feedback/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth_token}`, // Or however you store your token
                },
                body: JSON.stringify({
                    appointment: selectedAppointmentId,
                    rating,
                    description: feedback,
                }),
            });

            if (!response.ok) {
                toast.error('Failed to submit feedback. Please try again.');
                return;
            }

            const responseData = await response.json();
            toast.success('Feedback submitted successfully');

            // Optionally reset form state
            setRating(0);
            setFeedback('');
            setSelectedAppointmentId(null);
            setShowModal(false);
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
        }
    };


    const handleUpdateStatus = async (appointmentId, newStatus) => {
        const authToken = Cookies.get('auth_token');
        const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/xray/appointments/update/${appointmentId}/`;

        if (!authToken) {
            toast.error('Authentication token is missing.');
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.detail || 'Failed to update appointment status.');
                return;
            }

            toast.success('Appointment status updated successfully.');
            fetchAppointments();
        } catch (error) {
            console.error('Update Status Error:', error);
            toast.error('An unexpected error occurred while updating the status.');
        }
    };



    // Pagination logic
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {currentAppointments.map((appointment) => {
                        const now = new Date();
                        const startTime = appointment.slot?.start_time ? new Date(`${appointment.date}T${appointment.slot.start_time}`) : null;
                        const endTime = appointment.slot?.end_time ? new Date(`${appointment.date}T${appointment.slot.end_time}`) : null;

                        const isChatTime = startTime && now >= startTime && endTime && now <= endTime;
                        const isPastAppointment = endTime && now > endTime;


                        return (
                            <div
                                key={appointment.id}
                                className="bg-[#1F2937] p-5 rounded-xl shadow-lg flex flex-col justify-between transition duration-300 hover:shadow-xl"
                            >
                                <div>
                                    <p><strong>Name:</strong> {appointment.full_name}</p>
                                    {user_type === 'doctor' ? (
                                        <p><strong>Email:</strong> {appointment.email}</p>
                                    ) : (
                                        <p><strong>Doctor:</strong> {`${appointment.doctor.first_name} ${appointment.doctor.last_name}`}</p>
                                    )}
                                    <p><strong>Date:</strong> {appointment.date}</p>
                                    <p><strong>Start Time:</strong> {appointment.slot?.start_time || 'N/A'}</p>
                                    <p><strong>End Time:</strong> {appointment.slot?.end_time || 'N/A'}</p>

                                    <p className="mt-2">
                                        <strong>Status:</strong>{' '}
                                        <span className={
                                            appointment.status === 'resolved' ? 'text-green-400' :
                                                appointment.status === 'approved' ? 'text-blue-400' :
                                                    'text-yellow-400'
                                        }>
                                            {appointment.status}
                                        </span>
                                    </p>
                                </div>

                                {/* ✅ Doctor Actions */}
                                {user_type === 'doctor' && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {appointment.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleUpdateStatus(appointment.id, 'approved')}
                                                    className="px-4 py-2 cursor-pointer bg-green-600 rounded-md hover:bg-green-700 text-white transition"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus(appointment.id, 'declined')}
                                                    className="px-4 py-2 cursor-pointer bg-red-600 rounded-md hover:bg-red-700 text-white transition"
                                                >
                                                    Decline
                                                </button>
                                            </>
                                        )}

                                        {appointment.status === 'approved' && (
                                            <button
                                                onClick={() => handleUpdateStatus(appointment.id, 'resolved')}
                                                className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white transition"
                                            >
                                                Mark as Done
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* ✅ Patient Actions */}
                                {user_type === 'patient' && appointment.status === 'approved' && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {isPastAppointment ? (
                                            <button
                                                onClick={() => openFeedbackForm(appointment.id)}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                                            >
                                                Give Feedback
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => startChat(appointment.id)}
                                                disabled={!isChatTime}
                                                className={`px-4 py-2 rounded-md text-white transition ${isChatTime ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 cursor-not-allowed'}`}
                                            >
                                                Chat
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination Controls */}
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
            {/* Feedback Modal */}
            <FeedbackModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmitFeedback}
                rating={rating}
                setRating={setRating}
                feedback={feedback}
                setFeedback={setFeedback}
            />
        </div>
    );
};

export default Page;
