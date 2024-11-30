import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface NotificationSocketHook {
  socket: Socket | null;
  isConnected: boolean;
}

const useNotificationSocket = (
  userId: string | undefined,
  onNewNotification: (notification: any) => void
): NotificationSocketHook => {
  const socketRef = useRef<Socket | null>(null);

  const connectSocket = useCallback(() => {
    // Exit early if no userId
    if (!userId) return null;

    // Disconnect existing socket
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current.removeAllListeners();
    }

    // Create new socket connection
    const socket = io(
      `${process.env.NEXT_PUBLIC_SOCKET_HOST}/notification` || "",
      {
        transports: ["websocket", "polling"],
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
        query: { userId },
        autoConnect: true,
      }
    );

    // Socket event handlers
    socket.on("connect", () => {
      console.log("Socket connected. ID:", socket.id);
      // Optional: Join user-specific room
      socket.emit("joinRoom", `user-${userId}`);
    });

    socket.on("notification", (notification) => {
      console.log("New notification received:", notification);
      onNewNotification(notification);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socketRef.current = socket;

    // Return cleanup function
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [userId, onNewNotification]);

  // Socket connection effect
  useEffect(() => {
    const cleanup = connectSocket();

    return () => {
      cleanup?.();
    };
  }, [connectSocket]);

  return {
    socket: socketRef.current,
    isConnected: socketRef.current?.connected || false,
  };
};

export default useNotificationSocket;
