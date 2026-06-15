<template>
  <div>
    <Widget />
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="12" class="mx-auto">
          <TableFinance />
        </v-col>
        <v-col cols="3" md="3" class="">
          <v-card> 1 </v-card>
        </v-col>

        <v-col cols="3" md="3" class="">
          <v-card> 2 </v-card>
        </v-col>

        <v-col cols="3" md="3" class="">
          <v-card> 3 </v-card>
        </v-col>
      </v-row>
    </v-container>

    <h3>* Финансы</h3>
    <h3>* Доход</h3>
    <h3>* Налоги</h3>
    <h3>* Сбережения</h3>
    <h3>* Условия жизни</h3>
  </div>
</template>
<script setup lang="ts">
import { TableFinance } from './ui';
import Widget from './ui/Widget.vue';
</script>
