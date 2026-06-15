<template>
  <button
    class="app-button"
    :class="[
      `app-button--${variant}`,
      `app-button--${size}`,
      { 'app-button--block': block, 'app-button--disabled': disabled },
    ]"
    :disabled="disabled"
    v-bind="$attrs"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    block?: boolean;
    disabled?: boolean;
  }>(),
  {
    variant: 'primary',
    size: 'md',
    block: false,
    disabled: false,
  }
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

function onClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}
</script>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.1s;
  outline: none;
  white-space: nowrap;
}

.app-button:active:not(.app-button--disabled) {
  transform: scale(0.97);
}

/* Размеры */
.app-button--sm {
  padding: 6px 14px;
  font-size: 13px;
}

.app-button--md {
  padding: 10px 20px;
  font-size: 14px;
}

.app-button--lg {
  padding: 14px 28px;
  font-size: 16px;
}

/* Блочный */
.app-button--block {
  width: 100%;
}

/* Primary — зелёный (как акценты в карточках) */
.app-button--primary {
  background: #4caf50;
  color: #fff;
  border-color: #4caf50;
}

.app-button--primary:hover:not(.app-button--disabled) {
  background: #43a047;
  border-color: #43a047;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

/* Secondary — синий */
.app-button--secondary {
  background: #2196f3;
  color: #fff;
  border-color: #2196f3;
}

.app-button--secondary:hover:not(.app-button--disabled) {
  background: #1976d2;
  border-color: #1976d2;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
}

/* Outline — обводка */
.app-button--outline {
  background: transparent;
  color: #4caf50;
  border-color: #4caf50;
}

.app-button--outline:hover:not(.app-button--disabled) {
  background: #4caf50;
  color: #fff;
}

/* Ghost — прозрачная */
.app-button--ghost {
  background: transparent;
  color: #666;
  border-color: transparent;
}

.app-button--ghost:hover:not(.app-button--disabled) {
  background: #f5f5f5;
  color: #333;
}

/* Disabled */
.app-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
