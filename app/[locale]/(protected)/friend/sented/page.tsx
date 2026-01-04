import { useGetNonFriends } from "@/hooks/queries/use-get-non-friends";
import { useTranslations } from "next-intl";

const PAGE_SIZE = 12;
const MIN_CARD_WIDTH = 200;
const GRID_GAP = 12;
const MIN_ROWS = 3;

const SentedFriendPage = () => {
  const t = useTranslations("SentedFriendPage");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetNonFriends();

  return <div></div>;
};

export default SentedFriendPage;
