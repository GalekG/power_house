/**
 * Función que comprueba si una entrada es un objeto.
 *
 * @param item - La entrada que se va a comprobar.
 * @returns `true` si el valor es un objeto no nulo y no un array, `false` en caso contrario.
 */
function isObject(item) {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Función que realiza una mezcla profunda (teniendo en cuenta todos los items y sus hijos)
 *
 * @param target - El objeto de destino en el que se realizará la mezcla.
 * @param sources - Los objetos fuente que se mezclarán en el objeto de destino.
 * @returns El objeto de destino después de la mezcla profunda.
 */
function mergeDeep(target, ...sources) {
  if (!sources.length) return target;

  for (const source of sources) {
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, { [key]: {} });
          }
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
  }

  return target;
}

/**
 * Funcion que valida y formatea un valor para su uso en datos JSON.
 *
 * @param data - El valor que se va a validar y, si es necesario, convertir a cadena.
 * @returns El valor validado y formateado como una cadena o `null` si es nulo.
 */
function validateDataTypeJSON(data) {
  return data === null || typeof data === 'number' ? data : `"${data}"`;
}

/**
 * Función que valida y modifica un objeto para reemplazar objetos internos nulos por objetos vacíos.
 *
 * @param item - El objeto que se va a validar y modificar.
 * @returns El objeto modificado con objetos internos nulos reemplazados por objetos vacíos.
 */
function validateNullObjects(item) {
  const newItem = { ...item }; // Copia el objeto original para evitar modificarlo.

  Object.keys(newItem).forEach((key) => {
    if (isObject(newItem[key])) {
      const allPropsNull = Object.values(newItem[key]).every(
        (value) => value === null,
      );

      if (allPropsNull) {
        newItem[key] = {}; // Reemplaza el objeto interno con uno vacío.
      }
    }
  });

  return newItem;
}

/**
 * Formatea un objeto, reemplazando claves con comillas invertidas por claves sin comillas.
 * Realiza una fusión profunda y valida objetos internos nulos.
 *
 * @param item - El objeto que se va a formatear y validar.
 * @returns El objeto formateado y validado.
 */
function formatObject(item): any {
  let newItem = {};
  Object.keys(item).forEach((key) => {
    const keyOriginal = key;
    const newKey = key.replace(/`/g, '');

    if (key.includes('.')) {
      const splitKeys = key.split('.');

      let stringSubObject = '';
      let closeString = '';
      splitKeys.forEach((split_key, i) => {
        stringSubObject += `{"${split_key}":`;
        if (i === (splitKeys.length - 1)) {
          stringSubObject += validateDataTypeJSON(item[keyOriginal]);
        }
        closeString += '}';
      });
      stringSubObject += closeString;

      const newObjectTemp = JSON.parse(stringSubObject);

      newItem = mergeDeep(newItem, newObjectTemp);
    } else {
      newItem[newKey] = item[newKey];
    }
  });

  newItem = validateNullObjects(newItem);

  return newItem;
}

/**
 * Formatea un array de objetos aplicando la función {@link formatObject} a cada elemento.
 *
 * @param items - El array de objetos que se va a formatear.
 * @returns Un nuevo array con los objetos formateados.
 */
function formatArray(items) {
  if (!items || !items.length) return [];
  const newData = [];

  items.forEach((item, key_item) => {
    newData[key_item] = formatObject(item);
  });
  return newData;
}

export { formatObject, formatArray };
