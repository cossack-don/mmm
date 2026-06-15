<script setup lang="ts">
import Chart from './Chart.vue';
import AppCard from './Card.vue';
import IncomeCard from './ListCards.vue';
import { useFinance, subtractPercent } from '../useFinances';
import { ref, computed } from 'vue';
import InfoBanner from './Banner.vue';
import AppButton from './Button.vue';
import DashboardGrid from './Grid.vue';

//Доход 5-е incomes
const totalSumFiveIncomes = ref(0);
const updateTotalSumFiveIncomes = (val: number) =>
  (totalSumFiveIncomes.value = val);
const listFiveIncomes = ref<(string | number)[]>(['260000']);
const listLabelsFiveIncomes = ref(['Зарплата']);

function onFieldsChange(values: (string | number)[]) {
  listFiveIncomes.value = values;
}

//Расход 5-е cost
const totalSumFiveCosts = ref(0);
const updateTotalSumFiveCosts = (val: number) =>
  (totalSumFiveCosts.value = val);
const listLabelsFiveCosts = ref([
  'Съем',
  'ЖКХ Съем',
  'Личные расходы',
  'Интернет',
]);

const listFiveCosts = ref<(string | number)[]>([
  '80000',
  '3000',
  '20000',
  '3000',
]);
function onFieldsChange2(values: (string | number)[]) {
  listFiveCosts.value = values;
}

/////

//Доход 20-е incomes
const totalSumTwentyIncomes = ref(0);
const updateTotalSumTwentyIncomes = (val: number) =>
  (totalSumTwentyIncomes.value = val);
const listLabelsTwentyIncomes = ref(['Зарплата']);

const listTwentyIncomes = ref(['145000']);
function onFieldsChange3(values: (string | number)[]) {
  listTwentyIncomes.value = values;
}

//Расход 20-е cost
const totalSumTwentyCosts = ref(0);
const updateTotalSumTwentyCosts = (val: number) =>
  (totalSumTwentyCosts.value = val);

const listLabelsTwentyCosts = ref(['Ипотека', 'Личные расходы']);
const listTwentyCosts = ref(['30000', '20000']);
function onFieldsChange4(values: (string | number)[]) {
  listTwentyCosts.value = values;
}

const topPrognosis = computed(() => {
  const resultIncomes = [...listFiveIncomes.value, ...listTwentyIncomes.value];
  const resultCosts = [...listFiveCosts.value, ...listTwentyCosts.value];
  const calcResultClearSum = useFinance(resultIncomes, resultCosts);
  const topPrognosis = calcResultClearSum; // 100%

  return topPrognosis;
});

const middlePrognosis = computed(() => {
  const resultIncomes = [...listFiveIncomes.value, ...listTwentyIncomes.value];
  const resultCosts = [...listFiveCosts.value, ...listTwentyCosts.value];
  const calcResultClearSum = useFinance(resultIncomes, resultCosts);
  const middlePrognosis = subtractPercent(calcResultClearSum, 25); // 25%

  return middlePrognosis;
});

const lowPrognosis = computed(() => {
  const resultIncomes = [...listFiveIncomes.value, ...listTwentyIncomes.value];
  const resultCosts = [...listFiveCosts.value, ...listTwentyCosts.value];
  const calcResultClearSum = useFinance(resultIncomes, resultCosts);
  const lowPrognosis = subtractPercent(calcResultClearSum, 50); //50%

  return lowPrognosis;
});

//Общая сумма за месяц (доход минус расход)
//const resultIncomes = [...listFiveIncomes.value,...listTwentyIncomes.value]

//const resultCosts = [...listFiveCosts.value,...listTwentyCosts.value]
//console.log(resultIncomes,resultCosts)

//Итоговая сумма остатка денег
//const calcResultClearSum = useFinance(resultIncomes, resultCosts)
//console.log(calcResultClearSum)

