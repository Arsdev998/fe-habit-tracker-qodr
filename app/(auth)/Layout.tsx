import React from "react";
import StoreProvider from "../StoreProvider";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <StoreProvider>{children}</StoreProvider>
    </div>
  );
}

export default Layout;
