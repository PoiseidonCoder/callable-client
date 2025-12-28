import { useQueryClient, InfiniteData, QueryKey } from "@tanstack/react-query";

type Options<T> = {
  queryKey: QueryKey;
  getItemId: (item: T) => number;
};

export const useFilterInfiniteCache = <T>() => {
  const queryClient = useQueryClient();

  const removeItemFromCache = (options: Options<T>, removeId: number) => {
    const { queryKey, getItemId } = options;

    queryClient.setQueriesData({ queryKey }, (oldData: InfiniteData<{ data: T[] }> | undefined) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          data: page.data.filter((item) => getItemId(item) !== removeId),
        })),
      };
    });
  };

  return {
    removeItemFromCache,
  };
};
