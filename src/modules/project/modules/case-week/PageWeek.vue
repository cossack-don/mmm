<template>
  <div>
    <Card>
      <template #default>
        <ul>
          <li style="font-weight: bold">Цели на месяц</li>
          <li v-for="item in mapMonth" :key="item.id">{{ item.name }}</li>
        </ul>
      </template>
    </Card>

    <Button @click="openModal">Создать задачу</Button>

    <div style="display: flex; overflow: scroll; width: 600px; height: 1000px">
      <Card v-for="day in 7" :key="day" :styles="{ minWidth: '350px' }">
        <template #default>
          <ul>
            11
            <li>
              <strong>{{ getDayName(day) }}</strong>
            </li>

            <li v-for="item in getItemsByDay(day)" :key="item.id">
              {{ item.name }}

              <Button @click="onDeleteByIdTaskDay(item.id)">DEL</Button>
            </li>
            <li v-if="getItemsByDay(day).length === 0" style="color: gray">
              Нет задач
            </li>
          </ul>
        </template>
      </Card>
    </div>

    <Modal
      v-model="isModalOpen"
      title="Создание задачи"
      @confirm="onCreateTaskDay"
    >
      <div style="display: flex">
        <p style="margin-right: 10px">Название задачи</p>
        <input v-model="stateFormTaskWeek.name" placeholder="Название задачи" />
      </div>

      <div style="display: flex">
        <p style="margin-right: 10px">День</p>
        <input
          style="width: 200px"
          :min="0"
          :max="7"
          type="number"
          v-model.number="stateFormTaskWeek.day"
          placeholder="День"
        />
      </div>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Modal, Card, Button } from "@components-ui";
import {
  caseWeekGetQuery,
  caseWeekPostQuery,
  caseWeekDeleteQuery,
} from "./query";
import { useMutation, useQuery } from "@tanstack/vue-query";

const route = useRoute();
const stateFormTaskWeek = ref({ name: "", day: 1 });

const { data: listWeek } = useQuery(caseWeekGetQuery.GET_LIST(route));
const { mutate: createTaskWeek } = useMutation(caseWeekPostQuery.POST());
const { mutate: deleteByIdTaskWeek } = useMutation(
  caseWeekDeleteQuery.DELETE(),
);

const { data: mapMonth } = useQuery(caseWeekGetQuery.GET_MONTH(route));

const onDeleteByIdTaskDay = (id: number) => {
  deleteByIdTaskWeek({
    idProject: route.params.idProject,
    idTask: id,
  });
};

const onCreateTaskDay = () => {
  if (stateFormTaskWeek.value.name === "") return;

  createTaskWeek({
    idProject: route.params.idProject,
    name: stateFormTaskWeek.value.name,
    day: stateFormTaskWeek.value.day,
  });

  stateFormTaskWeek.value.name = "";
  stateFormTaskWeek.value.day = 1;
};

const isModalOpen = ref(false);
const openModal = () => (isModalOpen.value = true);

// Функция для получения названия дня недели
const getDayName = (dayNumber) => {
  const days = {
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
    7: "Воскресенье",
  };
  return days[dayNumber] || "Неизвестный день";
};

const getItemsByDay = (day) => {
  if (!listWeek.value || !Array.isArray(listWeek.value)) {
    return [];
  }
  return listWeek.value.filter((item) => item.day === day);
};
</script>
