<script setup lang="ts">
import { Page } from '@/components/pages';
import { computed, ref } from 'vue';
import { projectsKeys } from '@/modules/projects/query';
import { ListCards, Header } from './ui';
import { useInfinityQueryBuilder } from '@composables';
import { projectService } from '@/api';

const search = ref('');
const onSearch = (searchValue: string) => {
  search.value = searchValue;
  isSerach.value = true;
};

const onClearSearch = () => {
  search.value = '';
  isSerach.value = false;
};

const { data, isLoading, isFetchingNextPage } = useInfinityQueryBuilder(
  window,
  [projectsKeys.getListProjectsInfinityScroll],
  projectService.getList,
  search,
  20,
  20,
  { params: 1 }
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

const isSerach = ref(false);
</script>

<template>
  <Page
    :isLoadingContent="isLoading"
    :isSearchProcess="isSerach"
    :isEmptyContent="allProjects.length === 0"
  >
    <template #headerContent>
      <Header
        @onSearch="onSearch"
        @onClearSearch="onClearSearch"
        :projects="allProjects"
        :totalProjects="totalProjects"
      />
    </template>

    <template #notEmptyBodyContent>
      <ListCards
        :allProjects="allProjects"
        :isFetchingNextPage="isFetchingNextPage"
      />
    </template>
  </Page>
</template>
