<template>
  <div class="posts-container">
    <pre>{{ data }}</pre>
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

// Генерация мок-данных
const generateMockPosts = (offset, limit) => {
  const posts = [];
  const startId = offset + 1;

  for (let i = 0; i < limit; i++) {
    const id = startId + i;
    if (id > 150) break; // Всего 150 постов

    posts.push({
      id: id,
      title: `Пост ${id}: ${getRandomTitle()}`,
      body: `Это содержание поста номер ${id}. ${getRandomText()}`,
      userId: Math.floor(Math.random() * 10) + 1,
      createdAt: new Date(Date.now() - id * 86400000).toISOString(),
    });
  }

  return posts;
};

// Вспомогательные функции для генерации контента
const getRandomTitle = () => {
  const titles = [
    "Интересная новость",
    "Важное объявление",
    "Полезный совет",
    "Обзор технологии",
    "История успеха",
    "Туториал",
    "Мнение эксперта",
    "Аналитика рынка",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
};

const getRandomText = () => {
  const texts = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
  ];
  return texts[Math.floor(Math.random() * texts.length)];
};

// Мок-функция для бэкенда
const fetchMockPosts = async ({ pageParam = 0 }) => {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 800));

  const limit = 50;
  const offset = pageParam * limit;
  const total = 150; // Всего 150 постов в базе данных

  // Генерируем посты для текущей страницы
  const data = generateMockPosts(offset, limit);

  // Имитируем возможную ошибку (раскомментировать для теста)
  // if (pageParam === 2) throw new Error('Ошибка загрузки данных')

  console.log(
    `Загружена страница ${pageParam}: offset=${offset}, limit=${limit}, загружено ${data.length} постов`,
  );

  return {
    data,
    total,
    limit,
    offset: offset,
    // page: pageParam, // Удалено!
  };
};

// Используем useInfiniteQuery
const {
  data,
  error,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetching,
} = useInfiniteQuery({
  queryKey: ["mock-posts"],
  queryFn: fetchMockPosts,
  getNextPageParam: (lastPage, allPages) => {
    // Вычисляем, есть ли следующая страница
    const loadedCount = allPages.length * lastPage.limit;
    const hasMore = loadedCount < lastPage.total;

    console.log(
      `Загружено страниц: ${allPages.length}, загружено постов: ${loadedCount}, всего: ${lastPage.total}, hasMore: ${hasMore}`,
    );

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
