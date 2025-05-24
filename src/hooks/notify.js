import Cookies from 'js-cookie';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export default function useUserNotify() {
    const socketRef = useRef(null);
    const connectedRef = useRef(false); // still use this, but don't guard hooks with it

    const connectWebSocket = () => {
        // Only connect if not already connected
        if (connectedRef.current || socketRef.current) return;

        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const authToken = Cookies.get("auth_token");
        if (!authToken) return;

        const wsUrl = `${protocol}://${process.env.NEXT_PUBLIC_WS_SERVER_URL}/ws/notifications/?token=${authToken}`;
        socketRef.current = new WebSocket(wsUrl);
        connectedRef.current = true;

        socketRef.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === "notification") {
                    toast.info(data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            } catch (e) {
                console.error("Invalid WebSocket message format:", e);
            }
        };

        socketRef.current.onclose = () => {
            // console.log("WebSocket closed");
            connectedRef.current = false;
            socketRef.current = null;
        };

        socketRef.current.onerror = (err) => {
            // console.error("WebSocket error:", err);
        };
    };

    const disconnectWebSocket = () => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
            connectedRef.current = false;
        }
    };

    useEffect(() => {
        connectWebSocket();
        return () => disconnectWebSocket();
    }, []);

    return {
        connectWebSocket,
        disconnectWebSocket,
    };
}
