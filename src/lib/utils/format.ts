/** 68.9 -> "68,90 €" */
export function formatPrice(value: number): string {
  return value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

/** "+33 6 12 34 42 19" -> "+33 6 •• •• 42 19" (masks the two middle groups). */
export function maskPhone(phone: string): string {
  const groups = phone.split(' ');
  if (groups.length !== 6) return phone;
  const [countryCode, prefix, , , third, fourth] = groups;
  return `${countryCode} ${prefix} •• •• ${third} ${fourth}`;
}
