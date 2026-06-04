import { delayFetch } from '@/utils';
import { useInfiniteQuery } from '@tanstack/vue-query';

export interface IInfinityScrollOptions {
  initialPageParam?: number;
  limit?: number;
  offset?: number;
  delayTimeFetch?: number;
}

export const useQueryInfinityScroll = (
  queryKey: string,
  cbApi: (limit: number, offset: number, search: string) => Promise<any>,
  search: string,
  options: IInfinityScrollOptions = {}
) => {
  if (!queryKey) {
    throw new Error('useQueryInfinityScroll: queryKey is required');
  }

  const {
    initialPageParam = 0,
    limit = 20,
    offset = 20,
    delayTimeFetch = 500,
  } = options;

  const {
    data,
    isError,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKey, search],
    queryFn: async ({ pageParam }) => {
      await delayFetch(delayTimeFetch);

      const { data } = await cbApi(limit, pageParam * offset, search);

      return {
        data: data.data,
        total: data.total,
        limit: data.limit,
        offset: data.offset,
      };
    },

    getNextPageParam: (lastPage, allPages) => {
      // Вычисляем, есть ли следующая страница
      const loadedCount = allPages.length * lastPage.limit;
      const hasMore = loadedCount < lastPage.total;

      return hasMore ? allPages.length : undefined;
    },
    initialPageParam: initialPageParam,
  });

  return {
    data,
    isError,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};
