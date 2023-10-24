/**
 * Genera una cadena SQL para seleccionar campos específicos de una tabla y, opcionalmente, les asigna alias.
 *
 * @param table - El nombre de la tabla de la que se seleccionarán los campos.
 * @param ModelClass - La clase del modelo que representa la tabla.
 * @param aliasTable - (Opcional) El alias opcional para la tabla en la consulta SQL.
 * @returns Una cadena SQL que selecciona los campos especificados con o sin alias.
 */
function generateSelectFieldsSQL(table: string, ModelClass, aliasTable?: string) {
  const fields = Object.keys(new ModelClass()).map((key) => ` ${aliasTable ?? table}.${key} AS '${table}.${key}' `);
  return fields.join(',');
}

/**
 * Formatea la información para hacer un insert/update a la base de datos.
 * @param data - Los datos que se van a insertar.
 * @returns Un objeto que contiene los datos formateados y sus parámetros correspondientes.
 */
function formatDataToInsert(data) {
  const dataToInsert = [];
  const params = [];
  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (typeof value !== 'undefined') {
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
    }
  });
  return { insert: dataToInsert.join(', '), params };
}

export {
  generateSelectFieldsSQL,
  formatDataToInsert,
};
