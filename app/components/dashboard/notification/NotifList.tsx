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
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";

// Perbarui type untuk mendukung struktur data baru
type Notification = {
  id: number;
  type: "notification" | "evaluation";
  message?: string;
  about?: string;
  problem?: string;
  status?: boolean;
  createdAt: string;
  userSend?: {
    id: number;
    fullname: string;
    email: string;
    role: string;
  };
  user?: {
    id: number;
    fullname: string;
    email: string;
    role: string;
  };
  readByUsers?: any[];
};

type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

function NotifList() {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);
  const limit = 10;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  //APII
  const [deleteManyNotif] = useDeleteManyNotificationMutation();
  const [markAllNotif] = useMarkAllNotificationsMutation();
  const { data: initialNotifications, isLoading } = useGetNotificationQuery(
    { page: page.toString(), limit: limit.toString() },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    // Tambahkan pengecekan untuk berbagai struktur data
    if (initialNotifications) {
      const notificationData = Array.isArray(initialNotifications)
        ? initialNotifications
        : initialNotifications.data || [];

      setNotifications(notificationData);

      // Cek dan set metadata
      if (initialNotifications.meta) {
        setMeta(initialNotifications.meta);
      } else {
        // Fallback metadata jika tidak ada
        setMeta({
          page: page,
          limit: limit,
          total: notificationData.length,
          totalPages: Math.ceil(notificationData.length / limit),
        });
      }
    }
  }, [initialNotifications, page, limit]);

  const handleMarkAllNotification = async () => {
    try {
      await markAllNotif({ userId }).unwrap();
      toast.success("Semua notifikasi berhasil ditandai sudah dibaca");
    } catch (error) {
      toast.error("Internal Server Error");
      console.log(error);
    }
  };

  const ins = notifications[2]?.readByUsers?.some(
    (read) => read.userId == userId
  );

  console.log(ins);

  return (
    <div className="p-2 max-w-2xl mx-auto shadow-md rounded-md ">
      <h2 className="text-2xl font-semibold mb-4 text-center">Notifikasi</h2>
      <Button onClick={handleMarkAllNotification}>
        Tandai semua sudah dibaca
      </Button>
      {/* Tambahkan logging untuk debugging */}
      {isLoading && <div>Loading...</div>}
      {!isLoading && notifications.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Tidak ada notifikasi
        </div>
      )}

      {notifications.length > 0 && (
        <div className="space-y-3">
          {notifications.map((item, index: number) => {
            const isRead = item.readByUsers?.some(
              (read) => read.userId === userId
            );
            return (
              <div
                key={index}
                className={`tiptap flex justify-between w-full items-center transition-all duration-300 p-3 rounded-md shadow-sm ${
                  item.status === false || isRead === false
                    ? "bg-[#8B6F74]"
                    : "bg-[#303030]"
                } 
               hover:shadow-md`}
              >
                {/* Render content */}
                <div className="flex flex-col">
                  {item.type === "notification" ? (
                    <div className="">
                      <p className="font-semibold">
                        {item.userSend?.fullname} | {item.userSend?.role}
                      </p>
                      <div
                        className="max-w-[95%] overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: item.message || "" }}
                      />
                    </div>
                  ) : (
                    <div className="max-w-[90%] overflow-hidden">
                      <p className="font-semibold">
                        {item.user?.fullname} | {item.user?.role}
                      </p>
                      <p className="font-medium">{item.about}</p>
                      <p>{item.problem}</p>
                    </div>
                  )}
                </div>
                {item.createdAt && (
                  <div className="text-center">
                    <p className="text-xs">
                      {format(new Date(item.createdAt), "dd MMMM yyyy")}
                    </p>
                    <p className="text-md">
                      {format(new Date(item.createdAt), "HH:mm")}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default NotifList;
