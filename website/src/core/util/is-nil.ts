// Ignore rule for this case as it's a type guard function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isNil(val: any): val is null | undefined {
  return val === undefined || val === null;
}

/**
 * intended to be used in array operations such as .filter(notNil)
 */
export function notNil<TValue>(value: TValue | null | undefined): value is TValue {
  return !isNil(value);
}

export default isNil;
