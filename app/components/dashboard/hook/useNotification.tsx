import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";

const useNotificationSocket = (
  userId: string | undefined,
  onNewNotification: (notification: any) => void
) => {
  const socketRef = useRef<Socket | null>(null);

  const connectSocket = useCallback(() => {
    if (!userId) return;

    // Membersihkan koneksi yang ada jika ada
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    // Membuat koneksi baru dengan namespace yang sesuai
    const socket = io(`${process.env.NEXT_PUBLIC_DB_HOST}/notifications`, {
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      query: { userId }, // Menambahkan userId sebagai query parameter
    });

    socketRef.current = socket;

    // Event handlers
    socket.on("connect", () => {
      console.log("Socket connected with ID:", socket.id);
      // Mengirim event joinRoom setelah koneksi berhasil
      socket.emit("joinRoom", userId);
    });

    socket.on("joinedRoom", (data) => {
      console.log("Successfully joined room:", data);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("notification", (notification) => {
      console.log("New notification received:", notification);
      onNewNotification(notification);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, onNewNotification]);

  useEffect(() => {
    const cleanup = connectSocket();
    return () => {
      if (cleanup) cleanup();
    };
  }, [connectSocket]);
};

export default useNotificationSocket;
