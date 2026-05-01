<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { onMounted } from "vue";

const checkHealthApi = async () => {
  const res = await fetch("http://localhost:3000/check-health");
  const json = await res.json();

  console.log("check-health-API", json);
};
onMounted(() => {
  checkHealthApi();
});
</script>

<template>
  <HelloWorld />
</template>
