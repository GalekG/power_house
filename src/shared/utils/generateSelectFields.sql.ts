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

export {
  generateSelectFieldsSQL,
};
