// hooks/chathook.js
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';

export default function userChat() {
    const socketRef = useRef(null);
    const [data, setData] = useState(null);

    const connectWebSocket = (connect = false, roomName) => {
        console.log("Connecting to WebSocket...");
        if (connect || socketRef.current) return;
        console.log("Connecting to 2 WebSocket...");

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
