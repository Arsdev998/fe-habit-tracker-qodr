"use client";
import Image from "next/image";
import logo from "@/app/public/images/logo-qodr.svg";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hook";
import { getStatus } from "@/app/lib/redux/features/authSlices/authAction";
const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(getStatus());
    }
  }, [user]);
  return (
    <header className="flex sticky top-0 z-50 items-center space-x-2 w-full p-3 px-5 h-[70px] border-b-2 border-slate-300 bg-black text-white">
      <Image alt="Qodr Logo" src={logo} width={70} height={100} />
      <h1 className="text-xl font-bold">PPTI QODR</h1>
    </header>
  );
};

export default Header;
