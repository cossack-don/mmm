<script setup lang="ts">
import ErrorPage from './ErrorPage.vue';

interface IProps {
  isLoadingPage?: boolean;
  isErrorPage?: boolean;
  isEmptyContent?: boolean;

  isLoadingContent?: boolean;
  isSearchProcess?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  isLoadingPage: false,
  isErrorPage: false,
  isEmptyContent: false,

  isLoadingContent: false,
  isSearchProcess: false,
});
</script>

<template>
  <v-progress-circular
    v-if="props.isLoadingPage"
    style="display: flex; margin: 0 auto; height: calc(100vh - 64px)"
    color="green"
    indeterminate
  />

  <template v-else-if="props.isErrorPage">
    <slot name="pageError">
      <ErrorPage />
    </slot>
  </template>

  <template v-else>
    <slot name="pageSuccess">
      <slot name="headerContent" />

      <v-progress-circular
        v-if="props.isLoadingContent"
        style="display: flex; margin: 0 auto; height: calc(100vh - 64px)"
        color="green"
        indeterminate
      />

      <template v-else-if="props.isEmptyContent && props.isSearchProcess">
        <slot name="emptyBodyContent">
          <v-empty-state
            title="Поиск ничего не нашел"
            text="Попробуйте ввести подругому"
            image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
          />
        </slot>
      </template>

      <template v-else-if="props.isEmptyContent && !props.isSearchProcess">
        <slot name="emptyBodyContent">
          <v-empty-state
            title="Проектов нет"
            text="Создайте пожалуйста проект"
            image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
          />
        </slot>
      </template>

      <template v-else>
        <slot name="notEmptyBodyContent">
          <v-empty-state
            title="Что-то пошло не так с API"
            text="The page you were looking for does not exist"
            image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
          />
        </slot>
      </template>
    </slot>
  </template>
</template>
