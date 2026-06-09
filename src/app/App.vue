<script setup lang="ts">
import { onUpdated } from 'vue';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { isLayout } from '@/app/layouts';
import { useStoreSnackBar } from './store';
import { storeToRefs } from 'pinia';
import { useCheckHealth } from '@/api/services/check-health';
import { Page } from '@components-pages';
import ProviderApp from './ProviderApp.vue';

const { isLoading, isError } = useCheckHealth();

onUpdated(() => console.warn('Layout re-rendered!'));

const { refElementSnackBar, listMessagesSnackBar } =
  storeToRefs(useStoreSnackBar());
</script>

<template>
  <Page :isLoadingPage="isLoading" :isErrorPage="isError">
    <template #contentBody>
      <ProviderApp>
        <isLayout />
      </ProviderApp>
    </template>
  </Page>

  <VueQueryDevtools />

  <v-snackbar-queue
    :ref="refElementSnackBar"
    v-model="listMessagesSnackBar"
    total-visible="5"
    location="top end"
    closable
  />
</template>
