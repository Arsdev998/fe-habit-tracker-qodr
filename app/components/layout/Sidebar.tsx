"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FaBrain, FaUser } from "react-icons/fa6";
import { FaQuran } from "react-icons/fa";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebarCustom,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils"; // Pastikan utils.ts sudah ada
import Image from "next/image";
import logo from "@/app/public/images/logo-qodr.svg";
import { Button } from "@/components/ui/button";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useAppDispatch } from "@/app/lib/redux/hook";
import { logout } from "@/app/lib/redux/features/authSlices/authAction";

export default function SidebarApp() {
  const pathname = usePathname();
  const { open } = useSidebarCustom();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const navData = [
    {
      href: "/",
      label: "Home",
      icon: <AiFillHome className="h-4 w-4" />,
      active: pathname === "/",
    },
    {
      href: "/habit-tracker",
      label: "Habit Tracker",
      icon: <FaBrain className="h-4 w-4" />,
      active: pathname === "/habit-tracker",
    },
    {
      href: "/al-quran",
      label: "Al-Qur'an",
      icon: <FaQuran className="h-4 w-4"/>,
      active: pathname === "/al-quran",
    },
    {
      href: "/user-profile",
      label: "Profile",
      icon: <FaUser className="h-4 w-4" />,
      active: pathname === "/user-profile",
    },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200">
      <SidebarHeader>
        <div className="flex items-center space-x-2 w-full">
          <Image alt="Qodr Logo" src={logo} width={70} height={100} />
          {open ? <h1 className="text-xl font-extrabold">PPTI QODR</h1> : null}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            className={cn(
              "transition-all duration-300",
              open ? "" : "opacity-0"
            )}
          >
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navData.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-300",
                      item.active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent",
                      open ? "" : "justify-center px-2"
                    )}
                  >
                    <div
                      className={cn(
                        "transition-all duration-300",
                        !open && "min-w-4"
                      )}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={cn(
                        "transition-all duration-300",
                        open ? "" : "hidden w-0"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter
        className={cn(
          "transition-all duration-300 shadow-md",
          open ? "" : "items-center"
        )}
      >
        <Button
          onClick={handleLogout}
          variant={"destructive"}
          className="flex  gap-x-2  outline-none font-bold text-white hover:text-red-700 p-2"
        >
          <RiLogoutBoxRFill className="text-lg" />
          <span className={`text-sm ${open ? "" : "hidden"}`}>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
