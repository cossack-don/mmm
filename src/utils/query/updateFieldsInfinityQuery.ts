export const updateFieldsInfinityQuery = (
  oldArray: any,
  id: number,
  fields: any
) => {
  if (!oldArray) return oldArray;

  return {
    ...oldArray,

    pages: oldArray.pages.map((page: any) => ({
      ...page,
      data: page.data.map((item: any) => {
        if (item.id === id) {
          return { ...item, ...fields };
        } else {
          return item;
        }
      }),
    })),
  };
};
