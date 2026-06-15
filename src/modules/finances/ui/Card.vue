<template>
  <div
    class="app-card"
    :class="[`app-card--${variant}`, { 'app-card--clickable': clickable }]"
    @click="onClick"
  >
    <!-- Шапка -->
    <div v-if="$slots.header" class="app-card__header">
      <slot name="header" />
    </div>

    <!-- Тело (основной контент) -->
    <div v-if="$slots.default" class="app-card__body">
      <slot />
    </div>

    <!-- Подвал -->
    <div v-if="$slots.footer" class="app-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'outlined' | 'elevated';
    clickable?: boolean;
  }>(),
  {
    variant: 'default',
    clickable: false,
  }
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

function onClick(event: MouseEvent) {
  if (props.clickable) {
    emit('click', event);
  }
}
</script>

<style scoped>
.app-card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
}

/* Варианты */
.app-card--default {
  border: 1px solid #e0e0e0;
}

.app-card--outlined {
  border: 2px solid #e0e0e0;
  box-shadow: none;
}

.app-card--elevated {
  border: none;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.06);
}

/* Кликабельность */
.app-card--clickable {
  cursor: pointer;
}

.app-card--clickable:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* Секции */
.app-card__header {
  padding: 16px 20px 0 20px;
}

.app-card__body {
  padding: 16px 20px;
}

.app-card__footer {
  padding: 0 20px 16px 20px;
  border-top: 1px solid #f0f0f0;
  margin-top: auto;
}
</style>
