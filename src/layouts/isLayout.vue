<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed, defineAsyncComponent, onMounted } from "vue";
import { useRoute } from "vue-router";

const DefaultLayout = defineAsyncComponent(
  () => import("../layouts/DefaultLayout.vue"),
);
const AuthLayout = defineAsyncComponent(
  () => import("../layouts/AuthLayout.vue"),
);
const NavigationLayout = defineAsyncComponent(
  () => import("../layouts/NavigationLayout.vue"),
);

const route = useRoute();

const layouts = {
  DefaultLayout,
  AuthLayout,
  NavigationLayout,
};

const layout = computed(() => {
  const layoutName = route.meta.layout || "DefaultLayout";
  return layouts[layoutName];
});
</script>
