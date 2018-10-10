export default async function getBanks() {
  const response = await fetch('/api/v1/banks');
  return response.json();
}
