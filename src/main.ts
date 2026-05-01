import { createApp } from "vue";
import "./style.css";
import App from "./app/App.vue";
import { router } from "./router/createRouter";
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);
app.mount("#app");
