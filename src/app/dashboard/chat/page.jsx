'use client';
import React, { useEffect, useRef, useState } from 'react';
import userChat from '@/hooks/chathook';
import { useSelector } from "react-redux";
import axios from 'axios';
import Cookies from 'js-cookie';


const ChatPage = () => {
    const messagesEndRef = useRef(null);
    const userState = useSelector((state) => state.user) || {};
    const { user_id } = userState;
    const [message, setMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [chatUsers, setChatUsers] = useState([]);
    const { connectWebSocket, disconnectWebSocket, sendMarkRead, sendTyping, sendFile, data, sendMessage } = userChat();
    const [activeRoom, setActiveRoom] = useState(null);
    const [roomMessages, setRoomMessages] = useState({}); // {roomId: [{text, sender}, ...]}

    const handleSend = () => {
        if (!message.trim() && selectedFiles.length === 0) return;

        // Send text
        if (message.trim()) {
            sendMessage(message, activeRoom);
            setRoomMessages(prev => ({
                ...prev,
                [activeRoom]: [
                    ...(prev[activeRoom] || []),
                    { text: message, sender: user_id, isSender: true }
                ]
            }));
        }

        // Send files
        selectedFiles.forEach(file => {
            sendFile(file, activeRoom); // Your own function
            setRoomMessages(prev => ({
                ...prev,
                [activeRoom]: [
                    ...(prev[activeRoom] || []),
                    {
                        text: `📎 ${file.name}`,
                        fileType: file.type,
                        fileURL: URL.createObjectURL(file),
                        sender: user_id,
                        isSender: true
                    }
                ]
            }));
        });

        // Reset
        setMessage('');
        setSelectedFiles([]);
        setShowEmojiPicker(false);
    };


    const handleEmojiClick = (emojiData) => {
        setMessage((prev) => prev + emojiData.emoji);
    };



    useEffect(() => {
        if (!data) return;

        const roomId = data.room || activeRoom;

        if (data.type === "chat_message") {
            const isFromCurrentUser = data.sender_id === user_id;
            if (isFromCurrentUser) return; // Ignore own message broadcast

            setRoomMessages(prev => ({
                ...prev,
                [roomId]: [
                    ...(prev[roomId] || []),
                    { text: data.message, sender: data.sender_id }
                ]
            }));
        }
        if (data?.type === "file") {
            const isFromCurrentUser = data.from_user === user_id;
            if (isFromCurrentUser) return; // Ignore own file broadcast

            // Infer file type (optional enhancement)
            const extension = data.file_url.split('.').pop().toLowerCase();
            let fileType = "";
            if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension)) {
                fileType = "image/" + extension;
            } else if (["mp4", "webm", "ogg"].includes(extension)) {
                fileType = "video/" + extension;
            } else {
                fileType = "application/octet-stream"; // fallback for other files
            }

            setRoomMessages(prev => ({
                ...prev,
                [roomId]: [
                    ...(prev[roomId] || []),
                    {
                        fileURL: data.file_url,
                        fileType: fileType,
                        sender: data.from_user,
                        text: data.original_filename || '', // Optional filename/text
                    },
                ]
            }));
        }


        if (data.type === "chat_history") {
            const historyMessages = data.messages.map(msg => {
                const hasFile = msg.file_url !== null && msg.file_url !== "";
                let fileType = null;

                if (hasFile) {
                    const extension = msg.file_url.split('.').pop().toLowerCase();
                    if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension)) {
                        fileType = "image/" + extension;
                    } else if (["mp4", "webm", "ogg"].includes(extension)) {
                        fileType = "video/" + extension;
                    } else {
                        fileType = "application/octet-stream";
                    }
                }

                return {
                    text: msg.content || "", // Keep empty string if no content
                    sender: msg.sender_id,
                    timestamp: msg.timestamp,
                    fileURL: hasFile ? msg.file_url : null,
                    fileType: hasFile ? fileType : null,
                };
            });

            setRoomMessages(prev => ({
                ...prev,
                [roomId]: historyMessages
            }));
        }

    }, [data]);



    const fetchChatUsers = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/users-list/`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth_token')}`
                }
            });
            if (res.status === 200) {
                setChatUsers(res.data);
            } else {
                console.error('Failed to fetch chat users:', res.status);
            }
        } catch (error) {
            console.error('Error fetching chat users:', error);
        }

    }
    useEffect(() => {
        fetchChatUsers();
    }, [])

    useEffect(() => {
        if (activeRoom) {
            connectWebSocket(false, activeRoom);
        }
    }, [activeRoom]);

    const handleChatbox = (userId) => {
        const user = chatUsers.find(u => u.user_id === userId);
        setSelectedUser(user);
        setActiveRoom(userId);
        connectWebSocket(false, userId);
        setShowChat(true);
        sendMarkRead(userId); // Mark the chat as read when opening
    };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeRoom, roomMessages[activeRoom]?.length]);

    const handleSendFile = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prev => [...prev, ...files]);
    };
    const handleTyping = (roomName) => {
        console.log("Typing in room:", roomName);
   
        connectWebSocket(true, roomName);
        sendTyping(roomName);
        
    };



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
                        {chatUsers
                            .sort((a, b) => b.isNew - a.isNew)
                            .map((user) => (
                                <li
                                    key={user.user_id}
                                    className="flex items-center cursor-pointer hover:bg-gray-100 hover:text-black p-2"
                                    onClick={() => handleChatbox(user.user_id)}
                                >
                                    <img
                                        src={`https://i.pravatar.cc/40?img=${user.imgId}`}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <div className="ml-3">
                                        <p className="font-medium capitalize">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.lastMessage}</p>
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
                                    <p className="font-semibold text-white capitalize">{selectedUser?.name}</p>
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
                        <div
                            className="flex-1 overflow-y-scroll px-4 py-6 space-y-4 bg-dark" style={{ scrollbarWidth: "none" }}>
                            {(roomMessages[activeRoom] || []).map((msg, idx) => {
                                const isSender = msg.sender === user_id;
                                const alignment = isSender ? 'self-end ml-auto' : 'self-start mr-auto';
                                const bubbleBase = isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800';

                                /* ---------- 1. NORMALISE ---------- */
                                const fileURL = msg.fileURL || msg.file_url || '';
                                const fileName = fileURL.split('/').pop().split('?')[0];   // ⇦ safe even with ?token=

                                /* ---------- 2. DERIVE TYPE ---------- */
                                const isImage = msg.fileType?.startsWith('image/')
                                    || /\.(jpe?g|png|gif|webp|avif)$/i.test(fileName);

                                const isVideo = msg.fileType?.startsWith('video/')
                                    || /\.(mp4|mov|webm)$/i.test(fileName);

                                const isDoc = /\.(pdf|docx?|xlsx?|pptx?|txt?)$/i.test(fileName);

                                return (
                                    <div
                                        key={idx}
                                        className={`w-fit max-w-[75%] px-4 py-2 rounded-lg shadow-md ${bubbleBase} ${alignment} my-1`}
                                    >
                                        {/* ---------- FILE BUBBLES ---------- */}
                                        {fileURL && (
                                            <>
                                                {isImage && (
                                                    <div className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg shadow-md max-w-xs">
                                                        {/* image icon */}
                                                        <svg className="w-10 h-10 text-blue-500" >
                                                            <path d="M3 5a2 2" />
                                                        </svg>

                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium text-gray-800 truncate">
                                                                {fileName.length > 20 ? `${fileName.slice(0, 20)}...` : fileName}
                                                            </p>
                                                            <a
                                                                href={!isSender ? `${process.env.NEXT_PUBLIC_SERVER_URL}${fileURL}` : fileURL}
                                                                download={fileName}
                                                                className="inline-block mt-1 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition"
                                                            >
                                                                Download
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {isVideo && (
                                                    <video
                                                        src={!isSender ? `${process.env.NEXT_PUBLIC_SERVER_URL}${fileURL}` : fileURL}
                                                        controls
                                                        className="rounded max-h-60"
                                                    />
                                                )}

                                                {isDoc && (
                                                    <div className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg shadow-md max-w-xs">
                                                        {/* document icon */}
                                                        <svg className="w-10 h-10 text-gray-600">
                                                            <path d="M9 12h6" />
                                                        </svg>

                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium text-gray-800 truncate">
                                                                {fileName.length > 20 ? `${fileName.slice(0, 20)}...` : fileName}
                                                            </p>
                                                            <a
                                                                href={`${process.env.NEXT_PUBLIC_SERVER_URL}${fileURL}`}
                                                                download={fileName}
                                                                className="inline-block mt-1 text-sm text-white bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded transition"
                                                            >
                                                                Download
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        {/* ---------- TEXT MESSAGE ---------- */}
                                        {msg.text && <p className={fileURL ? 'mt-1' : ''}>{msg.text}</p>}
                                    </div>
                                );
                            })}

                            <div ref={messagesEndRef} ></div>
                        </div>


                        {/* Chat Input */}
                        <div className="border-t border-gray-500 px-4 py-3 bg-dark">
                            {selectedFiles.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {selectedFiles.map((file, index) => {
                                        const fileURL = URL.createObjectURL(file);
                                        const type = file.type;

                                        return (
                                            <div key={index} className="relative w-28 h-28 border rounded overflow-hidden">
                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== index))}
                                                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center z-10"
                                                >
                                                    ×
                                                </button>

                                                {/* Image Preview */}
                                                {type.startsWith("image/") && (
                                                    <img src={fileURL} alt="preview" className="w-full h-full object-cover" />
                                                )}

                                                {/* Video Preview */}
                                                {type.startsWith("video/") && (
                                                    <video className="w-full h-full object-cover" controls>
                                                        <source src={fileURL} type={file.type} />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}

                                                {/* Document or Other */}
                                                {!type.startsWith("image/") && !type.startsWith("video/") && (
                                                    <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-center text-sm p-2">
                                                        📄 {file.name.length > 10 ? file.name.slice(0, 10) + "..." : file.name}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

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
                                {/* File Upload Button */}
                                <input
                                    type="file"
                                    id="fileInput"
                                    multiple
                                    onChange={handleSendFile}
                                    className="hidden"
                                />
                                <label htmlFor="fileInput" className="cursor-pointer text-gray-600 hover:text-gray-200">
                                    📎 Attach
                                </label>



                                {/* Text Input */}
                                <input
                                    type="text"
                                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                        handleTyping(activeRoom);
                                    }}
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

                            {/* CTA Button
                            <button
                                onClick={() => setShowChat(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full shadow-md transition duration-200"
                            >
                                Start Chat
                            </button> */}
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default ChatPage;
