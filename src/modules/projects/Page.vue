<script setup lang="ts">
import { Page } from '@/components/pages'


import { computed, ref } from "vue";
import { useInfiniteQuery, useMutation } from "@tanstack/vue-query";

import { Button, Card } from "@components-ui";
import { useInfiniteScroll, useDebounceFn } from "@vueuse/core";

import {
  projectsCreateQuery,
  projectsDeleteQuery,
  projectsGetQuery,
} from "@/modules/projects/query";

const {
  data,
  isError,
  isLoading,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
} = useInfiniteQuery(projectsGetQuery.GET_LIST_INFINITY_SCROLL());

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

const nameProject = ref("");

const { mutate: deleteByIdProject } = useMutation(projectsDeleteQuery.DELETE());
const { mutate: createProject } = useMutation(projectsCreateQuery.POST());

const onCreateProject = () => {
  if (!nameProject.value.trim()) return;
  createProject({ name: nameProject.value });
  nameProject.value = "";
};

const onDeleteByIdProject = (id: number | string) => {
  deleteByIdProject({ id: id });
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
  { distance: 100 }, // Загружаем за 200px до конца
);
</script>

<template>
   <Page 
   :isLoading="isLoading" 
   :isError="isError" 
   :isEmptyContent="allProjects.length === 0"
   >
    <template #pageError>
        error content
    </template>
        
          <template #headerContent>
          <div>header content</div>
       </template>


     <template #notEmptyBodyContent>
    Проекты - показано: {{ allProjects.length }} из {{ totalProjects }} проектов

        <input
      v-model="nameProject"
      placeholder="Название проекта"
      @keyup.enter="onCreateProject"
    />
    <Button @click="onCreateProject">Создать проект</Button>

    <v-container>
      <v-row>
        <v-col
        v-for="item in allProjects"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card 
         color="indigo"
          text="Колесо баланса"
        :title="`Проект - ${item.name} - ID ${item.id}`">
      
       <v-card-actions>
    <v-btn    :to="`/project/${item.id}`" >Перейти</v-btn>
      <v-btn @click="onDeleteByIdProject(item.id)">Удалить</v-btn>
  </v-card-actions>
      </v-card>
        
       
      </v-col>
      </v-row>

          <v-progress-circular
      v-if="isFetchingNextPage"
      color="green"
      indeterminate
    ></v-progress-circular>
    </v-container>


 

      </template>
 
      <template #emptyBodyContent>
          <div>empty content</div>
       </template>

    </Page>
</template>
