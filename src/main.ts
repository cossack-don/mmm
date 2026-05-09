import { createApp } from "vue";
import "./style.css";
import App from "./app/App.vue";
import { router } from "./router/createRouter";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

const app = createApp(App);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // 5 минут
      gcTime: 0, // 10 минут
      // taleTime: 5 * 60 * 1000, // 5 минут
      // gcTime: 10 * 60 * 1000, // 10 минут
      retry: false,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      enabled: true,
      networkMode: "online",
      throwOnError: false,
    },
    // mutations: {
    //   retry: 1,
    // },
  },
});

app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.mount("#app");
