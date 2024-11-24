"use client";
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
import { ThemeToggle } from "../organism/action/ThemeTogle";
import { useTheme } from "next-themes";

const formatPathSegment = (segment: string) => {
  if (!segment) return "Home"; // Jika segmen kosong, anggap sebagai "Home"
  return segment
    .replace(/-/g, " ") // Ganti "-" dengan spasi
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Ubah huruf pertama setiap kata menjadi huruf besar
};

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { theme } = useTheme();

  useEffect(() => {
    if (!user) {
      dispatch(getStatus());
    }
  }, [user, pathname]);

  const pathSegments = pathname.split("/").filter(Boolean); // Pisahkan path dan hilangkan string kosong
  const fullPath = pathSegments.map((segment, index) => ({
    name: formatPathSegment(segment),
    href: "/" + pathSegments.slice(0, index + 1).join("/"), // Buat URL hingga segmen saat ini
  }));

  return (
    <header
      className={`flex sticky ${
        theme === "dark" ? "bg-[#0F0E0E]" : ""
      }  top-0 z-[9999] rounded-md  items-center justify-between space-x-2 shadow-md w-full gap-3 p-2 mb-2`}
    >
      <div className="flex items-center">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {fullPath.map((path, index) => (
              <BreadcrumbItem key={index}>
                {index < fullPath.length - 1 ? (
                  <>
                    <BreadcrumbLink asChild>
                      <Link href={path.href}>{path.name}</Link>
                    </BreadcrumbLink>
                    {/* <BreadcrumbSeparator /> */}
                  </>
                ) : (
                  <BreadcrumbPage
                    aria-current="page"
                    className="capitalize text-gray-600"
                  >
                    {path.name}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
