<!--<template>-->
<!--  <BaseHeader />-->
<!--  <main style="background-color: red">-->
<!--    <slot />-->
<!--  </main>-->
<!--  <BaseNavigation />-->
<!--</template>-->
<!--<script setup lang="ts">-->
<!--import { BaseHeader, BaseNavigation } from "./ui";-->
<!--</script>-->

<!--<style scoped></style>-->

<template>
  <div class="layout">
    <BaseHeader class="header" />

    <BaseNavigation class="navigation" />

    <main class="content" style="background-color: red">
      <div class="content-wrapper">
        <BreadCrumbs class="breadcrumbs" />
        <div class="page-content">
          <slot />
        </div>
      </div>
    </main>

    <!--    <BaseFooter class="footer" />-->
  </div>
</template>

<script setup lang="ts">
import { BaseHeader, BaseNavigation, BaseFooter, BreadCrumbs } from "./ui";
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "nav content"
    "footer footer";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  overflow: hidden;
}

.header {
  grid-area: header;
}

.navigation {
  grid-area: nav;
  overflow-y: auto;
  position: sticky;
  top: 0;
  align-self: start;
}

.content {
  grid-area: content;
  overflow-y: auto;
}

/* Внутренний контейнер для контента с отступами */
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

/* Хлебные крошки сверху */
.breadcrumbs {
  margin-bottom: 20px;
  flex-shrink: 0;
}

/* Основной контент (центрируется, если нужно) */
.page-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* Для центрирования содержимого раскомментируйте: */
  /* justify-content: center; */
  /* align-items: center; */
}

.footer {
  grid-area: footer;
  flex-shrink: 0;
}
</style>
