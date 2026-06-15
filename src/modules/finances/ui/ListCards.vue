<template>
  <AppCard
    variant="elevated"
    :class="['finance-card', `finance-card--${type}`]"
  >
    <template #header>
      <div class="finance-card__header">
        <h3>{{ title }}</h3>
        <span class="finance-card__count">{{ fields.length }}</span>
      </div>
    </template>

    <div class="finance-card__total">
      Общая сумма: <strong>{{ formattedTotal }}</strong>
    </div>

    <div class="finance-card__fields">
      <div
        v-for="(field, index) in fields"
        :key="field.id"
        class="finance-card__field-wrapper"
      >
        <AppInput
          v-model="field.value"
          :label="fieldLabels[index] || `Поле-${index + 1}`"
          type="number"
          placeholder="Введите сумму"
          class="finance-card__input"
        />
        <button
          class="finance-card__remove-btn"
          @click="removeField(index)"
          :disabled="fields.length === 1"
          title="Удалить поле"
        >
          ✕
        </button>
      </div>
    </div>

    <template #footer>
      <button class="finance-card__add-btn" @click="addField">
        + Добавить поле
      </button>
    </template>
  </AppCard>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import AppCard from './Card.vue';
import AppInput from './Input.vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    type?: 'income' | 'expense';
    initialValues?: (string | number)[];
    fieldLabels?: string[];
  }>(),
  {
    title: 'Доходы',
    type: 'income',
    initialValues: () => [''],
    fieldLabels: () => [],
  }
);

const emit = defineEmits<{
  'update:total': [value: number];
  'update:fields': [value: (string | number)[]];
}>();

interface FinanceField {
  id: number;
  value: string | number;
}

const fields = ref<FinanceField[]>(
  props.initialValues.map((val, i) => ({ id: i + 1, value: val }))
);

const total = computed(() => {
  return fields.value.reduce((sum, field) => {
    const val = Number(field.value);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
});

const formattedTotal = computed(() => total.value.toLocaleString('ru-RU'));

watch(
  total,
  (val) => {
    emit('update:total', val);
  },
  { immediate: true }
);

watch(
  fields,
  (val) => {
    emit(
      'update:fields',
      val.map((f) => f.value)
    );
  },
  { deep: true, immediate: true }
);

let nextId = fields.value.length + 1;

function addField() {
  fields.value.push({ id: nextId++, value: '' });
}

function removeField(index: number) {
  if (fields.value.length > 1) {
    fields.value.splice(index, 1);
  }
}
</script>

<style scoped>
.finance-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.finance-card__header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.finance-card__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
}

.finance-card__total {
  padding: 10px 0;
  font-size: 16px;
  color: #333;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 12px;
}

.finance-card__total strong {
  font-size: 20px;
}

.finance-card__fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.finance-card__field-wrapper {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.finance-card__input {
  flex: 1;
}

.finance-card__remove-btn {
  width: 36px;
  height: 36px;
  margin-bottom: 2px;
  background: none;
  border: 1px solid #f44336;
  border-radius: 6px;
  color: #f44336;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.finance-card__remove-btn:hover:not(:disabled) {
  background: #f44336;
  color: #fff;
  transform: scale(1.05);
}

.finance-card__remove-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.finance-card__add-btn {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}

/* Income card styles (green) */
.finance-card--income .finance-card__count {
  background: #4caf50;
  color: #fff;
}

.finance-card--income .finance-card__total strong {
  color: #4caf50;
}

.finance-card--income .finance-card__remove-btn {
  border-color: #f44336;
  color: #f44336;
}

.finance-card--income .finance-card__remove-btn:hover:not(:disabled) {
  background: #f44336;
  color: #fff;
}

.finance-card--income .finance-card__add-btn {
  color: #4caf50;
  border: 2px dashed #4caf50;
}

.finance-card--income .finance-card__add-btn:hover {
  background: #4caf50;
  color: #fff;
}

/* Expense card styles (red) */
.finance-card--expense .finance-card__count {
  background: #f44336;
  color: #fff;
}

.finance-card--expense .finance-card__total strong {
  color: #f44336;
}

.finance-card--expense .finance-card__remove-btn {
  border-color: #4caf50;
  color: #4caf50;
}

.finance-card--expense .finance-card__remove-btn:hover:not(:disabled) {
  background: #4caf50;
  color: #fff;
}

.finance-card--expense .finance-card__add-btn {
  color: #f44336;
  border: 2px dashed #f44336;
}

.finance-card--expense .finance-card__add-btn:hover {
  background: #f44336;
  color: #fff;
}
</style>
