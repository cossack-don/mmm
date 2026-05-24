<script setup lang="ts">
interface IProps {
  isLoading?: boolean;
  isError?: boolean;
  isEmptyContent?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  isLoading: false,
  isError: false,
  isEmptyContent: false,
});
</script>

<template>
  <v-progress-circular
    style="display: flex; margin: 0 auto; height: calc(100vh - 64px)"
    v-if="props.isLoading"
    color="green"
    indeterminate
  />

  <template v-else-if="props.isError">
    <slot name="pageError" />
  </template>

  <template v-else>
    <slot name="pageSuccess">
      <slot name="headerContent"></slot>

      <template v-if="props.isEmptyContent">
        <slot name="emptyBodyContent">
          <v-empty-state
            title="Проектов нет"
            text="Создайте пожалуйста проект"
            image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
          ></v-empty-state>
        </slot>
      </template>

      <template v-else>
        <slot name="notEmptyBodyContent">
          <v-empty-state
            title="Что-то пошло не так с API"
            text="The page you were looking for does not exist"
            image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
          ></v-empty-state>
        </slot>
      </template>
    </slot>
  </template>
</template>
