"use client";
import Image from "next/image";
import logo from "@/app/public/images/logo-qodr.svg";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hook";
import { getStatus } from "@/app/lib/redux/features/authSlices/authAction";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      dispatch(getStatus());
    }
  }, [user]);
  return (
    <header className="flex sticky top-0 z-[9999] items-center space-x-2 shadow-md w-full gap-3 p-3 mb-2">
      <SidebarTrigger />
      <div className="">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={"/"}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
              <BreadcrumbPage>{pathname}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default Header;
