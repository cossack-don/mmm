<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler
);

const monthNames = [
  'Янв',
  'Фев',
  'Мар',
  'Апр',
  'Май',
  'Июн',
  'Июл',
  'Авг',
  'Сен',
  'Окт',
  'Ноя',
  'Дек',
];

const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

const props = withDefaults(
  defineProps<{
    excellentStart?: number;
    excellentStep?: number;
    badStart?: number;
    badStep?: number;
    averageStart?: number;
    averageStep?: number;
  }>(),
  {
    excellentStart: 100,
    excellentStep: 50,
    badStart: 80,
    badStep: 15,
    averageStart: 20,
    averageStep: 35,
  }
);

const labels = computed(() => {
  const result: string[] = [];
  for (let i = 0; i < 12; i++) {
    const m = (currentMonth + i) % 12;
    const y = currentYear + Math.floor((currentMonth + i) / 12);
    result.push(`${monthNames[m]} ${y}`);
  }
  return result;
});

const excellentData = computed(() =>
  labels.value.map((_, i) => props.excellentStart + props.excellentStep * i)
);

const badData = computed(() =>
  labels.value.map((_, i) => props.badStart + props.badStep * i)
);

const averageData = computed(() =>
  labels.value.map((_, i) => props.averageStart + props.averageStep * i)
);

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Отличный прогноз',
      data: excellentData.value,
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
    },

    {
      label: 'Средний прогноз',
      data: averageData.value,
      borderColor: '#2196F3',
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      label: 'Плохой прогноз',
      data: badData.value,
      borderColor: '#f44336',
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: `Прогнозы (${currentYear} — ${currentYear + 1})`,
      font: { size: 16 },
      color: '#333',
    },
    legend: {
      position: 'bottom' as const,
      labels: {
        font: { size: 12 },
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: '#333',
      titleFont: { size: 13 },
      bodyFont: { size: 12 },
      padding: 10,
      cornerRadius: 6,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 11 } },
    },
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(0,0,0,0.06)' },
      ticks: { font: { size: 11 } },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
};
</script>

<style scoped>
canvas {
  max-height: 400px;
}
</style>
