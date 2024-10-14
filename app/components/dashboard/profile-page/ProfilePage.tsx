import { useGetProfileQuery } from "@/app/lib/redux/api/userApi";
import { useAppSelector } from "@/app/lib/redux/hook";
import React from "react";

function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.sub || user?.id;
  const { data } = useGetProfileQuery(userId);
  return (
    <div>
      <h1>Profile Page</h1>
      <div className="">
        <div className="">

        </div>
        <p>nama: {data?.name}</p>
        <p>fullname: {data?.fullname}</p>
        <p>email: {data?.email}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
