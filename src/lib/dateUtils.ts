export function formatDate(
  dateInput: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  },
): string {
  if (!dateInput) return '';
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString('vi-VN', options);
}

export function formatDateTime(dateInput: string | number | Date): string {
  if (!dateInput) return '';
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) return '';

  return date.toLocaleString('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}
