<script setup lang="ts">
import { ref } from 'vue';

const showMenu = ref(false);
const menuTarget = ref(null);

const menuItems = [
  { title: 'Изменить', prependIcon: 'mdi-pencil', code: 'edit' },
  { type: 'divider' },
  { title: 'Удалить', prependIcon: 'mdi-trash-can', code: 'delete' },
];

async function show(evt) {
  if (showMenu.value) {
    showMenu.value = false;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  menuTarget.value = evt.target.closest('.v-icon-btn');
  showMenu.value = true;
}
const emit = defineEmits(['onEdit', 'onDelete']);

const handleMenuItemClick = (v) => {
  if (v.id === 'edit') emit('onEdit', v);
  if (v.id === 'delete') emit('onDelete', v);
};
</script>

<template>
  <v-menu
    v-model="showMenu"
    :offset="[-8, -12]"
    :target="menuTarget"
    location="right top"
    scroll-strategy="close"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-dots-vertical"
        size="exstra-small"
        variant="outlined"
        @click="show"
      ></v-btn>
    </template>

    <v-list
      :items="menuItems"
      class="py-0"
      density="compact"
      item-value="code"
      item-props
      slim
      @click:select="handleMenuItemClick"
    >
      <template v-slot:prepend>
        <v-icon class="mr-n2" size="small"></v-icon>
      </template>
    </v-list>
  </v-menu>
</template>
