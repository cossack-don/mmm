<script setup lang="ts">
const props = defineProps<{
  title?: string;
  body?: string;
  footer?: string;
  styles?: any;
}>();
</script>

<template>
  <div class="card" :style="props.styles">
    <slot name="default">
      <div>{{ props.title }}</div>
      <div>{{ props.body }}</div>
      <div>{{ props.footer }}</div>
    </slot>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 10px 15px;
  border-radius: 5px;
  width: fit-content;
}
</style>
