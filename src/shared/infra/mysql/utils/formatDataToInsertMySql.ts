export const formatDataToInsert = (data) => {
  const dataToInsert = [];
  const params = [];
  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (value === null || value === 'null') {
      dataToInsert.push(`${key} = null`);
    } else {
      dataToInsert.push(`${key} = ?`);
    }

    if (typeof value === 'boolean') {
      params.push(Boolean(value));
    } else {
      params.push(value);
    }
  });
  return { insert: dataToInsert.join(', '), params };
};
