'use client';

import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const ChatModal = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isNextMessageEnd, setIsNextMessageEnd] = useState(true); // true = user, false = other

    const toggleChatModal = () => {
        setIsChatOpen(!isChatOpen);
        setShowEmojiPicker(false);
    };

    const handleSend = () => {
        if (message.trim() !== '') {
            setMessages([...messages, {
                text: message,
                type: isNextMessageEnd ? 'end' : 'start',
            }]);
            setIsNextMessageEnd(!isNextMessageEnd); // alternate next message type
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
                        className="bg-white rounded-t-2xl shadow-2xl w-full max-w-md h-[70vh] p-4 flex flex-col relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center border-b pb-2 mb-2">
                            <h4 className="text-lg font-semibold text-black">Live Chat</h4>
                            <button onClick={toggleChatModal} className="text-xl text-gray-500 hover:text-gray-800">&times;</button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto space-y-4 bg-gray-100 p-3 rounded-lg">
                            {messages.map((msg, index) => (
                                <div key={index} className={`chat ${msg.type === 'end' ? 'chat-end' : 'chat-start'}`}>
                                    <div className={`chat-bubble ${msg.type === 'end' ? 'chat-bubble-info' : 'chat-bubble-neutral'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Emoji Picker */}
                        {showEmojiPicker && (
                            <div className="absolute bottom-20 right-3 z-50">
                                <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" />
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="mt-3 flex items-center relative">
                            <button
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="text-xl px-2"
                                type="button"
                            >
                                😊
                            </button>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="input input-bordered w-full rounded-l-md focus:outline-none text-black"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button onClick={handleSend} className="btn btn-primary rounded-r-md px-4">Send</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatModal;
