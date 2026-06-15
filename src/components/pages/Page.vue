<script setup lang="ts">
import {
  PageError,
  ContentError,
  ContentSearchEmpty,
  ContentNotItems,
} from '.';

interface IProps {
  isLoadingPage?: boolean;
  isErrorPage?: boolean;
  isEmptyContent?: boolean;

  isLoadingHeader?: boolean;
  isErrorHeader?: boolean;

  isLoadingContent?: boolean;
  isErrorContent?: boolean;
  isSearchContent?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  isLoadingPage: false,
  isErrorPage: false,

  isLoadingHeader: false,
  isErrorHeader: false,

  isEmptyContent: false,
  isLoadingContent: false,
  isErrorContent: false,
  isSearchContent: false,
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
      <PageError />
    </slot>
  </template>

  <template v-else-if="!props.isErrorPage && !props.isLoadingPage">
    <slot name="pageSuccess">
      <v-progress-circular
        v-if="props.isLoadingHeader"
        style="display: flex; margin: 0 auto; height: 150px"
        color="green"
        indeterminate
      />

      <template v-else-if="props.isErrorHeader">
        <div style="display: flex; margin: 0 auto; height: 150px">
          error-header
        </div>
      </template>

      <template v-else>
        <slot name="contentHeader" />
      </template>

      <v-progress-circular
        v-if="props.isLoadingContent"
        style="display: flex; margin: 0 auto; height: calc(100vh - 64px)"
        color="green"
        indeterminate
      />

      <template v-else-if="props.isErrorContent">
        <slot name="сontentError">
          <ContentError />
        </slot>
      </template>

      <template v-else-if="props.isEmptyContent && props.isSearchContent">
        <slot name="сontentSearchEmpty">
          <ContentSearchEmpty />
        </slot>
      </template>

      <template v-else-if="props.isEmptyContent && !props.isSearchContent">
        <slot name="сontentNotItems">
          <ContentNotItems />
        </slot>
      </template>

      <template v-else>
        <slot name="contentBody" />
      </template>
    </slot>
  </template>
</template>
