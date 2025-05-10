'use client';

import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const ChatModal = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isNextMessageEnd, setIsNextMessageEnd] = useState(true);

    const toggleChatModal = () => {
        setIsChatOpen(!isChatOpen);
        setShowEmojiPicker(false);
    };

    const handleSend = () => {
        if (message.trim() !== '') {
            setMessages([
                ...messages,
                {
                    text: message,
                    type: isNextMessageEnd ? 'end' : 'start',
                },
            ]);
            setIsNextMessageEnd(!isNextMessageEnd);
            setMessage('');
            setShowEmojiPicker(false);
        }
    };

    const handleEmojiClick = (emojiData) => {
        setMessage((prev) => prev + emojiData.emoji);
    };

    return (
        <>
            {!isChatOpen && (
                <button
                    onClick={toggleChatModal}
                    className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
                >
                    💬
                </button>
            )}

            {isChatOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-end justify-end"
                    onClick={toggleChatModal}
                >
                    <div
                        className="bg-white rounded-t-2xl shadow-xl w-full max-w-md h-[75vh] flex flex-col p-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center border-b pb-3">
                            <h2 className="text-lg font-bold text-gray-800">Live Chat</h2>
                            <button
                                onClick={toggleChatModal}
                                className="text-2xl text-gray-500 hover:text-gray-800"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 rounded-md mt-3">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.type === 'end' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${msg.type === 'end'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Emoji Picker */}
                        {showEmojiPicker && (
                            <div className="absolute bottom-20 right-4 z-50">
                                <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" />
                            </div>
                        )}

                        {/* Input */}
                        <div className="mt-4 flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="text-2xl hover:opacity-80"
                            >
                                😊
                            </button>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition-all"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatModal;
