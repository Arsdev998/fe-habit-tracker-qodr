"use client";

import { useAppSelector } from "@/app/lib/redux/hook";
import useNotificationSocket from "../hook/useNotification";

function NotificationPage() {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  useNotificationSocket(userId);
  return <div>NotificationPage</div>;
}

export default NotificationPage;
