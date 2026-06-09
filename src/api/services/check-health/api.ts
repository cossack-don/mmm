import { API } from '@/app/configs';

export const checkHealthService = {
  status: () => {
    return API({
      url: '/check-health',
      method: 'GET',
    });
  },
};
