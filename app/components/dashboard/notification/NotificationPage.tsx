"use client"

import { useState } from "react";
import { useAppSelector } from "@/app/lib/redux/hook";
import useNotificationSocket from "../hook/useNotification";
import { useGetNotificationQuery } from "@/app/lib/redux/api/notification";

type Notification = {
  id: string;
  message: string;
  status: boolean;
};

function NotificationPage() {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;

  const [realTimeNotifications, setRealTimeNotifications] = useState<
    Notification[]
  >([]);

  // Update state with new notifications from socket
  useNotificationSocket(userId, (newNotification: Notification) => {
    setRealTimeNotifications((prev) => [newNotification, ...prev]);
  });

  const { data, isLoading } = useGetNotificationQuery(
    { userId },
    {
      skip: !userId,
    }
  );

  // Combine initial data and real-time notifications
  const allNotifications = [...realTimeNotifications, ...(data || [])];

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Notifikasi</h2>
      {allNotifications && allNotifications.length > 0 ? (
        allNotifications.map((item) => (
          <div
            key={item.id}
            className={`bg-blue-100 p-3 my-2 rounded-md shadow-sm ${
              item.status ? "" : "bg-red-300"
            }`}
          >
            <p className="text-gray-700">{item.message}</p>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400">Tidak ada notifikasi</div>
      )}
    </div>
  );
}

export default NotificationPage;
