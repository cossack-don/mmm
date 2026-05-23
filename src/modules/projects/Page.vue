<script setup lang="ts">
import { Page } from '@/components/pages';

import { computed, ref } from 'vue';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/vue-query';

import { Button } from '@components-ui';
import { useInfiniteScroll } from '@vueuse/core';

import {
  projectsCreateQuery,
  projectsDeleteQuery,
  projectsGetQuery,
  projectsKeys,
} from '@/modules/projects/query';
import {
  deleteByIdInfinityQuery,
  mappingInfinityQuery,
  updateFieldsInfinityQuery,
} from '@/utils';

const {
  data,
  isError,
  isLoading,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
} = useInfiniteQuery({
  queryKey: [projectsKeys.getListProjectsInfinityScroll],
  queryFn: projectsGetQuery.GET_LIST_INFINITY_SCROLL,
  getNextPageParam: (lastPage, allPages) => {
    // Вычисляем, есть ли следующая страница
    const loadedCount = allPages.length * lastPage.limit;
    const hasMore = loadedCount < lastPage.total;

    return hasMore ? allPages.length : undefined;
  },
  initialPageParam: 0,
});

// Все проекты из всех загруженных страниц
const allProjects = computed(() => {
  if (!data.value) return [];
  return data.value.pages.flatMap((page) => page.data);
});

// Общее количество проектов
const totalProjects = computed(() => {
  if (!data.value) return 0;
  return data.value.pages[0]?.total || 0;
});

const nameProject = ref('');

const { mutate: deleteByIdProject } = useMutation(projectsDeleteQuery.DELETE);
const { mutate: createProject } = useMutation(projectsCreateQuery.POST);

const onCreateProject = () => {
  if (!nameProject.value.trim()) return;
  createProject({ name: nameProject.value });
  nameProject.value = '';
};

const queryClient = useQueryClient();

const onDeleteByIdProject = (id: number | string) => {
  queryClient.setQueryData(
    [projectsKeys.getListProjectsInfinityScroll],
    (old: any) =>
      updateFieldsInfinityQuery(old, id, { _isLoading: true, _isError: false })
  );

  deleteByIdProject(
    { id: id },
    {
      onError(error, variables, onMutateResult, context) {
        console.log('onError');

        queryClient.setQueryData(
          [projectsKeys.getListProjectsInfinityScroll],
          (old: any) => updateFieldsInfinityQuery(old, id, { _isError: true })
        );
      },
      onSuccess(data, variables, onMutateResult, context) {
        console.log('onSuccess', data);

        queryClient.setQueryData(
          [projectsKeys.getListProjectsInfinityScroll],
          (old: any) => deleteByIdInfinityQuery(old, id)
        );
      },
      onSettled(data, error, variables, onMutateResult, context) {
        queryClient.setQueryData(
          [projectsKeys.getListProjectsInfinityScroll],
          (old: any) =>
            updateFieldsInfinityQuery(old, id, { _isLoading: false })
        );
      },
    }
  );
  // console.log(data.value, 33);
};

// Настройка бесконечного скролла
useInfiniteScroll(
  window, // Используем контейнер, а не window
  () => {
    // Загружаем следующую страницу, если есть данные и не идет загрузка
    if (hasNextPage.value && !isFetchingNextPage.value && !isLoading.value) {
      fetchNextPage();
    }
  },
  { distance: 100 } // Загружаем за 200px до конца
);

const onEditingCard = (id) => {
  queryClient.setQueryData(
    [projectsKeys.getListProjectsInfinityScroll],
    (old: any) => updateFieldsInfinityQuery(old, id, { _isEditing: true })
  );
};
</script>

<template>
  <Page
    :isLoading="isLoading"
    :isError="isError"
    :isEmptyContent="allProjects.length === 0"
  >
    <template #pageError> error content </template>

    <template #headerContent>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            Проекты - показано: {{ allProjects.length }} из
            {{ totalProjects }} проектов

            <input
              v-model="nameProject"
              placeholder="Название проекта"
              @keyup.enter="onCreateProject"
            />
            <Button @click="onCreateProject">Создать проект</Button>
          </v-col>
        </v-row>

        <v-progress-circular
          v-if="isFetchingNextPage"
          color="green"
          indeterminate
        />
      </v-container>
    </template>

    <template #notEmptyBodyContent>
      <v-container>
        <v-row>
          <v-col
            v-for="item in allProjects"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card color="indigo">
              <v-card-text>
                <div>Проект - {{ item.name }}, ID - {{ item.id }},</div>

                <div class="mb-4">_isLoading = {{ item._isLoading }}</div>
                <div class="mb-4">_isError = {{ item._isError }}</div>
                <div class="mb-4">_isEditing = {{ item._isEditing }}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn :to="`/project/${item.id}`" color="blue" variant="flat"
                  >Перейти</v-btn
                >
                <v-btn
                  @click="onDeleteByIdProject(item.id)"
                  color="red"
                  variant="flat"
                  :loading="item._isLoading"
                  >Удалить</v-btn
                >
                <v-btn
                  @click="onEditingCard(item.id)"
                  color="green"
                  variant="flat"
                  :loading="false"
                  >Редактировать</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-progress-circular
          v-if="isFetchingNextPage"
          color="green"
          indeterminate
        />
      </v-container>
    </template>

    <template #emptyBodyContent>
      <div>empty content</div>
    </template>
  </Page>
</template>
