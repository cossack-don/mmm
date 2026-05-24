<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <v-sheet class="pa-4" color="grey-lighten-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

        <div>john@google.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in listProjects"
          :key="item.icon"
          :prepend-icon="item.icon"
          :title="item.name"
          link
          :to="item.link"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in baseLinks"
          :key="item.icon"
          :prepend-icon="item.icon"
          :title="item.name"
          link
          :to="item.link"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in listLinks"
          :key="item.icon"
          :prepend-icon="item.icon"
          :title="item.name"
          link
          :to="item.link"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Колесо баланса</v-app-bar-title>
      <v-btn @click="theme.toggle()" text="Toggle Light / Dark"></v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
import { ref } from 'vue';

const drawer = ref(true);
const theme = useTheme();

const listProjects = [
  {
    id: 1,
    name: 'Проекты',
    icon: 'mdi-folder-multiple',
    link: 'projects',
  },
];
const baseLinks = [
  {
    id: 1,
    name: 'Дашборд',
    icon: 'mdi-view-dashboard',
    link: 'dashboard',
  },
  {
    id: 2,
    name: 'Дела на год',
    icon: 'mdi-calendar-today',
    link: 'case-year',
  },
  {
    id: 3,
    name: 'Дела на неделю',
    icon: 'mdi-calendar-week',
    link: 'case-week',
  },
  {
    id: 4,
    name: 'Заметки',
    icon: 'mdi-note-multiple',
    link: 'todos',
  },
  {
    id: 5,
    name: 'Финансы',
    icon: 'mdi-finance',
    link: 'finances',
  },
];
const listLinks = [
  {
    id: 6,
    name: 'Духовность',
    icon: 'mdi-meditation',
    link: 'spirituality',
  },
  {
    id: 7,
    name: 'Отдых',
    icon: 'mdi-beach',
    link: 'relax',
  },
  {
    id: 8,
    name: 'Отношения',
    icon: 'mdi-account-heart',
    link: 'relationship',
  },
  {
    id: 9,
    name: 'Обучение',
    icon: 'mdi-school',
    link: 'schooling',
  },
  {
    id: 10,
    name: 'Здоровье',
    icon: 'mdi-heart-pulse',
    link: 'health',
  },
  {
    id: 11,
    name: 'Окружение',
    icon: 'mdi-account-group',
    link: 'environment',
  },
  {
    id: 12,
    name: 'Призвание',
    icon: 'mdi-target',
    link: 'vocation',
  },
];
</script>
