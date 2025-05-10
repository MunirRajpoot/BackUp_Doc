import React from 'react';

const ChatPage = () => {
    return (
        <div className="flex h-screen">
            {/* Left Sidebar */}
            <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 p-4 overflow-y-auto">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Your Profile</h2>
                    <div className="mt-4 flex items-center space-x-3">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-sm text-gray-500">@johndoe</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-md font-semibold mb-3">Chats</h3>
                    <ul className="space-y-4">
                        {['alice', 'bob', 'charlie'].map((user, index) => (
                            <li key={index} className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
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

            {/* Right Chat Window */}
            <main className="flex-1 p-4 flex flex-col">
                <div className="border-b pb-4 mb-4">
                    <h2 className="text-xl font-semibold">Chat with Alice</h2>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4">
                    {/* Chat bubbles */}
                    <div className="flex justify-start">
                        <div className="bg-gray-100 p-3 rounded-lg max-w-sm">Hey there!</div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-blue-500 text-white p-3 rounded-lg max-w-sm">Hi! How are you?</div>
                    </div>
                    {/* Add more messages here */}
                </div>

                {/* Message Input */}
                <div className="mt-4 flex items-center border-t pt-4">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                        Send
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ChatPage;
