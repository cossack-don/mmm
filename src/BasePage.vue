<script setup lang="ts">
import { onMounted, ref } from "vue";
import { serviceTodos } from "./api/serviceTodos";
import { LifeCyclePage, ErrorPage } from "./components/pages";
import { useStatusesLifeCycle } from "./composables";

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
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #40b883;
          margin-bottom: 40px;
        "
      >
        <input placeholder="Имя" type="text" v-model="stateName" />
        <input placeholder="Описание" type="text" v-model="stateDescription" />
        <button @click="controllerTodoList.createTodo">Создать</button>
      </div>

      <div
        v-for="item in listTodos"
        :key="item.id"
        style="background: greenyellow; padding: 15px; margin-bottom: 20px"
      >
        <p>ID: {{ item.id }}</p>
        <p>Name: {{ item.name }}</p>
        <p>Description: {{ item.description }}</p>

        <button @click="controllerTodoList.deleteByIdTodo(item.id)">
          Delete
        </button>
      </div>
    </template>

    <template #else> ELSE PAGE</template>
  </LifeCyclePage>
</template>
