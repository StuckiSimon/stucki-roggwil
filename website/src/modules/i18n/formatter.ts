const numberFormatter = new Intl.NumberFormat('de-CH');

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}
