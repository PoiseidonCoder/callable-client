import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { PageResponse } from "@/types/common";
import { FriendShipUserResponseDto } from "@/types/friend";
import { findNonFriends } from "@/app/api/friend";

const pageSize = 12;

export const useGetNonFriends = () => {
  return useInfiniteQuery<
    PageResponse<FriendShipUserResponseDto>,
    Error,
    InfiniteData<PageResponse<FriendShipUserResponseDto>>,
    ["non_friends", number],
    number
  >({
    queryKey: ["non_friends", pageSize],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      findNonFriends({
        pageNo: pageParam,
        pageSize,
      }),
    getNextPageParam: (lastPage) => (lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined),
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
