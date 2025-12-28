import { PageResponse } from "@/types/common";
import { api } from "..";
import { AddFriendShipRequestDto, FriendShipUserRequestDto, FriendShipUserResponseDto, RemoveFriendShipRequestDto } from "@/types/friend";

const baseUrlFriend = "/friend_ship";

export const getUnFriend = async (friendShipUserRequestDto: FriendShipUserRequestDto): Promise<PageResponse<FriendShipUserResponseDto>> => {
  return (
    await api.get(`${baseUrlFriend}/unfriend`, {
      params: friendShipUserRequestDto,
    })
  ).data;
};

export const getFriend = async (friendShipUserRequestDto: FriendShipUserRequestDto): Promise<PageResponse<FriendShipUserResponseDto>> => {
  return (
    await api.get(`${baseUrlFriend}/friend`, {
      params: friendShipUserRequestDto,
    })
  ).data;
};

export const addFriend = async (addFriendShipRequestDto: AddFriendShipRequestDto): Promise<void> => {
  await api.post(`${baseUrlFriend}/add`, addFriendShipRequestDto);
};

export const removeFriend = async (removeFriendShipRequestDto: RemoveFriendShipRequestDto): Promise<void> => {
  await api.post(`${baseUrlFriend}/remove`, removeFriendShipRequestDto);
};
