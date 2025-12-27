import { Pagination } from "../common"

export type FriendShipUserRequestDto = & Pagination;
export type FriendShipUserResponseDto = {
    id: number,
    fullName: string,
    avatar: string,
}