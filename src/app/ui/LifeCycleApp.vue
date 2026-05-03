<script setup lang="ts">
import { Spinner } from "../../components/ui";
import { useRouter } from "vue-router";
import { onUpdated } from "vue";

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

const router = useRouter();

onUpdated(() => {
  if (props.isError) router.push({ name: "home" });
});
</script>

<template>
  <div :class="{ 'app-loading': props.isLoading }" class="life-cycle-app">
    <Spinner v-if="props.isLoading" />

    <template v-else-if="props.isError">
      <slot name="error" />
    </template>

    <template v-else-if="props.isSuccess">
      <slot name="success" />
    </template>

    <template v-else>
      <slot name="else" />
    </template>
  </div>
</template>

<style scoped>
.app-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}
</style>
