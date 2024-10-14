"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { it } from "node:test";
import { AiFillHome } from "react-icons/ai";
import { FaBrain, FaUser } from "react-icons/fa6";
import ButtonLogout from "../dashboard/action/ButtonLogout";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
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
    <div className="flex h-screen">
      <aside className="fixed left-0 h-full min-w-[250px] border-r-2 border-slate-300 bg-white">
        <nav className="">
          <ul>
            {navData.map((item) => {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center text-xl gap-x-2 font-bold p-2 ${
                      item.acttive ? "bg-slate-300" : ""
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span> {item.label}
                  </Link>
                </li>
              );
            })}
            <ButtonLogout/>
          </ul>
        </nav>
      </aside>
      <div className="ml-[250px] overflow-y-auto h-screen w-full p-2">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
