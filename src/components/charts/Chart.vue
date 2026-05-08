<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    const data = [200, 200, 200, 500, 2800, 1200];
    return {
      chartData: {
        labels: [
          "Наличные",
          "Резерв счет",
          "Фонд Ликвидности",
          "Вклады",
          "Брокер счет",
          "ИИС3",
        ],
        datasets: [{ data: data }],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
};
</script>
