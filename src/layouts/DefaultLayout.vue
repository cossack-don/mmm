<template>
  <BaseHeader />

  <main style="background-color: white" class="content">
    <slot />
  </main>

  <BaseFooter />
</template>
<script setup lang="ts">
import { BaseHeader, BaseFooter } from "./ui";
</script>
