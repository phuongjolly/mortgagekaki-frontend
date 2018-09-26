export default function formatCurrency(number) {
  return Math.round(number || 0).toLocaleString('en-US');
}

export function formatDecimal(number) {
  return Math.round(number * 100) / 100.0;
}
