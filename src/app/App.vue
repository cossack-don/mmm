<script setup lang="ts">
import { onMounted, onUpdated } from "vue";
import { LifeCycleApp, ErrorApp, DefaultApp } from "./ui";
import { controllerApp } from "./controller.app";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { isLayout } from "../layouts";
const { checkHealthApp, isError, isLoading, isSuccess, statusError } =
  controllerApp();

onMounted(() => checkHealthApp());

onUpdated(() => {
  console.warn("Layout re-rendered!");
});
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
      <isLayout />
    </template>

    <template #else>
      <DefaultApp />
    </template>
  </LifeCycleApp>

  <VueQueryDevtools />
</template>
