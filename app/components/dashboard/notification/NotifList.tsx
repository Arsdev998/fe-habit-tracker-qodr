"use client";

import "./style/notif.css";
import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hook";
import useNotificationSocket from "@/app/lib/useNotification";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { clearUnreadCount } from "@/app/lib/redux/features/notifSlice";
import Loading from "./Loading";

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
  const dispatch = useAppDispatch()
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

  const [markAllNotif] = useMarkAllNotificationsMutation();
  const { data: initialNotifications, isLoading } = useGetNotificationQuery(
    { page: page.toString(), limit: limit.toString() },
    { refetchOnMountOrArgChange: true }
  );

   const onNewNotification = (notification: Notification) => {
     setNotifications((prev) => [notification, ...prev]); // Tambahkan ke notifikasi sebelumnya
   };

   const { isConnected } = useNotificationSocket(
     userId,
     onNewNotification
   );

   useEffect(() => {
     if (isConnected) {
       console.log("Socket connected for notifications.");
     }
   }, [isConnected]);

  useEffect(() => {
    if (initialNotifications) {
      const notificationData = Array.isArray(initialNotifications)
        ? initialNotifications
        : initialNotifications.data || [];
      setNotifications(notificationData);

      if (initialNotifications.meta) {
        setMeta(initialNotifications.meta);
      } else {
        setMeta({
          page: page,
          limit: limit,
          total: notificationData.length,
          totalPages: Math.ceil(notificationData.length / limit),
        });
      }
    }
  }, [initialNotifications, page, limit]);

  useEffect(() => {
    if (isConnected) {
      console.log("Socket connected for notifications.");
    }
  }, [isConnected]);


  const handleMarkAllNotification = async () => {
    try {
      await markAllNotif({ userId }).unwrap();
      dispatch(clearUnreadCount());
      toast.success("Semua notifikasi berhasil ditandai sudah dibaca");
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  useNotificationSocket(userId, handleMarkAllNotification);

  const totalPages = initialNotifications?.meta.totalPages || 1;
  useEffect(() => {
    router.replace(`?page=${page}`);
  }, [page, router]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (selectedPage: number) => {
    setPage(selectedPage);
  };

  return (
    <div className="p-2 max-w-2xl mx-auto shadow-md rounded-md">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-center">Notifikasi</h2>
        <Button onClick={handleMarkAllNotification} variant="outline">
          Tandai semua sudah dibaca
        </Button>
      </div>
      {isLoading && <Loading/>}
      {!isLoading && notifications.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Tidak ada notifikasi
        </div>
      )}
      {notifications.length > 0 && (
        <div className="space-y-3 mb-3">
          {notifications.map((item, index: number) => {
            const isRead = item.readByUsers?.some(
              (read) => read.userId === userId
            );
            return (
              <div
                key={index}
                className={`flex justify-between items-center p-3 rounded-md shadow-sm ${
                   item.status === false || isRead === false  
                    ? "bg-[#8B6F74]"
                    : "bg-gray-400 dark:bg-[#303030]"
                }`}
              >
                <div className="flex flex-col">
                  {item.type === "notification" ? (
                    <div>
                      <p className="font-semibold">
                        {item.userSend?.fullname} | {item.userSend?.role}
                      </p>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.message || "" }}
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold">
                        {item.user?.fullname} | {item.user?.role}
                      </p>
                      <p>{item.about}</p>
                      <p>{item.problem}</p>
                    </div>
                  )}
                </div>
                {item.createdAt && (
                  <div className="text-center">
                    <p>{format(new Date(item.createdAt), "dd MMM yyyy")}</p>
                    <p>{format(new Date(item.createdAt), "HH:mm")}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePreviousPage}
              className={`${page === 1 ? "cursor-not-allowed " : ""}`}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={page === i + 1}
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              className={`${page === totalPages ? "cursor-not-allowed " : ""}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default NotifList;
