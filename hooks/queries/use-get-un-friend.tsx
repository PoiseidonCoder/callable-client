import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getUnFriend } from "@/app/api/friend";
import { PageResponse } from "@/types/common";
import { FriendShipUserResponseDto } from "@/types/friend";

export const useGetUnFriend = (pageSize: number) => {
  return useInfiniteQuery<
    PageResponse<FriendShipUserResponseDto>,
    Error,
    InfiniteData<PageResponse<FriendShipUserResponseDto>>,
    ["suggest_friend", number],
    number
  >({
    queryKey: ["suggest_friend", pageSize],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getUnFriend({
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
