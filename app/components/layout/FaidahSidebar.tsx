import React from "react";

const FaidahSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-2 border-black min-w-[350px] max-w-[350px] h-screen p-2">
      {children}
    </div>
  );
};

export default FaidahSidebar;
