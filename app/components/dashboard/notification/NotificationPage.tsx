"use client";

import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "@/app/lib/redux/hook";
import useNotificationSocket from "../hook/useNotification";
import { useGetNotificationQuery } from "@/app/lib/redux/api/notificationApi";

type Notification = {
  id: string;
  message: string;
  status: boolean;
  createdAt?: Date;
};

function NotificationPage() {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { data: initialNotifications, isLoading } = useGetNotificationQuery(
    { userId },
    {
      skip: !userId,
    }
  );

  // Initialize notifications with data from API
  useEffect(() => {
    if (initialNotifications) {
      setNotifications(initialNotifications);
    }
  }, [initialNotifications]);

  // Callback untuk menangani notifikasi baru
  const handleNewNotification = useCallback((newNotification: Notification) => {
    setNotifications((prevNotifications) => {
      // Cek apakah notifikasi sudah ada (mencegah duplikasi)
      const notificationExists = prevNotifications.some(
        (notification) => notification.id === newNotification.id
      );

      if (notificationExists) {
        return prevNotifications;
      }

      // Tambahkan notifikasi baru ke awal array
      return [newNotification, ...prevNotifications];
    });
  }, []);
  useNotificationSocket(userId, handleNewNotification);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Notifikasi</h2>
      {notifications && notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`transition-all duration-300 p-3 rounded-md shadow-sm ${
                item.status ? "bg-blue-100" : "bg-red-300"
              } hover:shadow-md`}
            >
              <p className="text-gray-700">{item.message}</p>
              {item.createdAt && (
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          Tidak ada notifikasi
        </div>
      )}
    </div>
  );
}

export default NotificationPage;
