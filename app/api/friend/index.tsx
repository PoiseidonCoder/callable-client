import { PageResponse } from "@/types/common";
import { api } from "..";
import {
  AddFriendShipRequestDto,
  FriendShipUserRequestDto,
  FriendShipUserResponseDto,
  RejectFriendShipRequestDto,
  RemoveFriendShipRequestDto,
} from "@/types/friend";

const baseUrlFriend = "/friend-ship";

export const addFriend = async (addFriendShipRequestDto: AddFriendShipRequestDto): Promise<void> => {
  await api.post(`${baseUrlFriend}/add`, addFriendShipRequestDto);
};

export const findFriendsWithFriendStatus = async (
  friendShipUserRequestDto: FriendShipUserRequestDto,
): Promise<PageResponse<FriendShipUserResponseDto>> => {
  return (
    await api.get(`${baseUrlFriend}/friends`, {
      params: friendShipUserRequestDto,
    })
  ).data;
};

export const findNonFriends = async (
  friendShipUserRequestDto: FriendShipUserRequestDto,
): Promise<PageResponse<FriendShipUserResponseDto>> => {
  return (
    await api.get(`${baseUrlFriend}/non-friends`, {
      params: friendShipUserRequestDto,
    })
  ).data;
};

export const rejectFriend = async (rejectFriendRequestDto: RejectFriendShipRequestDto): Promise<void> => {
  await api.post(`${baseUrlFriend}/reject`, {
    params: rejectFriendRequestDto,
  });
};

export const removeFriend = async (removeFriendShipRequestDto: RemoveFriendShipRequestDto): Promise<void> => {
  await api.delete(`${baseUrlFriend}/remove`, {
    params: removeFriendShipRequestDto,
  });
};
