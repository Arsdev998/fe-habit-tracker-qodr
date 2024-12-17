"use client";
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

  if (isLoading) return <Skeleton className="w-full h-screen bg-gray-200" />;

  if (isSuccess)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className=" rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold ">Profil {data.role}</h1>
            <div className="flex space-x-2">
              <ModalEditProfile
                email={data.email}
                fullname={data.fullname}
                motivation={data.motivation}
                name={data.name}
                userId={data.id}
                numberPhone={data.numberPhone}
                tecthStack={data.techStack}
              />
              <ModalUpdatePassword userId={data.id} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <ProfileDetail label="Username" value={data?.name} />
              <ProfileDetail label="Nama Lengkap" value={data?.fullname} />
              <ProfileDetail label="Email" value={data?.email} />
            </div>
            <div className="space-y-4">
              <ProfileDetail label="No. Hp" value={data?.numberPhone} />
              <ProfileDetail label="Status" value={data?.role} />
              <ProfileDetail label="Tanggal Masuk" value={data?.joinDate} />
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg shadow-inner">
            <h2 className="text-lg font-semibold mb-2 text-center">Motivasi</h2>
            <blockquote className="text-sm text-center italic">
              {data?.motivation || "Motivasi belum ditambahkan."}
            </blockquote>
          </div>

          <div className="mt-6 p-4 rounded-lg shadow-inner">
            <h2 className="text-lg font-semibold mb-2 text-center">Tech Stack</h2>
            <div className="text-center text-sm">
              {data?.techStack || "Belum ada tech stack yang ditambahkan."}
            </div>
          </div>
        </div>
      </div>
    );
}

// Komponen pembantu untuk detail profil
function ProfileDetail({ label, value }: { label: string; value?: string }) {
  return (
    <div className="p-3 rounded-md">
      <p className="text-sm font-semibold mb-1">{label}</p>
      <p className="">{value || "-"}</p>
    </div>
  );
}

export default ProfilePage;