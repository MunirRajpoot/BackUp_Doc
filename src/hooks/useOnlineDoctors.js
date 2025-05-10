// hooks/useOnlineDoctors.js
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';

export default function useOnlineDoctors() {
  const [onlineDoctors, setOnlineDoctors] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

    // Add token as query param if user is logged in
    const authToken = Cookies.get("auth_token");
    const query = authToken ? `?token=${authToken}` : '';
    const socketUrl = `${protocol}://${process.env.NEXT_PUBLIC_WS_SERVER_URL}/ws/online-users/${query}`;

    const socket = new WebSocket(socketUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('[WebSocket] Connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'online_doctors') {

        console.log('[WebSocket] Online users:', data.data);
        setOnlineDoctors(data.data);
      }
    };

    socket.onclose = () => {
      console.log('[WebSocket] Disconnected');
    };

    return () => {
      socket.close();
    };
  },[]);

  return { onlineDoctors };
}
