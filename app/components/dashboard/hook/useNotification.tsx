import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

const useNotificationSocket = (userId: string) => {
  useEffect(() => {
    const socket: Socket = io(process.env.NEXT_PUBLIC_DB_HOST as string, {
      withCredentials: true,
    });
    socket.emit("joinRoom", userId);
    socket.on("notification", (notification) => {
      console.log(notification);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);
};

export default useNotificationSocket;
