import { useInfiniteQuery, useMutation } from '@tanstack/vue-query';
import { serviceTodos } from './api';
import type { RouteLocationNormalized } from 'vue-router';
import { computed } from 'vue';

export const keyGetListTodos = 'getListTodos';
export const keyGetListTodosInfinityScroll = 'getListTodosInfinityScroll';

export const useTodos = (route: RouteLocationNormalized) => {
  const {
    data: initialListTodos,
    isLoading: isLoadingTodos,
    isError: isErrorTodos,
    fetchNextPage: fetchNextPageTodos,
    isFetchingNextPage: isFetchingNextPageTodos,
  } = useInfiniteQuery({
    queryKey: [keyGetListTodosInfinityScroll],
    queryFn: async ({ pageParam = 0 }) => {
      const params = { limit: 5, offset: pageParam * 5 };

      const { data } = await serviceTodos.getList(
        route.params.idProject as string,
        params.limit,
        params.offset
      );

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
    initialPageParam: 0,
  });

  const { mutate: onDeleteByIdTodo } = useMutation({
    mutationFn: async ({ idProject, idTask }: any) => {
      await serviceTodos.deleteById(idProject, idTask);
    },

    onSuccess: (_data, _variables, _onMutateResult, context) => {
      const queryClient = context.client;
      queryClient.invalidateQueries({
        queryKey: [keyGetListTodosInfinityScroll],
      });
    },
  });

  const { mutate: onCreateTodo } = useMutation({
    mutationFn: async ({ idProject, idTask }: any) => {
      await serviceTodos.createTodo(idProject, 'name-1', 'description-1');
    },
  });

  // const { mutate: onPutByIdTodo } = useMutation({
  //   mutationFn: async ({ idProject, idTask }: any) => {
  //     await serviceTodos.putByIdTodo(
  //       idProject,
  //       'name-1-put',
  //       'description-1-put'
  //     );
  //   },
  // });

  const listTodos = computed(() => {
    if (!initialListTodos.value) return [];
    return initialListTodos.value.pages.flatMap((page) => page.data);
  });

  // Общее количество постов
  const totalTodos = computed(() => {
    if (!initialListTodos.value) return 0;
    return initialListTodos.value.pages[0]?.total || 0;
  });

  // Проверяем, есть ли еще данные для загрузки
  const hasMoreTodos = computed(() => {
    if (!initialListTodos.value) return false;

    const lastPage =
      initialListTodos.value.pages[initialListTodos.value.pages?.length - 1];
    const loadedCount = initialListTodos.value.pages?.length * lastPage.limit;

    return loadedCount < lastPage.total;
  });

  return {
    initialListTodos,
    listTodos,
    isLoadingTodos,
    isErrorTodos,
    fetchNextPageTodos,
    isFetchingNextPageTodos,
    totalTodos,
    hasMoreTodos,

    onDeleteByIdTodo,
    onCreateTodo,
    // onPutByIdTodo,
  };
};
