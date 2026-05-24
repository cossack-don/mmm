// App Vue
import { createApp } from 'vue';

// Vuetify
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import { vuetify, queryClient, router } from './configs';

// Components and style app
import App from './App.vue';
// import "./style.css";

import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.mount('#app');
