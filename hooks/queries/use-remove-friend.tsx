import { removeFriend } from "@/app/api/friend";
import { RemoveFriendShipRequestDto } from "@/types/friend";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";

export const useRemoveFriend = () => {
  return useMutation<void, ApiError, RemoveFriendShipRequestDto>({
    mutationFn: (removeFriendShipRequestDto) => removeFriend(removeFriendShipRequestDto),
  });
};
