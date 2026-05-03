<script setup lang="ts">
import { onMounted, onUpdated, ref } from "vue";
import { serviceTodos } from "../../api/serviceTodos";
import { LifeCyclePage, ErrorPage } from "../../components/pages";
import { useStatusesLifeCycle } from "../../composables";

import BasePage from "../../BasePage.vue";

const {
  isError,
  isLoading,
  isSuccess,
  statusError,
  setStatusError,
  setStatusLifeCycle,
} = useStatusesLifeCycle();

const listTodos = ref([]);

const stateName = ref("");
const stateDescription = ref("");

const updateListTodos = async () => {
  const data = await serviceTodos.getList();
  listTodos.value = data.data;
  //если 200 статус try / catch тут не делал
  setStatusLifeCycle("isSuccess", true);
};

const deleteByIdTodo = async (id: number | string) => {
  await serviceTodos.deleteById(id);
  await controllerTodoList.updateListTodos();
};

const createTodo = async () => {
  if (stateName.value === "" || stateDescription.value === "") return;

  await serviceTodos.createTodo(stateName.value, stateDescription.value);
  await controllerTodoList.updateListTodos();
};

const controllerTodoList = {
  updateListTodos,
  deleteByIdTodo,
  createTodo,
};

onMounted(() => {
  controllerTodoList.updateListTodos();
});
</script>

<template>
  <LifeCyclePage
    :isLoading="isLoading"
    :isError="isError"
    :isSuccess="isSuccess"
  >
    <template #error>
      <ErrorPage />
    </template>

    <template #success>
      <router-link
        :to="`/project/${item.id}/`"
        v-for="item in listTodos"
        :key="item.id"
        style="
          display: block;
          background: greenyellow;
          padding: 15px;
          margin-bottom: 20px;
        "
      >
        <p>ID: {{ item.id }}</p>
        <p>Name: {{ item.name }}</p>
        <p>Description: {{ item.description }}</p>
      </router-link>

      <hr />
      <br />
      <br />
      <BasePage />
    </template>

    <template #else> ELSE PAGE</template>
  </LifeCyclePage>
</template>
