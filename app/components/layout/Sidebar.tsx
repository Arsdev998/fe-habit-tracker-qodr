"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { it } from "node:test";
import { AiFillHome } from "react-icons/ai";
import { FaBrain, FaUser } from "react-icons/fa6";
import ButtonLogout from "../dashboard/action/ButtonLogout";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";


const SidebarApp = () => {
  const pathname = usePathname();

  const navData = [
    {
      href: "/",
      label: "Home",
      icon: <AiFillHome />,
      acttive: pathname === "/",
    },
    {
      href: "/habit-tracker",
      label: "Habit Tracker",
      icon: <FaBrain />,
      acttive: pathname === "/habit-tracker",
    },
    {
      href: "/user-profile",
      label: "Profile",
      icon: <FaUser />,
      acttive: pathname === "/user-profile",
    }
  ];
  return (
    <Sidebar className="mt-3">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup >
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navData.map((item)=>(
                <SidebarMenuItem key={item.label}>
                  <Link href={item.href} className={`flex p-2 ${item.acttive ? "bg-primary text-primary-foreground" : ""}`}>
                    {item.icon}
                    {item.label}
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default SidebarApp;
