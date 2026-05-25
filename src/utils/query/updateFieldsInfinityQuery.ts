export const updateFieldsInfinityQuery = (
  oldArray,
  id: number,
  customFields
) => {
  if (!oldArray) return oldArray;

  return {
    ...oldArray,

    pages: oldArray.pages.map((page) => ({
      ...page,
      data: page.data.map((item) => {
        if (item.id === id) {
          return { ...item, ...customFields };
        } else {
          return item;
        }
      }),
    })),
  };
};
