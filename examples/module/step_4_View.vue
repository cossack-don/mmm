<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { todoQuery } from "./step_3_todo.query";
import { useRoute } from "vue-router";

// TODO Подставляю данные в VIEW
const route = useRoute();
const { data, isPending } = useQuery(todoQuery.GET_LIST(route));

// TODO как быть когда несколько связанных запросов ?
// TODO как вынести бизнес логику когда несколько методов между собой работают? компособл ?
// TODO
</script>

<template>
  <div>{{ data }} - {{ isPending }}</div>
</template>
