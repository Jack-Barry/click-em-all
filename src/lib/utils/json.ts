export function prettyJson(data: unknown) {
  return JSON.stringify(data, null, 2)
}
