<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { projectsCreateQuery } from '../query';

const props = defineProps<{
  projects: any;
  totalProjects: any;
}>();

const nameProject = ref('');

const { mutate: createProject } = useMutation(projectsCreateQuery.POST);

const onCreateProject = () => {
  if (!nameProject.value.trim()) return;
  createProject({ name: nameProject.value });
  nameProject.value = '';
};

const search = ref('');

const emit = defineEmits(['onSearch', 'onClearSearch']);

const onClearSearch = () => {
  search.value = '';
  emit('onClearSearch', search);
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <p>
          Проекты - показано: {{ props.projects.length }} из
          {{ props.totalProjects }} проектов
        </p>

        <v-text-field
          v-model="search"
          label="Поиск проекта"
          clearable
          @keyup.enter="emit('onSearch', search)"
        ></v-text-field>

        <v-btn @click="emit('onSearch', search)">Найти</v-btn>
        <v-btn @click="onClearSearch">Очистить</v-btn>
        <input
          v-model="nameProject"
          placeholder="Название проекта"
          @keyup.enter="onCreateProject"
        />
        <v-btn @click="onCreateProject">Создать проект</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
