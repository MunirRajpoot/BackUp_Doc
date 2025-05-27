// hooks/chathook.js
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';

export default function userChat() {
    const socketRef = useRef(null);
    const [data, setData] = useState(null);

    const connectWebSocket = (connect = false, roomName) => {
        if (connect || socketRef.current) return;

        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const authToken = Cookies.get("auth_token");

        const wsUrl = `${protocol}://${process.env.NEXT_PUBLIC_WS_SERVER_URL}/ws/chat/?token=${authToken}&roomName=${roomName}`;

        socketRef.current = new WebSocket(wsUrl);

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setData(data);
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket closed");
        };

        socketRef.current.onerror = (err) => {
            console.error("WebSocket error:", err);
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
                to_user: roomName,
            });
            socketRef.current.send(payload);
        } else {
            console.warn('WebSocket is not open. Message not sent:', message);
        }
    };
    const sendMarkRead = (roomName) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            const payload = JSON.stringify({
                type: 'mark_read',
                to_user: roomName,
            });
            socketRef.current.send(payload);
        } else {
            console.warn('WebSocket is not open. Mark read not sent for:', roomName);
        }
    };
    const sendTyping = (roomName) => {
        console.log("Sending typing notification for room:", roomName);
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            const payload = JSON.stringify({
                type: 'typing',
                to_user: roomName,
            });
            socketRef.current.send(payload);
            console.log("Typing notification sent for room:", roomName);
        } else {
            console.warn('WebSocket is not open. Mark read not sent for:', roomName);
        }
    };
    const sendFile = (file, to_user) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(",")[1]; // remove data:*/*;base64, prefix
            socketRef.current.send(
                JSON.stringify({
                    type: "file",
                    file_name: file.name,
                    file_data: base64,
                    file_type: file.type,
                    to_user,
                })
            );
        };
        reader.readAsDataURL(file);
    };

    return {
        data,
        sendFile,
        connectWebSocket,
        disconnectWebSocket,
        sendMessage,
        sendMarkRead,
        sendTyping,
    };
}
