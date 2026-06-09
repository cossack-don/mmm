<template>
  <div style="padding: 20px">
    <h1>Examples Vue Query</h1>

    <h4>Infinity Load More by Infinity Scroll + Loader</h4>
    <InfinityScroll />

    <h4>Infinity Load More by Button + Loader in Button</h4>
    <InfinityLoadButton />

    <h4>
      Infinity Load More by Button + Loader in Button + Delete Item by Button
      and update list items
    </h4>
    <InfinityDeleteItemByButton />

    <h4>Пример шаблона страницы с конетом + isLoading, isError, isSuccess</h4>
    <Page />

    <!-- <h4>Infinity Scroll + при скролле вниз + лоадер + если total = 0</h4>

    <h4>Use Query - solo fetch</h4>

    <h4>Use Query - несколько запросов в рассинхрон fetch</h4>

    <h4>Use Query - несколько запросов дожидаясь прошлый запрос fetch</h4>

    <h4>Use Mutations - DELETE, PATCH, PUT</h4>

    <h4>Use Mutations - Обработка ошибок и состояний</h4>

   -->
  </div>
</template>

<script setup lang="ts">
import InfinityScroll from './InfinityScroll.vue';
import InfinityLoadButton from './InfinityLoadButton.vue';
import InfinityDeleteItemByButton from './InfinityDeleteItemByButton.vue';

import Page from './Page.vue';
</script>
