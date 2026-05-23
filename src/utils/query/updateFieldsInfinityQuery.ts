// export const updateFieldsInfinityQuery = (array, id, updates) => {
//   for (const page of array.pages) {
//     for (const item of page.data) {
//       if (item.id === id) Object.assign(item, updates);
//     }
//   }
// };

export const updateFieldsInfinityQuery = (oldArray, id, updates) => {
  if (!oldArray) return oldArray;

  return {
    ...oldArray,

    pages: oldArray.pages.map((page) => ({
      ...page,
      data: page.data.map((project) =>
        project.id === id
          ? { ...project, ...updates } // добавляем кастомное поле
          : project
      ),
    })),
  };
};
