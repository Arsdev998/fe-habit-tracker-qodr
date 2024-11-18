"use client";

import TipTap from "../../organism/textEditor/TipTap";

const NotificationControllPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <h1 className="font-bold text-xl">Pengaturan Notifikasi</h1>
      </div>
      <TipTap />
    </div>
  );
};

export default NotificationControllPage;
