export function IfNull<T>(obj: T, nullValue: T): T {
  if (!obj) {
    return nullValue;
  }
  return obj;
}
