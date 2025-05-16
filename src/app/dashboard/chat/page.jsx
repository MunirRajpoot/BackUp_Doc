'use client';
import React, { useEffect, useState } from 'react';
import userChat from '@/hooks/chathook';
import { useSelector } from "react-redux";

const ChatPage = () => {
    const userState = useSelector((state) => state.user) || {};
    const { user_type } = userState;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isNextMessageEnd, setIsNextMessageEnd] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(true); // assuming a toggle state


    const roomName = 5; // add your actual room name
    const { connectWebSocket, disconnectWebSocket, data, sendMessage } = userChat(false, roomName);

    const handleSend = () => {
        if (message.trim() === '') return;

        // Send to server
        sendMessage(message, roomName);

        // Display locally
        setMessages(prev => [
            ...prev,
            {
                text: message,
                sender: userState.user?.id, // Save sender ID
            },
        ]);


        setIsNextMessageEnd(!isNextMessageEnd);
        setMessage('');
        setShowEmojiPicker(false);
    };

    const handleEmojiClick = (emojiData) => {
        setMessage((prev) => prev + emojiData.emoji);
    };

    useEffect(() => {
        if (isChatOpen) {
            connectWebSocket();
        } else {
            setMessages([]);
            disconnectWebSocket();
        }

        return () => {
            disconnectWebSocket();
        };
    }, [isChatOpen]);

    useEffect(() => {
        if (data) {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: data.message,
                    sender: data.sender, // Save sender ID
                },
            ]);
        }
    }, [data]);


    const handleChatbox = (roomName) => {
        console.log("Chatbox clicked", roomName);
        connectWebSocket(5);
        setShowChat(true)
    }

    return (
        <div className="flex h-screen">
            {/* Left Sidebar */}
            <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200/10  overflow-y-auto ">
                <div className="mb-6 p-2 mt-4">
                    <h2 className="text-xl font-semibold">Your Profile</h2>
                    <div className="mt-4 flex items-center space-x-3">
                        <img
                            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${userState.user.profile_url}`}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="font-medium">{`${userState.user.first_name}  ${userState.user.last_name}`}</p>

                        </div>
                    </div>
                </div>

                <div>
                    <div className="p-2">
                        <h3 className="text-md font-semibold mb-3">Chats</h3>
                    </div>
                    <ul className="space-y-4">
                        {['alice', 'bob', 'charlie'].map((user, index) => (
                            <li key={index} className="flex items-center cursor-pointer hover:bg-gray-100 hover:text-black p-2" onClick={() => handleChatbox(index)}>
                                <img
                                    src={`https://i.pravatar.cc/40?img=${index + 1}`}
                                    alt={user}
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="ml-3">
                                    <p className="font-medium capitalize">{user}</p>
                                    <p className="text-sm text-gray-500">Last message...</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            {
                showChat ? (
                    <div className="flex-1 flex flex-col h-full bg-dark text-white">
                        {/* Chat Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-500">
                            <div className="flex items-center space-x-3">
                                <img
                                    src="https://i.pravatar.cc/300"
                                    alt="Chat User"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-white capitalize">Selected User</p>
                                    <p className="text-xs text-gray-500">Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowChat(false)}
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Close Chat
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-dark">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`max-w-xs md:max-w-sm lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${msg.type === 'end'
                                        ? 'bg-blue-500 text-white self-end'
                                        : 'bg-gray-200 text-gray-800 self-start'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        {/* Chat Input */}
                        <div className="border-t border-gray-500 px-4 py-3 bg-dark">
                            <div className="flex items-center space-x-3 relative">
                                {/* Emoji Picker Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    😊
                                </button>

                                {/* Emoji Picker */}
                                {showEmojiPicker && (
                                    <div className="absolute bottom-16 left-0 z-50 bg-white shadow-lg border rounded-md p-2">
                                        <div className="flex space-x-2 text-xl cursor-pointer">
                                            {['😀', '😁', '😂', '🤣', '😍'].map((emoji) => (
                                                <span key={emoji} onClick={() => handleEmojiClick({ emoji })}>
                                                    {emoji}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Text Input */}
                                <input
                                    type="text"
                                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />

                                {/* Send Button */}
                                <button
                                    onClick={handleSend}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-dark">
                        <div className="text-center px-4 max-w-md w-full">
                            {/* Chat Icon */}
                            <div className="mx-auto mb-6">
                                <svg
                                    className="mx-auto h-20 w-20 text-blue-500 animate-pulse"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 3.866-3.582 7-8 7a8.969 8.969 0 01-4.472-1.19L3 21l1.373-4.605C3.487 15.335 3 13.724 3 12c0-3.866 3.582-7 8-7s8 3.134 8 7z"
                                    />
                                </svg>
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl font-bold text-gray-300 mb-2">No Chat Selected</h2>

                            {/* Subtitle */}
                            <p className="text-gray-500 mb-6 text-sm sm:text-base">
                                Select a user from the sidebar to start chatting or click below to begin.
                            </p>

                            {/* CTA Button */}
                            <button
                                onClick={() => setShowChat(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full shadow-md transition duration-200"
                            >
                                Start Chat
                            </button>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default ChatPage;
