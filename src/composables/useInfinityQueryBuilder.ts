import { delayFetch } from '@/utils';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { useInfiniteScroll } from '@vueuse/core';
import { computed, type Ref } from 'vue';

// TODO Что пытаюсь решить
// 1. Если бекенд отдает в total = 0 или нормальный total
// 2. Переиспользуемый composobles для подгрузки на scroll
// 3. Переиспользуемый composobles для подгрузки на кнопку загрузить еще 10
// 4. Переиспользуемый composobles для подгрузки на кнопку загрузить еще 10 или скролл подгрузка + удаление записи из

export interface IOptionsInfinity {
  initialPageParam?: number;
  isTotalZero?: boolean;
  delayTimeFetch?: number;
  distanceScroll?: number;
}

export type ApiCallback = (
  search: string | null | undefined,
  limit: number,
  offset: number,
  apiFields: any
) => Promise<any>;

export const useInfinityQueryBuilder = (
  refScroll: Ref | Window | null = null,
  queryKeys: string[],
  apiCb: ApiCallback,
  search: Ref | null = null,
  limit: number = 20,
  offset: number = 20,
  apiFields?: Record<string, unknown>,
  optionsInfinity?: IOptionsInfinity
) => {
  if (queryKeys.length === 0) {
    throw new Error('useQueryInfinityScroll: queryKey is required');
  }

  const {
    initialPageParam = 0,
    delayTimeFetch = 500,
    isTotalZero = false,
    distanceScroll = 200,
  } = optionsInfinity || {};

  const builderListKeys = computed(() => {
    const baseKey = [...queryKeys];

    if (search && search.value) {
      return [...baseKey, search.value];
    } else {
      return baseKey;
    }
  });

  const {
    data,
    isError,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: builderListKeys,
    queryFn: async ({ pageParam }) => {
      await delayFetch(delayTimeFetch);

      const { data } = await apiCb(
        search?.value,
        limit,
        pageParam * offset,
        apiFields
      );

      return {
        data: data.data,
        total: data.total,
        limit: data.limit,
        offset: data.offset,
      };
    },

    getNextPageParam: (lastPage, allPages) => {
      // Если total = 0, но данные пришли - продолжаем пагинацию
      if (lastPage.total === 0 && lastPage.data.length > 0 && isTotalZero) {
        return allPages.length; // загружаем следующую страницу
      }

      // Вычисляем, есть ли следующая страница
      const loadedCount = allPages.length * lastPage.limit;
      const hasMore = loadedCount < lastPage.total;

      return hasMore ? allPages.length : undefined;
    },
    initialPageParam: initialPageParam,
  });

  if (refScroll) {
    useInfiniteScroll(
      refScroll,
      () => {
        if (
          hasNextPage.value &&
          !isFetchingNextPage.value &&
          !isLoading.value
        ) {
          fetchNextPage();
        }
      },
      { distance: distanceScroll }
    );
  }

  const onLoadMoreByButton = async () => {
    if (hasNextPage.value && !isFetchingNextPage.value) await fetchNextPage();
  };

  return {
    data,
    isError,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,

    onLoadMoreByButton,
  };
};
