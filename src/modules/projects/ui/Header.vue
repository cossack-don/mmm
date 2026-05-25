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
</script>

<template>
  <div>
    <p>
      Проекты - показано: {{ props.projects.length }} из
      {{ props.totalProjects }} проектов
    </p>

    <input
      v-model="nameProject"
      placeholder="Название проекта"
      @keyup.enter="onCreateProject"
    />
    <v-btn @click="onCreateProject">Создать проект</v-btn>
  </div>
</template>
