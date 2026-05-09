<template>
  <div>
    <Card>
      <template #default>
        <ul>
          <li style="font-weight: bold">Цели на месяц</li>
          <li v-for="item in list" :key="item.id">{{ item.name }}</li>
        </ul>
      </template>
    </Card>

    <div style="display: flex; overflow: scroll; width: 1400px">
      <Card v-for="day in 7" :key="day" styles="width: 100%">
        <template #default>
          <ul>
            <li>
              <strong>{{ getDayName(day) }}</strong>
            </li>

            <li v-for="item in getItemsByDay(day)" :key="item.id">
              {{ item.name }}
            </li>
            <li v-if="getItemsByDay(day).length === 0" style="color: gray">
              Нет задач
            </li>
          </ul>
        </template>
      </Card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { serviceCaseYear } from "./api";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { serviceCaseWeek } from "./api/services";
import { Modal, Card, Button, DropDown } from "./components/ui";

const route = useRoute();

const listWeek = ref([]);
const getListWeek = async () => {
  const { data } = await serviceCaseWeek.getList(route.params.idProject);
  listWeek.value = data;
};

const list = ref([]);
const getList = async () => {
  const { data } = await serviceCaseYear.getList(route.params.idProject);

  const res = data.filter((item) => {
    if (new Date().getMonth() + 1 === item.month) {
      return item;
    }
  });
  list.value = res;
};

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
  return listWeek.value.filter((item) => item.day === day);
};

onMounted(() => {
  getList();
  getListWeek();
});
</script>
