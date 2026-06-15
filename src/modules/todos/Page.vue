<script setup lang="ts">
import { useRoute } from 'vue-router';
import ListTodos from './ui/ListTodos.vue';
import HeaderTodos from './ui/HeaderTodos.vue';
import { Page } from '@components-pages';
import { useTodos } from '@/api/services/todos';

const route = useRoute();

const {
  listTodos,
  hasMoreTodos,
  totalTodos,
  isLoadingTodos,
  isErrorTodos,
  fetchNextPageTodos,
  isFetchingNextPageTodos,

  onDeleteByIdTodo,
  onCreateTodo,
} = useTodos(route);
</script>

<template>
  <Page
    :isLoadingContent="isLoadingTodos"
    :isErrorContent="isErrorTodos"
    :isSearchContent="false"
    :isEmptyContent="listTodos.length === 0"
    :isLoadingHeader="false"
    :isErrorHeader="false"
  >
    <template #contentHeader>
      <v-btn @click="onCreateTodo({ idProject: route.params.idProject })"
        >onCreateTodo</v-btn
      >
      <p>
        Доделать поиск + обновление и создание нормальное через UI + приоритеты
        я хотел еще
      </p>
      <HeaderTodos :countTodos="listTodos.length" :totalTodos="totalTodos" />
    </template>

    <template #contentBody>
      <ListTodos
        @onFetchNextPage="fetchNextPageTodos"
        @onDeleteByIdTodo="
          (payload) =>
            onDeleteByIdTodo({
              idProject: route.params.idProject,
              idTask: payload.id,
            })
        "
        :isFetchingNextPage="isFetchingNextPageTodos"
        :list="listTodos"
        :hasMore="hasMoreTodos"
      />
    </template>
  </Page>
</template>

<style scoped></style>
