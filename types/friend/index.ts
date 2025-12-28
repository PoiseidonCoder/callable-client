import { Pagination } from "../common";

export type FriendShipUserRequestDto = Pagination;
export type FriendShipUserResponseDto = {
  id: number;
  fullName: string;
  avatar: string;
};

export type AddFriendShipRequestDto = {
  addressee: number;
};

export type RemoveFriendShipRequestDto = {
  addressee: number;
};
