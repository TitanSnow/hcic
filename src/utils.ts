export function shallowClone<T>(object: T): T {
  return Object.assign({}, object)
}

export function shallowEqual<T>(a: T, b: T): boolean {
  for (const key of new Set([...Object.keys(a), ...Object.keys(b)]) as Set<keyof T>) {
    if (a[key] !== b[key]) {
      return false
    }
  }
  return true
}
