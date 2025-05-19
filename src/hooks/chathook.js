// hooks/chathook.js
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';

export default function userChat(autoConnect = false) {
    const socketRef = useRef(null);
    const [data, setData] = useState(null);

    const connectWebSocket = (roomName) => {
        if (socketRef.current) return;

        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const authToken = Cookies.get("auth_token");
        const query = authToken ? `?token=${authToken}` : '';
        const socketUrl = `${protocol}://${process.env.NEXT_PUBLIC_WS_SERVER_URL}/ws/chat/${query}&roomName=${roomName}`;

        const socket = new WebSocket(socketUrl);
        socketRef.current = socket;

        socket.onopen = (event) => {
            
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case "chat_message":
                    setData(data);
                    break;
                case "file":
                    // handle file message
                    break;
                case "chat_history":
                    setData(data.messages);
                    break;
                default:
                    console.warn("Unknown message type:", data.type);
            }
        };

        socket.onclose = () => {
            console.log('[WebSocket] Disconnected');
            socketRef.current = null;
        };

        socket.onerror = (error) => {
            console.error('[WebSocket] Error:', error);
        };
    };

    const disconnectWebSocket = () => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
    };

    // ✅ Accept `roomName` as an argument
    const sendMessage = (message, roomName) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            const payload = JSON.stringify({
                type: 'chat_message',
                message,
                roomName,
            });
            socketRef.current.send(payload);
        } else {
            console.warn('WebSocket is not open. Message not sent:', message);
        }
    };

    return {
        data,
        connectWebSocket,
        disconnectWebSocket,
        sendMessage,
    };
}
