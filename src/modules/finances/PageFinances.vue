<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="12" class="mx-auto">
          <TableFinance />
        </v-col>
        <v-col cols="3" md="3" class="">
          <v-card>
            <ul style="padding: 15px">
              <li>
                <span class="font-weight-bold"> Условия жизни </span>
              </li>

              <li
                style="padding: 3px"
                v-for="item in mockListFinanceCost"
                :key="item.id"
              >
                <span style="font-size: 0.75rem"> {{ item.name }}</span>
              </li>
            </ul>
          </v-card>
        </v-col>

        <v-col cols="3" md="3" class="">
          <v-card>
            <ul style="padding: 15px">
              <li>
                <span class="font-weight-bold"> L </span>
              </li>

              <li style="padding: 3px" v-for="item in mockL" :key="item.id">
                <span style="font-size: 0.75rem"> {{ item.name }}</span>
              </li>
            </ul>
          </v-card>
        </v-col>

        <v-col cols="3" md="3" class="">
          <v-card>
            <ul style="padding: 15px">
              <li>
                <span class="font-weight-bold"> Налоги </span>
              </li>

              <!-- <li
                style="padding: 3px"
                v-for="item in mockListFinanceCost"
                :key="item.id"
              >
                <span style="font-size: 0.75rem"> {{ item.name }}</span>
              </li> -->
            </ul>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <h3>* Финансы</h3>
    <h3>* Доход</h3>
    <h3>* Налоги</h3>
    <h3>* Сбережения</h3>
    <h3>* Условия жизни</h3>

    <h5 style="text-align: center">
      Всего - {{ allSum.toLocaleString('ru-RU') }}
    </h5>
    <hr />
    <div style="display: flex; align-items: center; justify-content: center">
      <Card>
        <template #default>
          <h4>
            Не замороженная сумма - {{ calcSumClear.toLocaleString('ru-RU') }}
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
          <h4>Замороженная сумма - {{ calcSum.toLocaleString('ru-RU') }}</h4>
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

    <h2>Сделать таблицу с Облигациями</h2>
    <h2>Сделать таблицу с Акциями</h2>
    <h2>Забивать туда данные по моему портфелю брокер + ИИС и фильтрации</h2>
  </div>
</template>
<script setup lang="ts">
const mockListFinanceCost = [
  { id: 1, name: '5-e Зарплата' },
  { id: 2, name: '20-e Зарплата' },
  { id: 3, name: '5-e Съемная квартира = 80.000 + 3.000' },
  { id: 4, name: '5-e & 20-e Личные расходы = 20.000 + 20.000' },
  { id: 5, name: '20-e Ипотека Реутов = 30.000' },
  { id: 6, name: '5-e Интернет = 3.000' },
  { id: 7, name: '5-e & 20-e Инвестиции = 60.000 + 40.000' },
  { id: 7, name: '__________________________' },
  { id: 7, name: '10-e Страховка Реутов = Январь 30.000' },
  { id: 7, name: 'Страховка Реутов 2 = нету' },
  { id: 7, name: 'Налог Реутов = нету' },
];

const mockL = [
  { id: 3, name: '15-e Ипотека -> Краснодар = 23.000' },
  { id: 4, name: '30-e ЖКХ -> Краснодар = 5.000' },
  { id: 5, name: '1 августа 2026 -> Страховка Краснодар-1 = ???' },
  { id: 6, name: 'до 23 октября 2026 -> Страховка Краснодар-2 = ???' },
  { id: 7, name: 'с 1 ноября -> Налог' },
];

import { TableFinance } from './ui';
import { Card, Button } from '@components-ui';
import { Pie } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { computed } from 'vue';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
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
  labels: ['Наличные', 'Резерв счета', 'Вклады', 'Брокер счет'],
  datasets: [
    {
      data: data21,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
      ],
    },
  ],
};

const data2 = [...list_4, ...list_3];
const chartData2 = {
  labels: ['Кредитка', 'ИИС3'],
  datasets: [
    {
      data: data2,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
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
      color: 'white', // цвет текста
      textAlign: 'center',
      font: {
        weight: 'bold',
        size: 16,
      },
      // Что именно показывать: значение, процент или и то, и другое
      formatter: (value: number, context: any) => {
        console.log(value, context);
        // Показываем только числовое значение
        return value.toLocaleString('ru-RU'); // "10 000"

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
