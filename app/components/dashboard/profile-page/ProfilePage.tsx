"use cleint";
import { useGetProfileQuery } from "@/app/lib/redux/api/userApi";
import { useAppSelector } from "@/app/lib/redux/hook";
import React from "react";
import ModalEditProfile from "../../organism/modal/ModalEditProfile";
import { Skeleton } from "@/components/ui/skeleton";
import ModalUpdatePassword from "../../organism/modal/ModalUpdatePassword";

function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.sub || user?.id;
  const { data, isLoading, isSuccess } = useGetProfileQuery(userId);

  if (isLoading) return <Skeleton className="w-full h-full bg-black/20" />;

  if (isSuccess)
    return (
      <div className="">
        <div className="flex flex-col items-center justify-center w-full rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-center mb-4">Profile</h1>
          <h2 className="text-xl font-semibold text-center mb-3">
            {data?.fullname}
          </h2>
          <div className="w-full md:w-[900px]">
            <div className="grid grid-cols-2 gap-4 w-[400px] mx-auto">
              <div className="text-lg">
                <p className="font-bold">Username</p>
                <p>{data?.name}</p>
              </div>
              <div className="text-lg">
                <p className="font-bold">Fullname</p>
                <p>{data?.fullname}</p>
              </div>
              <div className="text-lg">
                <p className="font-bold">Email</p>
                <p>{data?.fullname}</p>
              </div>
              <div className="text-lg">
                <p className="font-bold">Np Hp</p>
                <p>{data?.numberPhone}</p>
              </div>
              <div className="text-lg">
                <p className="font-bold">Status</p>
                <p>{data?.role}</p>
              </div>
              <div className="text-lg">
                <p className="font-bold">Tanggal Masuk</p>
                <p>{data?.joinDate}</p>
              </div>
            </div>
            <div className="mt-2 p-2 rounded-md shadow-inner w-[450px] mx-auto">
              <h2 className="text-lg font-semibold">AmBativasi</h2>
              <p className="text-sm text-center">
                <q>{data?.motivation || "Motivasi belum ditambahkan."}</q>
              </p>
            </div>
            <div className="mt-6 p-4 rounded-md shadow-inner w-[450px] mx-auto">
              <h2 className="text-lg font-semibold">Tech Stack</h2>
              {data?.techStack}
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProfilePage;
