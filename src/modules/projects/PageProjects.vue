<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { projectService } from "@api";
import { LifeCyclePage, ErrorPage, DefaultPage } from "@components-pages";
import { useStatusesLifeCycle } from "@composables";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/vue-query";
import { todosGetQuery } from "@/modules/project/modules/todos/query";
import { useRoute } from "vue-router";
import { Button, Card } from "@components-ui";
import {
  projectsCreateQuery,
  projectsDeleteQuery,
  projectsGetQuery,
} from "@/modules/projects/query";
import { caseYearDeleteQuery } from "@/modules/project/modules/case-year/query/case-year";

// TODO 1 доделать пагинация для руки проекты на беке
// TODO 2 прикрутить беконечный скролл без кнопки на главную страницу на проекты через vue query

// const route = useRoute();

// TODO на беке не сделаны лими отффсеты для ПРОЕКТОВ РУЧКИ
// const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
//   useInfiniteQuery(todosGetQuery.GET_LIST_INFINITY_SCROLL(route));
//
// // Все посты из всех загруженных страниц
// const allPosts = computed(() => {
//   if (!data.value) return [];
//   return data.value.pages.flatMap((page) => page.data);
// });
//
// // Общее количество постов
// const totalPosts = computed(() => {
//   if (!data.value) return 0;
//   return data.value.pages[0]?.total || 0;
// });
//
// // Проверяем, есть ли еще данные для загрузки
// const hasMore = computed(() => {
//   if (!data.value) return false;
//
//   const lastPage = data.value.pages[data.value.pages.length - 1];
//   const loadedCount = data.value.pages.length * lastPage.limit;
//
//   return loadedCount < lastPage.total;
// });

const nameProject = ref("");

const {
  data: listProjects,
  isPending,
  isSuccess,
  isError,
} = useQuery(projectsGetQuery.GET_LIST());

const { mutate: deleteByIdProject } = useMutation(projectsDeleteQuery.DELETE());
const { mutate: createProject } = useMutation(projectsCreateQuery.POST());

const onCreateProject = () => {
  createProject({ name: nameProject.value });
  nameProject.value = "";
};

const onDeleteByIdProject = (id: number | string) => {
  deleteByIdProject({ id: id });
};
</script>

<template>
  <LifeCyclePage
    :isLoading="isPending"
    :isError="isError"
    :isSuccess="isSuccess"
  >
    <template #error>
      <ErrorPage />
    </template>

    <template #success>
      <button @click="onCreateProject">create project</button>
      <input type="text" v-model="nameProject" />

      <div
        v-for="item in listProjects"
        :key="item.id"
        style="
          display: block;
          background: greenyellow;
          padding: 15px;
          margin-bottom: 20px;
        "
      >
        <router-link :to="`/project/${item.id}/`">
          <p>ID: {{ item.id }}</p>
          <p>Name: {{ item.name }}</p>
        </router-link>

        <button @click="onDeleteByIdProject(item.id)">del</button>
      </div>
    </template>

    <template #else> <DefaultPage /></template>
  </LifeCyclePage>
</template>

<!--V2-->

<!--<template>-->
<!--  <h3>Заметки</h3>-->

<!--  <div class="info">-->
<!--    Показано: {{ allPosts.length }} из {{ totalPosts }} постов-->
<!--  </div>-->

<!--  <div class="posts-container">-->
<!--    <div v-if="isLoading" class="loading">Загрузка...</div>-->

<!--    <div v-else-if="error" class="error">Ошибка: {{ error.message }}</div>-->

<!--    <div v-else class="content">-->
<!--      &lt;!&ndash; Список постов &ndash;&gt;-->
<!--      <Card-->
<!--        v-for="post in allPosts"-->
<!--        :key="post.id"-->
<!--        styles="width: 100%"-->
<!--        class="post"-->
<!--      >-->
<!--        <template #default>-->
<!--          <p>{{ post.name }}</p>-->
<!--          <Button @click="onDeleteByIdTodo(post.id)">DEL</Button>-->
<!--        </template>-->
<!--      </Card>-->

<!--      &lt;!&ndash; Кнопка "Загрузить еще" &ndash;&gt;-->
<!--      <div v-if="hasMore" class="load-more">-->
<!--        <button-->
<!--          @click="fetchNextPage"-->
<!--          :disabled="isFetchingNextPage"-->
<!--          class="load-more-btn"-->
<!--        >-->
<!--          {{ isFetchingNextPage ? "Загрузка..." : "Загрузить еще" }}-->
<!--        </button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--  .posts-container {-->
<!--    padding: 20px;-->
<!--    font-family: Arial, sans-serif;-->
<!--  }-->

<!--  .post {-->
<!--    border: 1px solid #e0e0e0;-->
<!--    border-radius: 8px;-->
<!--    padding: 16px;-->
<!--    margin-bottom: 16px;-->
<!--    background: white;-->
<!--    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);-->
<!--    transition: transform 0.2s;-->
<!--  }-->

<!--  .post:hover {-->
<!--    transform: translateY(-2px);-->
<!--    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);-->
<!--  }-->

<!--  .post h3 {-->
<!--    margin-top: 0;-->
<!--    color: #2c3e50;-->
<!--  }-->

<!--  .post p {-->
<!--    color: #666;-->
<!--    line-height: 1.5;-->
<!--    margin: 10px 0;-->
<!--  }-->

<!--  .post-id {-->
<!--    font-size: 12px;-->
<!--    color: #999;-->
<!--    margin-top: 8px;-->
<!--  }-->

<!--  .info {-->
<!--    text-align: center;-->
<!--    padding: 10px;-->
<!--    background: #f8f9fa;-->
<!--    border-radius: 6px;-->
<!--    margin: 20px 0;-->
<!--    color: #666;-->
<!--    font-size: 14px;-->
<!--  }-->

<!--  .load-more {-->
<!--    text-align: center;-->
<!--    margin: 20px 0;-->
<!--  }-->

<!--  .load-more-btn {-->
<!--    background-color: #42b883;-->
<!--    color: white;-->
<!--    border: none;-->
<!--    padding: 12px 24px;-->
<!--    border-radius: 6px;-->
<!--    cursor: pointer;-->
<!--    font-size: 16px;-->
<!--    font-weight: 500;-->
<!--    transition: all 0.2s;-->
<!--  }-->

<!--  .load-more-btn:hover:not(:disabled) {-->
<!--    background-color: #359268;-->
<!--    transform: scale(1.02);-->
<!--  }-->

<!--  .load-more-btn:disabled {-->
<!--    background-color: #ccc;-->
<!--    cursor: not-allowed;-->
<!--  }-->

<!--  .loading,-->
<!--  .loading-more {-->
<!--    text-align: center;-->
<!--    padding: 40px;-->
<!--    color: #666;-->
<!--  }-->

<!--  .error {-->
<!--    text-align: center;-->
<!--    padding: 20px;-->
<!--    color: #e74c3c;-->
<!--    background: #fde0dc;-->
<!--    border-radius: 8px;-->
<!--    margin: 20px;-->
<!--  }-->

<!--  .completed {-->
<!--    text-align: center;-->
<!--    padding: 20px;-->
<!--    background: #d4edda;-->
<!--    color: #155724;-->
<!--    border-radius: 8px;-->
<!--    margin: 20px 0;-->
<!--    font-weight: 500;-->
<!--  }-->
<!--</style>-->
