// Example  = mappingDataInfinityQuery(data.data, {_isError: false,_isLoading: false,_isEditing: false })

export const mappingDataInfinityQuery = (array: any, customFields: any) => {
  // todo надо передавать data.data в array
  return array.map((item: any) => {
    return { ...item, ...customFields };
  });
};
