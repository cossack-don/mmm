<script setup lang="ts">
interface IProps {
  statusError?: null | number;
}

const props = withDefaults(defineProps<IProps>(), {
  statusError: null,
});
</script>

<template>
  <div class="page-error">
    Page Error <br />
    status - {{ props.statusError ?? 'статус не пришел' }}
  </div>
</template>

<style scoped>
.page-error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
