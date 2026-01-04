"use client";

import { useEffect } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import useMeasure from "react-use-measure";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { SuggestFriendSkeleton } from "@/components/skeleton/SuggestFriendSkeleton";

import { calcMissingItemsToFillGrid } from "@/utils/calculate";
import { useGetUnFriend } from "@/hooks/queries/use-get-non-friends";
import { useAddFriend } from "@/hooks/queries/use-add-friend";

import { FriendShipUserResponseDto } from "@/types/friend";
import { useFilterInfiniteCache } from "@/hooks/queries/use-filter-infinite-cache";

const PAGE_SIZE = 12;
const MIN_CARD_WIDTH = 200;
const GRID_GAP = 12;
const MIN_ROWS = 3;

const FriendRequestPage = () => {
  const t = useTranslations("UnFriendPage");
  const { removeItemFromCache } = useFilterInfiniteCache<FriendShipUserResponseDto>();

  const { mutateAsync: addFriend } = useAddFriend();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUnFriend(PAGE_SIZE);

  const [ref, { width }] = useMeasure();

  const unFriends = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    if (!width || !hasNextPage || isFetchingNextPage) return;

    const missing = calcMissingItemsToFillGrid({
      containerWidth: width,
      minWidth: MIN_CARD_WIDTH,
      gap: GRID_GAP,
      currentItems: unFriends.length,
      minRows: MIN_ROWS,
    });

    if (missing > 0) {
      fetchNextPage();
    }
  }, [width, unFriends.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleAddFriend = async (addressee: number) => {
    try {
      await addFriend({ addressee });
      toast.success(t("friendRequestSent"));
      removeItemFromCache({ queryKey: ["suggest_friend"], getItemId: (friend) => friend.id }, addressee);
    } catch {
      toast.error(t("errorFriendRequestSent"));
    }
  };

  return (
    <div ref={ref} className="w-full pt-15 p-5">
      <InfiniteScroll
        dataLength={unFriends.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={isFetchingNextPage ? <SuggestFriendSkeleton /> : null}
      >
        <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {unFriends.map((friend) => (
            <Card key={friend.id} className="overflow-hidden shadow-2xl">
              <CardHeader className="p-0">
                <div className="relative w-full aspect-square">
                  <Image src={friend.avatar || "/images/default-avatar.png"} alt={friend.fullName} fill className="object-cover" />
                </div>
              </CardHeader>

              <CardContent className="p-2 space-y-2">
                <Link href={`/profile/${friend.id}`} className="text-lg font-semibold line-clamp-1">
                  {friend.fullName}
                </Link>

                <Button onClick={() => handleAddFriend(friend.id)} className="bg-btn-gradient w-full">
                  {t("addFriend")}
                </Button>

                <Button variant="secondary" className="w-full">
                  {t("remove")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default FriendRequestPage;
