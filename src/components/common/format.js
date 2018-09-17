export default function formatCurrency(number) {
  return number.toLocaleString('en-US');
}

export function formatDecimal(number) {
  return Math.round(number * 100) / 100.0;
}
