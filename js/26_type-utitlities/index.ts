export function isBoolean(value: unknown): boolean {
  return Object.prototype.toString.call(value) === "[object Boolean]";
}

export function isNumber(value: unknown): boolean {
  return Object.prototype.toString.call(value) === "[object Number]";
}

export function isNull(value: unknown): boolean {
  return Object.prototype.toString.call(value) === "[object Null]";
}

export function isString(value: unknown): boolean {
  return Object.prototype.toString.call(value) === "[object String]";
}

export function isSymbol(value: unknown): boolean {
  return Object.prototype.toString.call(value) === "[object Symbol]";
}

export function isUndefined(value: unknown): boolean {
  return Object.prototype.toString.call(value) === "[object Undefined]";
}