//для прогноза. от суммы вычитаю какой-то процент чтобы рисовалась разная доходность
//const topPrognosis = calcResultClearSum // 100%
//const middlePrognosis = subtractPercent(calcResultClearSum, 25) // 25%
//const lowPrognosis = subtractPercent(calcResultClearSum, 50) //50%

const excellentStart = ref(topPrognosis.value);
const excellentStep = ref(topPrognosis.value);

const badStart = ref(middlePrognosis.value);
const badStep = ref(middlePrognosis.value);

const averageStart = ref(lowPrognosis.value);
const averageStep = ref(lowPrognosis.value);

function onTotalChange(val: number, val2, val3) {
  // Можно обновить стартовые значения для графика
  excellentStart.value = val;
  excellentStep.value = val;

  badStart.value = val2;
  badStep.value = val2;

  averageStart.value = val3;
  averageStep.value = val3;
}

function rebuildChart() {
  //exapmle
  //console.log(cacal.value)
  onTotalChange(topPrognosis.value, middlePrognosis.value, lowPrognosis.value);
}

const calcClearSumFive = computed(() => {
  const res = totalSumFiveIncomes.value - totalSumFiveCosts.value;
  return res.toLocaleString('ru-RU');
});

const calcClearSumTwenty = computed(() => {
  const res = totalSumTwentyIncomes.value - totalSumTwentyCosts.value;

  return res.toLocaleString('ru-RU');
});
</script>

<template>
  <DashboardGrid>
    <template #chart>
      <Chart
        style="width: 300px"
        :excellent-start="excellentStart"
        :excellent-step="excellentStep"
        :bad-start="badStart"
        :bad-step="badStep"
        :average-start="averageStart"
        :average-step="averageStep"
      />
    </template>

    <template #banner>
      <InfoBanner icon="ℹ️">
        1. Суммы указаны и рассчитаны с 13% налогом, без пересчета по выше шкале
        <br />
        2. При создание нового поля и введение суммы, нет автоматического
        перерасчета графика - нужна кнопка рассчета<br />
        3. -
      </InfoBanner>

      <AppButton @click="rebuildChart" variant="secondary"
        >Рассчитать</AppButton
      >
    </template>

    <template #half-1>
      <InfoBanner variant="success">
        <div class="income-card__total">
          Итого 5-е остаток: <strong>{{ calcClearSumFive }}</strong>
        </div>
      </InfoBanner>
      <AppCard> </AppCard>
    </template>

    <template #half-2>
      <InfoBanner variant="success">
        <div class="income-card__total">
          Итого 20-е остаток: <strong>{{ calcClearSumTwenty }}</strong>
        </div>
      </InfoBanner>
    </template>

    <template #slot-1>
      <IncomeCard
        @update:fields="onFieldsChange"
        @update:total="updateTotalSumFiveIncomes"
        :initial-values="listFiveIncomes"
        :field-labels="listLabelsFiveIncomes"
        title="Мои доходы 5-е"
      />
    </template>

    <template #slot-2>
      <IncomeCard
        @update:fields="onFieldsChange2"
        @update:total="updateTotalSumFiveCosts"
        :field-labels="listLabelsFiveCosts"
        :initial-values="listFiveCosts"
        title="Мои расходы 5-е"
      />
    </template>

    <template #slot-3>
      <IncomeCard
        @update:fields="onFieldsChange3"
        @update:total="updateTotalSumTwentyIncomes"
        title="Мои доходы 20-е"
        :initial-values="listTwentyIncomes"
        :field-labels="listLabelsTwentyIncomes"
      />
    </template>

    <template #slot-4>
      <IncomeCard
        @update:fields="onFieldsChange4"
        @update:total="updateTotalSumTwentyCosts"
        title="Мои расходы 20-е"
        :initial-values="listTwentyCosts"
        :field-labels="listLabelsTwentyCosts"
      />
    </template>
  </DashboardGrid>
</template>

<style scoped>
.income-card__total {
  font-size: 16px;
  color: #333;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 12px;
}

.income-card__total strong {
  color: #4caf50;
  font-size: 20px;
}
</style>
