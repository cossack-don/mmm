<script setup lang="ts">
import { Spinner } from "../../components/ui";

interface IProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  isLoading: false,
  isError: false,
  isSuccess: false,
});
</script>

<template>
  <div :class="{ 'loading-app': props.isLoading }">
    <Spinner v-if="props.isLoading" />

    <div v-else-if="props.isError">
      <slot name="error" />
    </div>

    <div v-else-if="props.isSuccess">
      <slot name="success" />
    </div>

    <div v-else>
      <slot name="else" />
    </div>
  </div>
</template>

<style scoped>
.loading-app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}
</style>
