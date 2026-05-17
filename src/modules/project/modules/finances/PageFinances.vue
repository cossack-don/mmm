<template>
  <div>
    <h3>* Финансы</h3>
    <h3>* Доход</h3>
    <h3>* Налоги</h3>
    <h3>* Сбережения</h3>
    <h3>* Условия жизни</h3>
    <ul>
      <li>Съемная квартира = 80 000 + ЖКХ</li>
      <li>Реутов Ипотека = 30 000</li>
      <li>Личные расходы = 40 000 (20 000 + 20 000)</li>
      <li>Инвестиции = 100 000 (60 000 + 40 000)</li>
      <li>Интернет = 3 000</li>
      <li></li>
      <li></li>
      <li>Страховка Реутов - Январь = 30 000</li>
    </ul>
    <hr />
    <ul>
      <li>= L =</li>
      <li>ВТБ Ипотека = 25 000</li>
      <li>ЖКХ Краснодар = 5 000</li>
      <li>Страховка 1 = до 1 августа 2026</li>
      <li>Страховка 2 = до 23 октября 2026</li>
      <li>Налог в ноябре</li>
    </ul>

    <hr />

    <h5 style="text-align: center">
      Всего - {{ allSum.toLocaleString("ru-RU") }}
    </h5>
    <hr />
    <div style="display: flex; align-items: center; justify-content: center">
      <Card>
        <template #default>
          <h4>
            Не замороженная сумма - {{ calcSumClear.toLocaleString("ru-RU") }}
          </h4>
          <div style="width: 500px; height: 300px">
            <Pie
              id="my-chart-2323id"
              :options="chartOptions"
              :data="chartData"
            />
          </div>
        </template>
      </Card>
      <Card>
        <template #default>
          <h4>Замороженная сумма - {{ calcSum.toLocaleString("ru-RU") }}</h4>
          <p style="font-size: 12px">Кредитная сумма не учитывается</p>
          <div style="width: 500px; height: 300px">
            <Pie id="my-chart-2d" :options="chartOptions" :data="chartData2" />
          </div>
        </template>
      </Card>
    </div>

    <Card>
      <template #default>
        <p>Прогноз дохода без инвестиций</p>
        <p>
          Входные данные: 1) ЗП-5 числа = ?? 2) ЗП-20 числа = ?? 3) Дистанция -
          1/2/3/4/5 года
        </p>
        <p>Суммировать ЗП1 + ЗП2</p>
      </template>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { Card, Button } from "../../../../components/ui";
import { Pie } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { computed } from "vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels,
);

const list_6 = [200_000]; // налик
const list_5 = [200_000]; // счета
const list_1 = [500_000]; // вклады
const list_2 = [2_500_000]; //брокер счет

const list_3 = [1_200_000]; // ИИС3
const list_4 = [1_000_000]; //кредитка

const data21 = [...list_6, ...list_5, ...list_1, ...list_2];

const allSum = computed(() => {
  return calcSumClear.value + calcSum.value;
});
const calcSumClear = computed(() => {
  return [list_6, list_5, list_1, list_2]
    .flat()
    .reduce((acc, val) => acc + val, 0);
});

const calcSum = computed(() => {
  return [list_3].flat().reduce((acc, val) => acc + val, 0);
});

const chartData = {
  labels: ["Наличные", "Резерв счета", "Вклады", "Брокер счет"],
  datasets: [
    {
      data: data21,
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
    },
  ],
};

const data2 = [...list_4, ...list_3];
const chartData2 = {
  labels: ["Кредитка", "ИИС3"],
  datasets: [
    {
      data: data2,
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    // НАСТРОЙКА ОТОБРАЖЕНИЯ ЗНАЧЕНИЙ
    datalabels: {
      color: "white", // цвет текста
      textAlign: "center",
      font: {
        weight: "bold",
        size: 16,
      },
      // Что именно показывать: значение, процент или и то, и другое
      formatter: (value: number, context: any) => {
        console.log(value, context);
        // Показываем только числовое значение
        return value.toLocaleString("ru-RU"); // "10 000"

        // Альтернативы (раскомментируйте нужное):

        // 1. Показать проценты:
        // const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
        // const percentage = ((value * 100) / total).toFixed(1);
        // return `${percentage}%`;

        // 2. Показать название + значение:
        // return `${context.chart.data.labels[context.dataIndex]}\n${value}`;
      },
    },
  },
};
</script>
