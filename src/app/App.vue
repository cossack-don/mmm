<script setup lang="ts">
import { onMounted, onUpdated } from 'vue';
import { LifeCycleApp, ErrorApp, DefaultApp } from './ui';
import { controllerApp } from './controller.app';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { isLayout } from '@/app/layouts';

const { checkHealthApp, isError, isLoading, isSuccess, statusError } =
  controllerApp();

onMounted(() => checkHealthApp());

// onUpdated(() => {
//   // console.warn("Layout re-rendered!");
// });

import { useStoreSnackBar } from './store';
import { storeToRefs } from 'pinia';

const { pushMessageSnackBar } = useStoreSnackBar();
const { refElementSnackBar, listMessagesSnackBar } =
  storeToRefs(useStoreSnackBar());
</script>

<template>
  <LifeCycleApp
    :isLoading="isLoading"
    :isError="isError"
    :isSuccess="isSuccess"
  >
    <template #error>
      <ErrorApp :statusError="statusError" />
    </template>

    <template #success>
      <!-- <v-btn
        color="success"
        @click="pushMessageSnackBar({ type: 'error', text: 'text' })"
        >Success</v-btn
      > -->
      <isLayout />

      <v-snackbar-queue
        :ref="refElementSnackBar"
        v-model="listMessagesSnackBar"
        total-visible="5"
        closable
      />
    </template>

    <template #else>
      <DefaultApp />
    </template>
  </LifeCycleApp>

  <VueQueryDevtools />
</template>
