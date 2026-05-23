import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import path from "path";

export default defineConfig({
  plugins: [
    // DOCS - https://devtools.vuejs.org/
    vueDevTools(
      {
        // Опциональные настройки
        componentInspector: true,  // Включить инспектор компонентов
        launchEditor: 'code',    // Редактор по умолчанию
        openInEditorHost: 'http://localhost:5173', // Хост для открытия редактора
      }
    ),
    vue()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@api": path.resolve(__dirname, "./src/api"),

      "@project": path.resolve(__dirname, "./src/modules/project/modules"),

      "@components-ui": path.resolve(__dirname, "./src/components/ui"),
      "@components-pages": path.resolve(__dirname, "./src/components/pages"),

      "@constants": path.resolve(__dirname, "./src/constants"),
      "@composables": path.resolve(__dirname, "./src/composables"),
    },
  },
});
