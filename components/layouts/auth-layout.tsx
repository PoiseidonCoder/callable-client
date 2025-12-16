import React from "react";
import { HeaderAuth } from "../header-auth";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HeaderAuth />
      {children}
    </div>
  );
};

export default MainLayout;
