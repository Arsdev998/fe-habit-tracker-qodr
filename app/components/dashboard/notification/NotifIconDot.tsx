"use client";

import { MdNotificationsActive, MdNotifications } from "react-icons/md";
import { useGetUnreadNotificationQuery } from "@/app/lib/redux/api/notificationApi";
import { useAppSelector } from "@/app/lib/redux/hook";
import { useCallback, useEffect, useState } from "react";
import useNotificationSocket from "../hook/useNotification";

function NotifIconDot() {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;

  // State untuk menyimpan jumlah unread notifications
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: unreadNotif } = useGetUnreadNotificationQuery(
    { userId },
    {
      skip: !userId,
    }
  );

  // Callback untuk handle notifikasi baru dari socket
  const handleNewNotification = useCallback((newNotification: any) => {
    setUnreadCount((prevCount) => prevCount + 1); // Tambah count saat ada notifikasi baru
  }, []);

  useNotificationSocket(userId, handleNewNotification);

  // Set unreadCount saat data unreadNotif pertama kali didapat
  useEffect(() => {
    if (unreadNotif !== undefined) {
      setUnreadCount(unreadNotif); // Inisialisasi unread count dari API
    }
  }, [unreadNotif]);


  return (
    <div>
      {unreadCount === 0 ? (
        <MdNotifications className="text-xl" />
      ) : (
        <div className="relative">
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 text-xs font-semibold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
          <MdNotificationsActive className="text-xl" />
        </div>
      )}
    </div>
  );
}

export default NotifIconDot;
