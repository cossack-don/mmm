<template>
  <div class="text-h5 mb-4 text-center">Лесенка по сбережениям</div>

  <v-table>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td class="font-weight-bold">{{ rowIndex + 1 }}</td>
        <td
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          :style="{ backgroundColor: getCellColor(rowIndex, colIndex) }"
          class="text-center"
        >
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', 'ИИС3 (FRIZ) - 0.000.000', 'из 0.000.000'],
  ['', '', '', '', 'Брокер счет 0.000.000', 'из 0.000.000', '30% + 55% + 15%'],
  [
    '',
    '',
    '',
    'Вклады 000.000',
    'из 0.000.000',
    'Разбить на 000 + 000 + 000',
    '',
  ],
  ['', '', 'Резерв счет 000.000', 'из 000.000', '', '', ''],
  ['', 'Кредитка 0.000.000', 'из 0.000.000', '', '', '', ''],
  ['Наличные 000.000', 'из 000.000', ' + 000 $ лежит', '', '', '', ''],
]);

// Цвета для "лесенки" (диагональные ячейки)

// Цвета для "лесенки" снизу вверх
const colors = [
  '#42A5F5', // синий (верхняя ступенька)
  '#66BB6A', // зелёный
  '#FFCA28', // жёлтый
  '#FF7043', // оранжевый
  '#FF5252', // красный (нижняя ступенька)
  '#FF3252',
  '#FFCE56',
];

const getCellColor = (rowIndex, colIndex) => {
  // Лесенка снизу вверх: rowIndex + colIndex === data.length - 1
  if (rowIndex + colIndex === data.value.length - 1) {
    return colors[rowIndex];
  }
  // Остальные ячейки - светлый фон
  return '#F5F5F5';
};
</script>

<style scoped>
/* Плавные переходы */
tbody tr {
  transition: transform 0.2s ease;
}

tbody tr:hover {
  transform: scale(1.01);
  filter: brightness(0.98);
}

/* Стиль таблицы */
.v-table {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
