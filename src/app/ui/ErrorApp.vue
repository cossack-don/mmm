<script setup lang="ts">
interface IProps {
  statusError: null | number;
}

const props = withDefaults(defineProps<IProps>(), {
  statusError: null,
});
</script>

<template>
  <div class="error-app">
    Error App <br />
    status - {{ props.statusError ?? "статус не пришел" }}
  </div>
</template>

<style scoped>
.error-app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}
</style>
