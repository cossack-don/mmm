<template>
  <div style="padding: 20px">
    <h1>Примеры Vue Query</h1>

    <h4>Инфинити скролл с подгрузкой + лоадер снизу</h4>
    <InfinityScroll />

    <h4>Инфинити скролл с подгрузкой на кнопку (клик)</h4>
    <InfinityLoadButton />

    <h4>
      DRAFT <br />
      Инфинити подгрузка на кнопку с лоадером + когда удаляем элемент, автоматом
      из UI уходит + учитываем чтобы скролл не сломался, так как смещение
      элемента идет в -1
    </h4>
    <InfinityDeleteItemByButton />

    <h4>Пример компонента Page</h4>

    <Page
      :isLoadingContent="false"
      :isErrorContent="false"
      :isSearchContent="false"
      :isEmptyContent="[].length === 0"
    >
      <template #contentHeader> Header content </template>

      <template #contentBody> Body content </template>
    </Page>

    <h4>
      DRAFT <br />
      Infinity Scroll + при скролле вниз + лоадер + если total = 0
    </h4>

    <h4>DRAFT <br />Use Query - solo fetch</h4>

    <h4>DRAFT <br />Use Query - несколько запросов в рассинхрон fetch</h4>

    <h4>
      DRAFT <br />Use Query - несколько запросов дожидаясь прошлый запрос fetch
    </h4>

    <h4>DRAFT <br />Use Mutations - DELETE, PATCH, PUT</h4>

    <h4>DRAFT <br />Use Mutations - Обработка ошибок и состояний</h4>
  </div>
</template>

<script setup lang="ts">
import InfinityScroll from './InfinityScroll.vue';
import InfinityLoadButton from './InfinityLoadButton.vue';
import InfinityDeleteItemByButton from './InfinityDeleteItemByButton.vue';

import { Page } from '@components-pages';
</script>
