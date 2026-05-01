<script setup lang="ts">
import Spinner from "../ui/Spinner.vue";

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
  <div>
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
