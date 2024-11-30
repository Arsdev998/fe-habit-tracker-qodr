"use client";

import { MdNotificationsActive, MdNotifications } from "react-icons/md";
import { useGetUnreadNotificationQuery } from "@/app/lib/redux/api/notificationApi";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hook";
import { useCallback, useEffect, useState } from "react";
import useNotificationSocket from "@/app/lib/useNotification";
import { incrementUnreadCount, setUnreadCount } from "@/app/lib/redux/features/notifSlice";

function NotifIconDot() {
  const user = useAppSelector((state) => state.auth.user);
  const unreadCount = useAppSelector((state) => state.notification.unreadCount);
  const userId = user?.id;
  const dispatch = useAppDispatch();
  // State to store unread notifications count
  // Fetch unread notifications query
  const { data: initialUnreadNotif } = useGetUnreadNotificationQuery(
    { userId },
    {
      skip: !userId,
      refetchOnMountOrArgChange: true,
    },
  );

  // Callback to handle new notifications from socket
  const handleNewNotification = useCallback((notification: any) => {
    // Increment the unread count immediately
   dispatch(incrementUnreadCount());

    // Optional: Log the notification
    console.log("New notification received:", notification);
  }, []);

  // Use the notification socket hook
  const { isConnected } = useNotificationSocket(userId, handleNewNotification);

  // Update unread count when initial data is fetched
  useEffect(() => {
    if (initialUnreadNotif !== undefined) {
      dispatch(setUnreadCount(initialUnreadNotif));
    }
  }, [initialUnreadNotif]);

  return (
    <div className="relative">
      {/* Socket connection status indicator */}
      {!isConnected && (
        <div className="absolute -top-2 -right-2 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
      )}

      {unreadCount === 0 ? (
        <MdNotifications className="text-xl" />
      ) : (
        <div className="relative">
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
          <MdNotificationsActive className="text-xl" />
        </div>
      )}
    </div>
  );
}

export default NotifIconDot;
