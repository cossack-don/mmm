<script setup lang="ts">
import { routes } from "../../router/routes";
import { computed } from "vue";

const listNavigation = computed(() => {
  const res = routes.find((item) => {
    if (item.name === "project") {
      console.log(item, 333);
      return item.children?.map((child) => child?.meta?.nameRu !== null);
    }
    // item[1]
  });
  console.log(res, 123);
  return res.children;
});
</script>

<template>
  <div class="app-navigation">
    <router-link class="link" v-for="item in listNavigation" :to="item.path">
      {{ item.meta.nameRu }}
    </router-link>
  </div>
</template>

<style scoped>
.app-navigation {
  display: flex;
  flex-direction: column;
  width: 300px;
  background: #a50f0f;
  border-radius: 5px;
  padding: 10px;
  margin-right: 20px;
}

.link {
  background: #d35aee;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
}

.router-link-active.router-link-exact-active.link {
  color: #db345b !important;
}
</style>
