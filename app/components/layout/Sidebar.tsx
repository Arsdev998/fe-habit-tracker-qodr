"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { FaBrain, FaUser } from "react-icons/fa6";
import ButtonLogout from "../dashboard/action/ButtonLogout";
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
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils"; // Pastikan utils.ts sudah ada
import { useState } from "react";
import Image from "next/image";
import logo from "@/app/public/images/logo-qodr.svg";

export default function SidebarApp() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      href: "/user-profile",
      label: "Profile",
      icon: <FaUser className="h-4 w-4" />,
      active: pathname === "/user-profile",
    },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200">
      <SidebarHeader>
        <Image alt="Qodr Logo" src={logo} width={70} height={100} />
        {isCollapsed ? (
          <h1 className="text-xl font-extrabold">PPTI QODR</h1>
        ) : null}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            className={cn(
              "transition-all duration-300",
              isCollapsed && "opacity-0"
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
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <div
                      className={cn(
                        "transition-all duration-300",
                        !isCollapsed && "min-w-4"
                      )}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={cn(
                        "transition-all duration-300",
                        isCollapsed && "hidden w-0"
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
          "transition-all duration-300",
          isCollapsed && "items-center"
        )}
      >
        <ButtonLogout />
      </SidebarFooter>
    </Sidebar>
  );
}
