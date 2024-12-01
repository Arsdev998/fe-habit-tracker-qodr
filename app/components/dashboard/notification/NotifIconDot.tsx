"use client";
import { MdNotificationsActive, MdNotifications } from "react-icons/md";
import { useGetUnreadNotificationQuery } from "@/app/lib/redux/api/notificationApi";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hook";
import { useCallback, useEffect } from "react";
import useNotificationSocket from "@/app/lib/useNotification";
import { incrementUnreadCount, setUnreadCount } from "@/app/lib/redux/features/notifSlice";

function NotifIconDot() {
  const user = useAppSelector((state) => state.auth.user);
  const unreadCount = useAppSelector((state) => state.notification.unreadCount);
  const userId = user?.id;
  const dispatch = useAppDispatch();
  const { data: initialUnreadNotif } = useGetUnreadNotificationQuery(
    { userId },
    {
      skip: !userId,
      refetchOnMountOrArgChange: true,
    },
  );
  const handleNewNotification = useCallback((notification: any) => {
   dispatch(incrementUnreadCount());
  }, []);

  const { isConnected } = useNotificationSocket(userId, handleNewNotification);

  useEffect(() => {
    if (initialUnreadNotif !== undefined) {
      dispatch(setUnreadCount(initialUnreadNotif));
    }
  }, [initialUnreadNotif]);

  return (
    <div className="relative">
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
