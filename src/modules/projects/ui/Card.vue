<script setup lang="ts">
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { projectsDeleteQuery, projectsUpdateQuery } from '../query';

const props = defineProps<{
  item: any;
}>();

const {
  isPending: isPendingDelete,
  isError: isErrorDelete,
  mutate: deleteByIdProject,
} = useMutation(projectsDeleteQuery.DELETE);

const onDeleteByIdProject = (id: number) => {
  deleteByIdProject({ id: id });
};

const isEditing = ref(false);
const nameProject = ref('');

const onEditingCard = () => (isEditing.value = !isEditing.value);

const {
  isPending: isPendingEdite,
  isError: isErrorEdite,
  mutate: updateProject,
} = useMutation(projectsUpdateQuery.UPDATE);

const onBLurChangeName = (id: number, event: Event) => {
  updateProject({ id: id, name: (event.target as HTMLInputElement).value });
  isEditing.value = !isEditing.value;
};
</script>

<template>
  <v-card color="indigo">
    <v-card-text>
      <v-text-field
        v-if="isEditing"
        @blur="onBLurChangeName(item.id, $event)"
        v-model="nameProject"
      ></v-text-field>
      <div>Проект - {{ props.item.name }}, ID - {{ props.item.id }},</div>
    </v-card-text>

    <v-card-actions>
      <v-btn :to="`/project/${props.item.id}`" color="blue" variant="flat"
        >Перейти</v-btn
      >
      <v-btn
        @click="onDeleteByIdProject(props.item.id)"
        color="red"
        variant="flat"
        :loading="isPendingDelete"
        >Удалить</v-btn
      >
      <v-btn
        @click="onEditingCard"
        color="green"
        variant="flat"
        :loading="isPendingEdite"
        >Редактировать</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
