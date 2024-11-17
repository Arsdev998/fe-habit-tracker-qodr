"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FaBrain, FaUser, FaUsers } from "react-icons/fa6";
import { FaQuran } from "react-icons/fa";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdEditNotifications } from "react-icons/md";
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
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hook";
import { logout } from "@/app/lib/redux/features/authSlices/authAction";
import NotifIconDot from "../dashboard/notification/NotifIconDot";

export default function SidebarApp() {
  const user = useAppSelector((state) => state.auth.user);
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
      icon: <FaQuran className="h-4 w-4" />,
      active: pathname === "/al-quran",
    },
    {
      href: "/notifikasi",
      label: "Notifikasi",
      icon: <NotifIconDot />,
      active: pathname === "/notifikasi",
    },
    {
      href: "/user-profile",
      label: "Profile",
      icon: <FaUser className="h-4 w-4" />,
      active: pathname === "/user-profile",
    },
  ];
  const adminNavData = [
    {
      href: "/admindashboard/habitcontroll",
      label: "Habit Controll",
      icon: <FaBrain className="h-4 w-4" />,
      active: pathname === "/admindashboard/habitcontroll",
    },
    {
      href: "/admindashboard/usercontroll",
      label: "User Controll",
      icon: <FaUsers className="h-4 w-4" />,
      active: pathname === "/admindashboard/usercontroll",
    },
    {
      href: "/admindashboard/notificationcontroll",
      label: "Notifikasi Controll",
      icon: <MdEditNotifications className="h-4 w-4" />,
      active: pathname === "/admindashboard/notificationcontroll",
    },
    {
      href: "/admindashboard/evaluasi",
      label: "Evaluasi",
      icon: <AiOutlineFileSearch className="h-4 w-4" />,
      active: pathname === "/admindashboard/evaluasi",
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
      <SidebarContent className="mt-1">
        <SidebarGroup>
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
        {user?.role === "ADMIN" ||
          (user?.role === "SUPERADMIN" && (
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarGroupLabel>Admin Controller</SidebarGroupLabel>
                <SidebarMenu>
                  {adminNavData.map((item) => (
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
          ))}
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
