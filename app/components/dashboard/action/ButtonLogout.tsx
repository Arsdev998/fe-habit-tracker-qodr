import { logout } from "@/app/lib/redux/features/authSlices/authAction";
import { useAppDispatch } from "@/app/lib/redux/hook";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { RiLogoutBoxRFill } from "react-icons/ri";

function ButtonLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    // router.push("/login");
  };
  return (
    <ul>
      <Button
        onClick={handleLogout}
        variant={"ghost"}
        className="flex  gap-x-2 text-lg outline-none font-bold text-red-500 hover:text-red-700 p-2"
      >
        <RiLogoutBoxRFill className="text-lg" />
        Logout
      </Button>
    </ul>
  );
}

export default ButtonLogout;
