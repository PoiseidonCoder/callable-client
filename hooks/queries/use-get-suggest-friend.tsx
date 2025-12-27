import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query"
import { getSuggestFriend } from "@/app/api/friend"
import { PageResponse } from "@/types/common"
import { FriendShipUserResponseDto } from "@/types/friend"

export const useGetSuggestFriendInfinite = (pageSize: number) => {
    return useInfiniteQuery<
        PageResponse<FriendShipUserResponseDto>,
        Error,
        InfiniteData<PageResponse<FriendShipUserResponseDto>>,
        ["suggest_friend"],
        number
    >({
        queryKey: ["suggest_friend"],
        initialPageParam: 0,
        queryFn: ({ pageParam }) =>
            getSuggestFriend({ pageNo: pageParam, pageSize }),
        getNextPageParam: (lastPage) =>
            !lastPage.pagination.hasNext
                ? undefined
                : lastPage.pagination.page + 1,
    })
}
