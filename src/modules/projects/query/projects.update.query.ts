// Файл: projects.update.query.ts
// Создан: 5/17/2026, 8:13:57 PM
// Операция: UPDATE

export const projectsUpdateQuery = {
  UPDATE: () => ({
    mutationFn: async ({ idProject, idTask, data }: any) => {
      // UPDATE API call
      const response = await fetch(`/api/${idProject}/tasks/${idTask}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      // const queryClient = context.client;
      // queryClient.invalidateQueries({
      //   queryKey: ["query_KEY"],
      // });
    },
  }),
};
