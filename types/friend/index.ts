import { Pagination } from "../common";
import { FriendStatus } from "../enum-common";

export type FriendShipUserRequestDto = {
  friendStatus?: FriendStatus;
} & Pagination;

export type FriendShipUserResponseDto = {
  id: number;
  fullName: string;
  avatar: string;
};

export type AddFriendShipRequestDto = {
  addressee: number;
};

export type RejectFriendShipRequestDto = {
  addressee: number;
};

export type RemoveFriendShipRequestDto = {
  addressee: number;
};
