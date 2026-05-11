<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { todosQuery } from "../../modules/todos/query/todos.query.ts";
import { useRoute } from "vue-router";
import { Modal, Card, Button, DropDown } from "../../../../components/ui";

const route = useRoute();
const queryClient = useQueryClient();

const { data } = useQuery(todosQuery.GET_LIST(route));
const { mutate: deleteByIdTodo } = useMutation(todosQuery.DELETE(queryClient));

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
        {{ item.name }}
        <Button @click="onDeleteByIdTodo(item.id)">DEL</Button>
      </template>
    </Card>
  </div>
</template>
