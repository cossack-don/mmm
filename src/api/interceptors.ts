export const setupInterceptorResponse = (API) => {
  API.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

export const setupInterceptorRequest = (API) => {
  API.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};
