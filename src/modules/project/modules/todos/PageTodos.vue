<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import { todosDeleteQuery, todosGetQuery } from "../../modules/todos/query";
import { useRoute } from "vue-router";
import { Modal, Card, Button, DropDown } from "../../../../components/ui";

const route = useRoute();

const { data } = useQuery(todosGetQuery.GET_LIST(route));
const { mutate: deleteByIdTodo } = useMutation(todosDeleteQuery.DELETE());

const onDeleteByIdTodo = (idTask: string | number) => {
  deleteByIdTodo({
    idProject: route.params.idProject,
    idTask: idTask,
  });
};
</script>

<template>
  <div>
    <h3>Заметки</h3>
    <Card v-for="item in data" :key="item.id" styles="width: 100%">
      <template #default>
        <p>{{ item.name }}</p>
        <Button @click="onDeleteByIdTodo(item.id)">DEL</Button>
      </template>
    </Card>
  </div>
</template>
