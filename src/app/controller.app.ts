import { useStatusesLifeCycle } from "@composables";
import { checkHealthService } from "@api";

export const controllerApp = () => {
  const {
    isError,
    isLoading,
    isSuccess,
    statusError,
    setStatusError,
    setStatusLifeCycle,
  } = useStatusesLifeCycle();

  const checkHealthApp = async () => {
    try {
      setStatusLifeCycle("isSuccess", false);
      setStatusLifeCycle("isError", false);
      setStatusLifeCycle("isLoading", true);

      const { data } = await checkHealthService.status();

      if (data) {
        setStatusLifeCycle("isSuccess", true);
      }
    } catch (error: any) {
      setStatusError(error.status);
      setStatusLifeCycle("isError", true);
      setStatusLifeCycle("isSuccess", false);
    } finally {
      setStatusLifeCycle("isLoading", false);
    }
  };

  return {
    checkHealthApp,
    isError,
    isLoading,
    isSuccess,
    statusError,
  };
};
