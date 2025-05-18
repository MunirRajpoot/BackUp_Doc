import React from 'react';

const FeedbackModal = ({
    isOpen,
    onClose,
    onSubmit,
    rating,
    setRating,
    feedback,
    setFeedback
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/5 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-black rounded-lg w-full max-w-md p-6 shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Give Feedback</h2>

                {/* Star Rating */}
                <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                            key={star}
                            onClick={() => setRating(star)}
                            className={`w-8 h-8 cursor-pointer transition ${
                                star <= rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0L5.215 17.06c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L1.211 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.951-.69l1.286-3.967z" />
                        </svg>
                    ))}
                </div>

                {/* Feedback Textarea */}
                <textarea
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
                        disabled={rating === 0 || feedback.trim() === ''}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;
