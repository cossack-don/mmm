export const setupAuthGuard = (router) => {
  router.beforeEach((to, from) => {
    const isAuthenticated = false; // Временно для теста
    const requiresAuth = to.matched.some((record) => record.meta.auth === true);
    const isAuthPage = to.name === 'auth' || to.path === '/auth';

    console.log('Navigation check:', {
      to: to.path,
      requiresAuth,
      isAuthPage,
      isAuthenticated,
    });

    // Если нужна авторизация, но пользователь не авторизован
    if (requiresAuth && !isAuthenticated) {
      console.log('→ Redirect to login');
      return {
        name: 'auth',
        query: { redirect: to.fullPath },
        replace: true,
      };
    }

    // Если пользователь авторизован и пытается зайти на страницу логина
    if (isAuthPage && isAuthenticated) {
      console.log('→ Redirect to projects (already logged in)');
      return { name: 'projects', replace: true };
    }

    // Разрешаем переход
    console.log('→ Allow navigation');
    return true;
  });
};
