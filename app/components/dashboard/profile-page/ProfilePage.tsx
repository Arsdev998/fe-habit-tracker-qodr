"use cleint";
import { useGetProfileQuery } from "@/app/lib/redux/api/userApi";
import { useAppSelector } from "@/app/lib/redux/hook";
import React from "react";

function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.sub || user?.id;
  const { data } = useGetProfileQuery(userId);

  const handleEditProfile = () => {
    console.log("Edit profile");
  };

  return (
    <div className="">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
          <button
            onClick={handleEditProfile}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
        </div>
        <div className="space-y-2">
          <p className="text-lg text-gray-700">
            <span className="font-medium">Nama:</span> {data?.name}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-medium">Nama Asli:</span> {data?.fullname}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-medium">Email:</span> {data?.email}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-medium">Tanggal Masuk:</span> {data?.joinDate}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-medium">Status:</span> {data?.role}
          </p>
          
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-md shadow-inner">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Motivasi</h2>
          <p className="text-sm text-gray-600 italic">
            "{data?.motivation || "Motivasi belum ditambahkan."}"
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
