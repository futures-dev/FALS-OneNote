export function Assert(condition, message) {
  if (!condition) throw Error("Assert failed: " + message);
}
