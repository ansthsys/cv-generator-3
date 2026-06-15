export function parseDate(
  value: string | Date | null | undefined,
): Date | null | undefined {
  if (value == null) return value
  if (value instanceof Date) return value
  const parsed = new Date(value)
  return isNaN(parsed.getTime()) ? undefined : parsed
}
