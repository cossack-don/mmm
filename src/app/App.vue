<script setup lang="ts">
import { onMounted } from "vue";
import { LifeCycleApp, ErrorApp, DefaultApp } from "./ui";
import { controllerApp } from "./controller.app";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";

const { checkHealthApp, isError, isLoading, isSuccess, statusError } =
  controllerApp();

onMounted(() => checkHealthApp());
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
      <RouterView />
    </template>

    <template #else>
      <DefaultApp />
    </template>
  </LifeCycleApp>

  <VueQueryDevtools />
</template>
