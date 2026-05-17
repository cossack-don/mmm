<script setup lang="ts">
import { computed, ref } from "vue";
import { useInfiniteQuery, useMutation } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import { Button, Card } from "@components-ui";
import { useInfiniteScroll } from "@vueuse/core";

import {
  projectsCreateQuery,
  projectsDeleteQuery,
  projectsGetQuery,
} from "@/modules/projects/query";

const route = useRoute();

const {
  data,
  error,
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

// Реф для контейнера со скроллом
const scrollContainerRef = ref<HTMLElement | null>(null);

// Настройка бесконечного скролла
useInfiniteScroll(
  scrollContainerRef, // Используем контейнер, а не window
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
  <h3>
    Проекты - показано: {{ allProjects.length }} из {{ totalProjects }} проектов
  </h3>

  <div class="create-form">
    <input
      v-model="nameProject"
      placeholder="Название проекта"
      @keyup.enter="onCreateProject"
    />
    <Button @click="onCreateProject">Создать проект</Button>
  </div>

  <div v-if="isLoading" class="loading">Загрузка...</div>

  <div v-else-if="error" class="error">Ошибка: {{ error.message }}</div>

  <div v-else class="scroll-container" ref="scrollContainerRef">
    <div class="content">
      <!-- Список проектов -->
      <Card
        v-for="project in allProjects"
        :key="project.id"
        styles="width: 100%"
        class="project"
      >
        <template #default>
          <router-link :to="`/project/${project.id}`">{{
            project.name
          }}</router-link>
          <Button @click="onDeleteByIdProject(project.id)">Удалить</Button>
        </template>
      </Card>

      <!-- Индикатор загрузки следующих страниц -->
      <div v-if="isFetchingNextPage" class="loading-more">
        Загрузка еще проектов...
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.create-form input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.create-form input:focus {
  outline: none;
  border-color: #42b883;
}

.scroll-container {
  height: 60vh; /* Фиксированная высота */
  overflow-y: auto; /* Включаем вертикальную прокрутку */
  padding: 0 16px;
}

.project {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.project:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.project p {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 16px;
}

.info {
  text-align: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
  margin: 20px 0;
  color: #666;
  font-size: 14px;
}

.loading,
.loading-more {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error {
  text-align: center;
  padding: 20px;
  color: #e74c3c;
  background: #fde0dc;
  border-radius: 8px;
  margin: 20px;
}

.completed {
  text-align: center;
  padding: 20px;
  background: #d4edda;
  color: #155724;
  border-radius: 8px;
  margin: 20px 0;
  font-weight: 500;
}
</style>
