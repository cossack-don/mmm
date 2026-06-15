<template>
  <div class="app-input-wrapper" :class="{ 'app-input-wrapper--error': error }">
    <label v-if="label" :for="inputId" class="app-input-label">{{
      label
    }}</label>
    <input
      :id="inputId"
      :type="inputType"
      :value="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      class="app-input"
      :class="{
        'app-input--error': error,
        'app-input--disabled': disabled,
      }"
      v-bind="$attrs"
      :inputmode="isNumeric ? 'numeric' : undefined"
      @input="onInput"
      @blur="onBlur"
    />
    <span v-if="error" class="app-input-error">{{ error }}</span>
    <span v-else-if="hint" class="app-input-hint">{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    label?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    error?: string;
    hint?: string;
  }>(),
  {
    modelValue: '',
    type: 'text',
    placeholder: '',
    disabled: false,
    readonly: false,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  blur: [event: FocusEvent];
}>();

let inputId = `app-input-${Math.random().toString(36).slice(2, 8)}`;

function formatNumber(val: string | number): string {
  const str = String(val).replace(/\s/g, '');
  if (str === '' || isNaN(Number(str))) return String(val);
  return Number(str).toLocaleString('ru-RU');
}

const isNumeric = computed(() => props.type === 'number');

const inputType = computed(() => (isNumeric.value ? 'text' : props.type));

const displayValue = computed(() => {
  if (isNumeric.value) {
    return formatNumber(props.modelValue);
  }
  return props.modelValue;
});

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const raw = target.value.replace(/\s/g, '');
  emit('update:modelValue', raw);
}

function onBlur(event: FocusEvent) {
  emit('blur', event);
}
</script>

<style scoped>
.app-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.app-input-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.app-input {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  background: #fff;
  color: #333;
}

.app-input:focus {
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.15);
}

.app-input--error {
  border-color: #f44336;
}

.app-input--error:focus {
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.15);
}

.app-input--disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.app-input-error {
  font-size: 12px;
  color: #f44336;
}

.app-input-hint {
  font-size: 12px;
  color: #888;
}
</style>
