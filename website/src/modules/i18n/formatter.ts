const numberFormatter = new Intl.NumberFormat('de-CH');

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatRappen(value: number): string {
  return value.toFixed(2);
}
