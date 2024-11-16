"use client";

import { useGetProfileQuery } from "@/app/lib/redux/api/userApi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaUser } from "react-icons/fa6";

const UserDetailPage = () => {
  const { userId } = useParams();
  const validUserId = typeof userId === "string" ? userId : "";
  const { data, isLoading, isError } = useGetProfileQuery(validUserId);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading user data.
      </div>
    );

  return (
    <div className="p-6 max-w-2xl shadow-lg">
      <h1 className="text-2xl font-semibold mb-2">User Detail</h1>
      <div className="bg-white rounded-lg flex gap-x-2">
        <FaUser className="text-5xl text-gray-600 mb-4 bg-green-400 rounded-full" />
        <div className="">
          <div className="mb-2">
            <h2 className="text-lg font-bold text-gray-700">
              {data?.fullname}
            </h2>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Email: </span>
              {data?.email}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Role: </span>
              {data?.role}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Bergabung ke Qodr Pada: </span>
              {data?.joinDate}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Motivation: </span>
              {data?.motivation || "Motivasi belum ditambahkan."}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={`/admindashboard/user/habit/${userId}`}>
              <Button>Habit</Button>
            </Link>
            <Link href={`/admindashboard/user/quran/${userId}`}>
              <Button>Al-Quran</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
