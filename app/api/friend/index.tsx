import { PageResponse } from "@/types/common"
import { api } from ".."
import { FriendShipUserRequestDto, FriendShipUserResponseDto } from "@/types/friend"


const baseUrlFriend = "/friend_ship"

export const getSuggestFriend = async (friendShipUserRequestDto: FriendShipUserRequestDto): Promise<PageResponse<FriendShipUserResponseDto>> => {
    return (await api.get(`${baseUrlFriend}/unfriend`, {
        params: friendShipUserRequestDto
    })).data;
}