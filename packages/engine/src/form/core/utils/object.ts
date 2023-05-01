/**
 * Encapsulates in a given object, at a given path the provided value
 *
 * @example
 * ORIGINAL object
 *
 * encapsulateIn({maintain: 'spread_me'}, 'a.b.c','test')
 *
 * RESULT
 *
 * {
 *  maintain: 'spread_me',
 *    c: 'test
 *  }
 * }
 *
 * @param origin - The original object where the new value will be appended
 * @param path - The path at which the new value will be placed
 * @param value - The new value
 * @returns One new object with the new value at the provided path merged with the given object
 */
const encapsulateIn = (origin: Record<string, unknown>, path: string, value: string): Record<string, unknown> => {
  const parts = path.split('.');
  if (parts.length === 1) {
    return { ...origin, [path]: value };
  }
  const getNewPart = (parts: string[], subObject: Record<string, unknown>): Record<string, unknown> => {
    const clonedParts = [...parts];
    clonedParts.splice(0, 1);
    const part =
      parts.length !== 1
        ? getNewPart(clonedParts, subObject ? (subObject[parts[0]] as Record<string, unknown>) : {})
        : value;
    return {
      ...subObject,
      [parts[0]]: part,
    };
  };
  return getNewPart(parts, origin);
};

const getValueByPath = (
  object: Record<string, any> = {},
  path = '',
): string | number | boolean | Record<string, unknown> => {
  const parts = path.split('.');
  return parts.reduce((acc, part): any => (acc || {})[part], object);
};

export { encapsulateIn, getValueByPath };
