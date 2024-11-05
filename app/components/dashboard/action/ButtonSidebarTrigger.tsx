import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";

function ButtonSidebarTrigger() {
  const { toggleSidebar, open } = useSidebar();
  return (
    <Button onClick={toggleSidebar} size={"icon"} variant={"ghost"}>
      {open ? <GoSidebarExpand /> : <GoSidebarCollapse />}
    </Button>
  );
}

export default ButtonSidebarTrigger;
