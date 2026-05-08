<template>
  <h4>Финансы</h4>

  <h5>На месяц Расходы / Доходы</h5>
  <Card
    :styles="{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    }"
  >
    <template #default>
      <Card>
        <template #default>
          <ul>
            <li style="font-weight: bold">Доходы:</li>

            <li>5-е число -</li>
            <li>20-е число -</li>
            <li>Доходы с инвестиций</li>
          </ul>
        </template>
      </Card>

      <Card>
        <template #default>
          <ul>
            <li style="font-weight: bold">Расходы</li>

            <li>5-е число = 80 000 + ЖКХ Алевтина</li>
            <li>5-е число 3-и интернета 3 000</li>
            <li>5-е число = 40 000 откладывать на инвестиции</li>
            <li>5-е число = личные расходы 20 000</li>

            <li>20-е число = 30 000 СБЕР Ипотека</li>
            <li>20-е число = 60 000 откладывать на инвестиции</li>
            <li>20-е число = личные расходы 20 000</li>

            <li>Психолог 4 занятия в месяц = 4 500 * 4 = 18 000</li>
            <li>Речь 4 занятия в месяц = 2500 * 4 = 10 000</li>
          </ul>
        </template>
      </Card>

      <Card>
        <template #default>
          <ul>
            <li style="font-weight: bold">Допы.</li>

            <li>15-е число ВТБ Ипотека 25 000</li>
            <li>30-е число ЖКХ Краснодар</li>
            <li>Страховка - 1</li>
            <li>Страховка - 2</li>
            <li>Налог - в ноябре</li>
          </ul></template
        >
      </Card>
    </template>
  </Card>

  <Card>
    <template #default>
      Общая Лестница финансов

      <Chart />
    </template>
  </Card>

  <Card>
    <template #default> Прогноз сколько могу откладывать </template>
  </Card>

  <Card>
    <template #default> Инвестиции - подробнее и активы </template>
  </Card>
</template>

<script setup lang="ts">
import { Modal, Card, Button } from "./components/ui";
import Chart from "./components/charts/Chart.vue";
</script>
<script setup lang="ts"></script>
