"use client";

import "./style/notif.css";
import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "@/app/lib/redux/hook";
import useNotificationSocket from "@/app/components/hook/useNotification";
import {
  useDeleteManyNotificationMutation,
  useGetNotificationQuery,
  useMarkAllNotificationsMutation,
} from "@/app/lib/redux/api/notificationApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Notification = {
  id: string;
  message: string; // Berisi HTML
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
      refetchOnMountOrArgChange: true,
    }
  );
  const [markAllNotif, { isLoading: markLoading }] =
    useMarkAllNotificationsMutation();
  const [deleteAllNotif, { isLoading: deletedLoading }] =
    useDeleteManyNotificationMutation();

  useEffect(() => {
    if (initialNotifications) {
      setNotifications(initialNotifications);
    }
  }, [initialNotifications]);

  const handleNewNotification = useCallback((newNotification: Notification) => {
    setNotifications((prevNotifications) => {
      const notificationExists = prevNotifications.some(
        (notification) => notification.id === newNotification.id
      );

      if (notificationExists) {
        return prevNotifications;
      }
      return [newNotification, ...prevNotifications];
    });
  }, []);

  const handleMarkAllNotification = async () => {
    try {
      await markAllNotif({ userId }).unwrap();
      toast.success("Semua notifikasi berhasil ditandai sudah dibaca");
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  const handleDeleteAllNotification = async () => {
    try {
      await deleteAllNotif({ userId }).unwrap();
      toast.success("Semua notif dihapus");
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  const allNotificationsRead = notifications.every(
    (notif: Notification) => notif.status
  );

  useNotificationSocket(userId, handleNewNotification);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Notifikasi</h2>
      {notifications.length > 0 && (
        <div className="flex justify-between my-2">
          <Button
            onClick={handleDeleteAllNotification}
            variant={"destructive"}
            disabled={deletedLoading}
          >
            Hapus Semua Notif
          </Button>
          <Button
            onClick={handleMarkAllNotification}
            disabled={markLoading || allNotificationsRead}
          >
            Tandai Telah dibaca
          </Button>
        </div>
      )}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`tiptap transition-all duration-300 p-3 rounded-md shadow-sm ${
                item.status ? "bg-blue-100" : "bg-red-300"
              } hover:shadow-md`}
            >
              {/* Render HTML dengan dangerouslySetInnerHTML */}
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.message }}
              ></div>
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
