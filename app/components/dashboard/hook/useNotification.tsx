import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

const useNotificationSocket = (
  userId: string | undefined,
  onNewNotification: (notification: any) => void
) => {
  useEffect(() => {
    if (!userId) return;

    const socket: Socket = io(process.env.NEXT_PUBLIC_DB_HOST as string, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to socket server");
      socket.emit("joinRoom", userId);
    });

    socket.on("notification", (notification) => {
      console.log("New notification received:", notification);
      onNewNotification(notification);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, onNewNotification]);
};

export default useNotificationSocket;
