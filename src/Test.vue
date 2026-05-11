<template>
  <div class="posts-container">
    <div v-if="isLoading" class="loading">Загрузка...</div>

    <div v-else-if="error" class="error">Ошибка: {{ error.message }}</div>

    <div v-else class="content">
      <!-- Список постов -->
      <div v-for="post in allPosts" :key="post.id" class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <div class="post-id">ID: {{ post.id }}</div>
      </div>

      <!-- Информация о загрузке -->
      <div class="info">
        Показано: {{ allPosts.length }} из {{ totalPosts }} постов
      </div>

      <!-- Кнопка "Загрузить еще" -->
      <div v-if="hasMore" class="load-more">
        <button
          @click="fetchNextPage"
          :disabled="isFetchingNextPage"
          class="load-more-btn"
        >
          {{ isFetchingNextPage ? "Загрузка..." : "Загрузить еще" }}
        </button>
      </div>

      <!-- Сообщение о завершении -->
      <div v-if="!hasMore && allPosts.length > 0" class="completed">
        Все посты загружены! 🎉
      </div>
    </div>
  </div>
</template>

<script setup>
import { useInfiniteQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { serviceTodos } from "./api/index.js";

const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ["mock-posts"],
    queryFn: async ({ pageParam = 0 }) => {
      const params = { limit: 5, offset: pageParam * 5 };

      const { data } = await serviceTodos.getList(
        3,
        params.limit,
        params.offset,
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
    staleTime: 5 * 60 * 1000, // 5 минут
    refetchOnWindowFocus: false,
  });

// Все посты из всех загруженных страниц
const allPosts = computed(() => {
  if (!data.value) return [];
  return data.value.pages.flatMap((page) => page.data);
});

// Общее количество постов
const totalPosts = computed(() => {
  if (!data.value) return 0;
  return data.value.pages[0]?.total || 0;
});

// Проверяем, есть ли еще данные для загрузки
const hasMore = computed(() => {
  if (!data.value) return false;

  const lastPage = data.value.pages[data.value.pages.length - 1];
  const loadedCount = data.value.pages.length * lastPage.limit;

  return loadedCount < lastPage.total;
});
</script>

<style scoped>
.posts-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.post {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.post:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.post h3 {
  margin-top: 0;
  color: #2c3e50;
}

.post p {
  color: #666;
  line-height: 1.5;
  margin: 10px 0;
}

.post-id {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
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

.load-more {
  text-align: center;
  margin: 20px 0;
}

.load-more-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s;
}

.load-more-btn:hover:not(:disabled) {
  background-color: #359268;
  transform: scale(1.02);
}

.load-more-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
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
