export function formatDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;

  const pad = (num: number) => num.toString().padStart(2, "0");

  const month = pad(date.getMonth() + 1); // Meses: 0-11
  const day = pad(date.getDate());
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${month}/${day}/${year} ${hours}:${minutes}`;
}
