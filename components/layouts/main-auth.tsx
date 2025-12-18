import React from "react";
import { AppSidebar } from "./app-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppSidebar />
      {children}
    </div>
  );
};

export default MainLayout;
