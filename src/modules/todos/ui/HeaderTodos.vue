<script setup lang="ts">
interface IProps {
  title?: string;
  countTodos: number;
  totalTodos: number;
}

const props = withDefaults(defineProps<IProps>(), {
  title: 'Заметки',
  countTodos: 0,
  totalTodos: 0,
});
</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <h3>{{ props.title }}</h3>
        <p>Показано: {{ props.countTodos }} из {{ props.totalTodos }} постов</p>
      </v-col>
    </v-row>
  </v-container>
</template>
