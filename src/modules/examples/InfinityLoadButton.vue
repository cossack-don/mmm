<script setup lang="ts">
import { Page } from '@/components/pages';
import { computed } from 'vue';
import { projectsKeys } from '@/modules/projects/query';
import { Card } from '@/modules/projects/ui';
import { useInfinityQueryBuilder } from '@composables';
import { projectService } from '@/api';

const {
  data,
  isError,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  onLoadMoreByButton,
} = useInfinityQueryBuilder(
  null,
  [projectsKeys.getListProjectsInfinityScroll],
  projectService.getList,
  null,
  10,
  10,
  { sortOrder: null, sortBy: null }
);

const allProjects = computed(() => {
  if (!data.value) return [];
  return data.value.pages.flatMap((page) => page.data);
});
</script>

<template>
  <div style="height: 400px; overflow: scroll; background: gray">
    <Page
      :isLoading="isLoading"
      :isError="isError"
      :isEmptyContent="allProjects.length === 0"
    >
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

          <v-btn
            v-if="hasNextPage"
            style="display: flex; margin: 0 auto; margin-top: 35px"
            @click="onLoadMoreByButton"
            :loading="isFetchingNextPage"
            >Загрузить еще 10 записей</v-btn
          >
        </v-container>
      </template>
    </Page>
  </div>
</template>
