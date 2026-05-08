<template>
  <div class="dropdown">
    <button @click="isOpen = !isOpen" class="dropdown-trigger">
      <span class="arrow">{{ isOpen ? "▲" : "▼" }}</span>
    </button>

    <div v-if="isOpen" class="dropdown-menu">
      <div
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="dropdown-item"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [
      { label: "Удалить", value: 1, id: 1 },
      { label: "Редактировать", value: 2, id: 2 },
    ],
  },
});

const emit = defineEmits(["onClick"]);

const isOpen = ref(false);
const selected = ref(null);

const selectOption = (paylod) => {
  isOpen.value = false;
  emit("onClick", paylod);
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  width: 20px;
  height: 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  //min-width: 150px;
  justify-content: center;
}

.dropdown-trigger:hover {
  background-color: #2563eb;
}

.arrow {
  font-size: 10px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  z-index: 1000;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}
</style>
