import { addFriend } from "@/app/api/friend";
import { AddFriendShipRequestDto } from "@/types/friend";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";

export const useAddFriend = () => {
  return useMutation<void, ApiError, AddFriendShipRequestDto>({
    mutationFn: (addFriendShipRequestDto) => addFriend(addFriendShipRequestDto),
  });
};
