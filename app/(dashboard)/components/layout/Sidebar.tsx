import Link from "next/link";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-[300px] border-r-2 border-slate-300 p-2">
        <nav className="">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/habit-tracker">Habit Tracker</Link>
            </li>
            <li>Al-Quran</li>
            <li></li>
          </ul>
        </nav>
      </aside>
      <div className="overflow-y-auto h-screen w-full p-2">{children}</div>
    </div>
  );
};

export default Sidebar;
