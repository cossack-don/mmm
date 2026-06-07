<script setup lang="ts">
import Card from './Card.vue';

const props = defineProps<{
  allProjects: any;
  isFetchingNextPage: any;
}>();
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="item in props.allProjects"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
      >
        <Card :item="item" />
      </v-col>
    </v-row>

    <v-progress-circular
      style="display: flex; margin: 0 auto; margin-top: 35px"
      v-if="props.isFetchingNextPage"
      color="green"
      indeterminate
    />
  </v-container>
</template>
