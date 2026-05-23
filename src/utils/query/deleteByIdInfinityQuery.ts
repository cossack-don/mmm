export const deleteByIdInfinityQuery = (oldArray: any, id: number) => {
  if (!oldArray) return oldArray;

  return {
    ...oldArray,

    pages: oldArray.pages.map((page: any) => ({
      ...page,
      data: page.data.filter((project: any) => project.id !== id),
      total: page.total - 1,
    })),
  };
};
