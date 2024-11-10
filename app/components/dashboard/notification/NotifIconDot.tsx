"use client";

import { MdNotificationsActive, MdNotifications } from "react-icons/md";
import { useGetUnreadNotificationQuery } from "@/app/lib/redux/api/notification";
import { useAppSelector } from "@/app/lib/redux/hook";

function NotifIconDot() {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;

  const { data: unreadNotif } = useGetUnreadNotificationQuery(
    { userId },
    {
      skip: !userId,
    }
  );

  const isNotif = !unreadNotif;
  return (
    <div>
      {isNotif ? (
        <MdNotifications className="text-xl" />
      ) : (
        <div className="relative">
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 text-xs font-semibold text-white bg-red-500 rounded-full">
            {unreadNotif}
          </span>
          <MdNotificationsActive className="text-xl" />
        </div>
      )}
    </div>
  );
}

export default NotifIconDot;
