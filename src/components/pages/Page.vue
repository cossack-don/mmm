<script setup lang="ts">
import Spinner from "../ui/Spinner.vue";

interface IProps {
  isLoading?: boolean;
  isError?: boolean;
  isEmptyContent?:boolean
}

const props = withDefaults(defineProps<IProps>(), {
  isLoading: false,
  isError: false,
  isEmptyContent:false
});
</script>

<template>
    <Spinner v-if="props.isLoading" />
    
    <template v-else-if="props.isError">
      <slot name="pageError" />
    </template>

    <template v-else>
      <slot name="pageSuccess">
        <slot name="headerContent"></slot>

        <template v-if="props.isEmptyContent">
          <slot name="emptyBodyContent"></slot>
        </template>
        <template v-else>
          <slot name="notEmptyBodyContent"></slot>
        </template>
      </slot>
    </template>
</template>
