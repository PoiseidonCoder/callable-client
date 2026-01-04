import { findFriendsWithFriendStatus } from "@/app/api/friend";
import { PageResponse } from "@/types/common";
import { FriendStatus } from "@/types/enum-common";
import { FriendShipUserResponseDto } from "@/types/friend";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

const pageSize = 12;

export const useGetRejectedFriends = () => {
  return useInfiniteQuery<
    PageResponse<FriendShipUserResponseDto>,
    Error,
    InfiniteData<PageResponse<FriendShipUserResponseDto>>,
    ["reject_friends", number],
    number
  >({
    queryKey: ["reject_friends", pageSize],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      findFriendsWithFriendStatus({
        pageNo: pageParam,
        pageSize,
        friendStatus: FriendStatus.REJECTED,
      }),
    getNextPageParam: (lastPage) => (lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined),
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
