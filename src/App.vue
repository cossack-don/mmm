<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { onMounted, ref } from "vue";
import { serviceTodos } from "./api/serviceTodos.ts";

const checkHealthApi = async () => {
  const res = await fetch("http://localhost:3000/check-health");
  const json = await res.json();
  console.log("check-health-API", json);
};

const listTodos = ref([]);

const stateName = ref("");
const stateDescription = ref("");

const updateListTodos = async () => {
  const data = await serviceTodos.getList();
  listTodos.value = data.data;
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
  checkHealthApi();
  controllerTodoList.updateListTodos();
});
</script>

<template>
  <HelloWorld />
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

    <button @click="controllerTodoList.deleteByIdTodo(item.id)">Delete</button>
  </div>
</template>
