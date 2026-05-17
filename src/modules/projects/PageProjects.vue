<script setup lang="ts">
import { onMounted, onUpdated, ref } from "vue";
import { serviceTodos } from "../../api/serviceTodos";
import { projectService } from "../../api";
import { LifeCyclePage, ErrorPage, DefaultPage } from "../../components/pages";
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

const listProjects = ref([]);
const getListProjects = async () => {
  const { data } = await projectService.getList();
  listProjects.value = data;
  setStatusLifeCycle("isSuccess", true);
};

const nameProject = ref("");
const createProject = async () => {
  await projectService.createProject(nameProject.value);
  await getListProjects();
};

const deleteByIdProject = async (id: number | string) => {
  await projectService.deleteById(id);
  await getListProjects();
};
onMounted(() => {
  getListProjects();
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
      <button @click="createProject">create project</button>
      <input type="text" v-model="nameProject" />

      <div
        v-for="item in listProjects"
        :key="item.id"
        style="
          display: block;
          background: greenyellow;
          padding: 15px;
          margin-bottom: 20px;
        "
      >
        <router-link :to="`/project/${item.id}/`">
          <p>ID: {{ item.id }}</p>
          <p>Name: {{ item.name }}</p>
        </router-link>

        <button @click="deleteByIdProject(item.id)">del</button>
      </div>
    </template>

    <template #else> <DefaultPage /></template>
  </LifeCyclePage>
</template>
