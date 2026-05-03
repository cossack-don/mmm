<template>
  <BaseHeader />

  <main style="background-color: blue">
    <slot />
  </main>
</template>
<script setup lang="ts">
import BaseHeader from "./ui/BaseHeader.vue";
</script>
