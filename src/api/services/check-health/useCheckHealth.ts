import { useQuery } from '@tanstack/vue-query';
import { checkHealthService } from './api';
import { watch } from 'vue';
import { useStoreSnackBar } from '@/app/store';

export const keyCheckHealth = 'checkHealth';

export const useCheckHealth = () => {
  const { pushMessageSnackBar } = useStoreSnackBar();

  const { isError, isLoading, isSuccess } = useQuery({
    queryKey: [keyCheckHealth],
    queryFn: checkHealthService.status,
  });

  watch(isSuccess, (newValue, oldValue) => {
    if (newValue) {
      pushMessageSnackBar({
        type: 'success',
        text: 'Приложение успешно загружено',
      });
    }
  });

  return {
    isError,
    isLoading,
  };
};
