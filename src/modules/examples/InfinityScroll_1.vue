<script setup lang="ts">
import { Page } from '@/components/pages';
import { computed, ref } from 'vue';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { useInfiniteScroll } from '@vueuse/core';
import { projectsGetQuery, projectsKeys } from '@/modules/projects/query';
import { Card } from '@/modules/projects/ui';

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
    const loadedCount = allPages.length * lastPage.limit;
    const hasMore = loadedCount < lastPage.total;

    return hasMore ? allPages.length : undefined;
  },
  initialPageParam: 0,
});

const allProjects = computed(() => {
  if (!data.value) return [];
  return data.value.pages.flatMap((page) => page.data);
});

const refScrollContainer = ref(null);
useInfiniteScroll(
  refScrollContainer,
  () => {
    if (hasNextPage.value && !isFetchingNextPage.value && !isLoading.value) {
      fetchNextPage();
    }
  },
  { distance: 100 }
);
</script>

<template>
  <div
    style="height: 400px; overflow: scroll; background: gray"
    ref="refScrollContainer"
  >
    <Page
      :isLoading="isLoading"
      :isError="isError"
      :isEmptyContent="allProjects.length === 0"
    >
      <template #pageError> error content </template>

      <template #headerContent> header content </template>

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
  </div>
</template>
