<script setup lang="ts">
import { Page } from '@/components/pages';
import { computed, ref, watch } from 'vue';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { useInfiniteScroll } from '@vueuse/core';
import { projectsGetQuery, projectsKeys } from '@/modules/projects/query';
import { Card, Header } from './ui';
import { useQueryInfinityScroll } from './useQueryInfinityScroll';
import { projectService } from '@/api';

const search = ref('');
const onSearch = (searchValue: string) => {
  search.value = searchValue;
};

const {
  data,
  isError,
  isLoading,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
} = useQueryInfinityScroll(
  projectsKeys.getListProjectsInfinityScroll,
  projectService.getList,
  search.value
);

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

useInfiniteScroll(
  window,
  () => {
    if (hasNextPage.value && !isFetchingNextPage.value && !isLoading.value) {
      fetchNextPage();
    }
  },
  { distance: 150 }
);

const localProjects = ref<any[]>([]);

watch(
  allProjects,
  (newProjects) => {
    // console.log('Получены новые проекты с сервера:', newProjects.length);

    // Вариант 1: Полная замена
    localProjects.value = [...newProjects];
    // console.log(localProjects.value, 'list');
  },
  { immediate: true, deep: false } // immediate - запустить сразу при монтировании
);

// const onDelete = ({ id }) => {
//   localProjects.value = localProjects.value.filter((item) => item.id !== id);
// };
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
            <Header
              @onSearch="onSearch"
              :projects="allProjects"
              :totalProjects="totalProjects"
            />
          </v-col>
        </v-row>
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
            <Card :item="item" />
          </v-col>
        </v-row>

        <v-progress-circular
          style="display: flex; margin: 0 auto; margin-top: 35px"
          v-if="isFetchingNextPage"
          color="green"
          indeterminate
        />
      </v-container>
    </template>
  </Page>
</template>
