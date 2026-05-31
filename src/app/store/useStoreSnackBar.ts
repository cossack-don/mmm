import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStoreSnackBar = defineStore('storeSnackBar', () => {
  const refElementSnackBar = ref();
  const listMessagesSnackBar = ref<any>([]);

  const pushMessageSnackBar = ({
    type = 'success',
    text = 'Текст сообщения',
  }: {
    type: string;
    text: string;
  }) => {
    listMessagesSnackBar.value.push({
      text: text,
      color: type,
    });
  };

  const resetListMessagesSnackBar = () => (listMessagesSnackBar.value = []);

  return {
    refElementSnackBar,
    listMessagesSnackBar,
    pushMessageSnackBar,
    resetListMessagesSnackBar,
  };
});
