import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";

const useNotificationSocket = (
  userId: string | undefined,
  onNewNotification: (notification: any) => void
) => {
  const socketRef = useRef<Socket | null>(null);

  const connectSocket = useCallback(() => {
    if (!userId) return;

    // Clean up existing connection if any
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current.removeAllListeners();
    }

    // Create new connection matching backend configuration
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_HOST, {
      transports: ["polling", "websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
      query: { userId },
      autoConnect: true,
    });

    socketRef.current = socket;

    // Event handlers matching backend events
    socket.on("connect", () => {
      console.log("Socket connected with ID:", socket.id);
    });

    socket.on("connect_success", (data) => {
      console.log("Connection successful:", data);
    });

    socket.on("joinedRoom", (data) => {
      console.log("Successfully joined room:", data);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    socket.on("notification", (notification) => {
      console.log("New notification received:", notification);
      onNewNotification(notification);
    });

    // Cleanup function
    return () => {
      if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
      }
    };
  }, [userId, onNewNotification]);

  // Initialize socket connection
  useEffect(() => {
    const cleanup = connectSocket();
    return () => {
      if (cleanup) cleanup();
    };
  }, [connectSocket]);

  return {
    socket: socketRef.current,
    isConnected: socketRef.current?.connected || false,
  };
};

export default useNotificationSocket;
