import  {useSidebarCustom}  from "@/components/ui/sidebar";

export function ButtonSidebarTrigger() {
  const { toggleSidebar } = useSidebarCustom();

  return <button onClick={toggleSidebar}>Toggle Sidebar</button>;
}
