import FriendHeader from "@/components/layouts/friend-header";
import React from "react";

const SuggestFriendPage = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <FriendHeader />

      {children}
    </>
  );
};

export default SuggestFriendPage;
