<template>
  <header class="app-header">
    <router-link to="/">LOGO</router-link>
    <div>
      Ценность проект - знаю, что проседает и фокус на важных вещах в 1
      приложение
    </div>
    <div>Название - Колесо баланса по модулям</div>
    <div>Практика Vue Query либы</div>
    <div>Важные модули - дела на месяц | неделю и год | финансы</div>

    <div>
      Vue Query | Vue DevTools | Axios | Router | Vue | TS | Nest.js API +
      Swagger
    </div>

    <div>потом добавить play write or cypress from E2E</div>

    <div style="display: flex; align-items: center; justify-content: center">
      <Card style="background: #b4ea49; font-weight: bold">
        <template #default>
          <p>
            Цели жизни сейчас: 1) Своя Квартира 1-шка LVL_1 2) Пассивный доход в
            месяц
          </p>
        </template>
      </Card>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  background-color: #dbf1c8;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
<script setup lang="ts">
import { Card } from "../../components/ui";
</script>
