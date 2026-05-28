<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title?: string;
  saveButtonText?: string;
  closeButtonText?: string;
  width?: string;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'onSave'): void;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Заголовок модального окна',
  saveButtonText: 'Сохранить',
  closeButtonText: 'Закрыть',
  width: '500',
});

const emit = defineEmits<Emits>();

const updateModalState = (value: boolean) => emit('update:modelValue', value);

const onSave = () => {
  emit('onSave');
  updateModalState(false);
};
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="updateModalState"
    :maxWidth="props.width"
  >
    <v-card>
      <v-card-title class="text-h5">{{ title }}</v-card-title>
      <v-card-text> <slot /></v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="onSave">{{ saveButtonText }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="updateModalState(false)"
        >
          {{ closeButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
