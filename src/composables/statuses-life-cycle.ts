import { ref } from "vue";

export const useStatusesLifeCycle = () => {
  const isError = ref(false);
  const statusError = ref<number | null>(null);
  const isLoading = ref(false);
  const isSuccess = ref(false);

  const setStatusLifeCycle = (key: string, value: boolean) => {
    if (key === "isLoading") {
      isLoading.value = value;
    } else if (key === "isError") {
      isError.value = value;
    } else if (key === "isSuccess") {
      isSuccess.value = value;
    }
  };

  const setStatusError = (value: number | null) => (statusError.value = value);

  return {
    isError,
    statusError,
    isLoading,
    isSuccess,

    setStatusError,
    setStatusLifeCycle,
  };
};
