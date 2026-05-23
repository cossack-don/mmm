export const mappingInfinityQuery = (array: any) => {
  return array.map((item: any) => {
    // Добавляем поля к текущему объекту
    const updatedItem = {
      ...item,
      _isLoading: false,
      _isError: false,
      _isEditing: false,
    };

    // Если у объекта есть свойство data (массив), обходим каждый элемент внутри него
    if (Array.isArray(updatedItem.data)) {
      updatedItem.data = updatedItem.data.map((dataItem: any) => ({
        ...dataItem,
        _isLoading: false,
        _isError: false,
        _isEditing: false,
      }));
    }

    return updatedItem;
  });
};
