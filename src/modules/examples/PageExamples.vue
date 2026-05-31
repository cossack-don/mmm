<template>
  <div style="padding: 20px">
    <h1>Examples Vue Query</h1>

    <h4>Infinity Scroll + кнопка загрузить еще 10 + лоадер в кнопке</h4>

    <h4>Infinity Scroll + при скролле вниз + лоадер</h4>
    <InfinityScroll />

    <h4>Infinity Scroll + при скролле вниз + лоадер + если total = 0</h4>

    <h4>Use Query - solo fetch</h4>

    <h4>Use Query - несколько запросов в рассинхрон fetch</h4>

    <h4>Use Query - несколько запросов дожидаясь прошлый запрос fetch</h4>

    <h4>Use Mutations - DELETE, PATCH, PUT</h4>

    <h4>Use Mutations - Обработка ошибок и состояний</h4>

    <h4>Шаблон страницы для isError, isPanding, isSuccess + Content</h4>
  </div>
</template>

<script setup lang="ts">
import InfinityScroll from './InfinityScroll_1.vue';
</script>
