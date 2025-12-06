export function getCurrentYear(): string {
  const today = new Date();
  const month = today.getMonth() + 1; // 1-12
  const year = today.getFullYear();

  // If month is Jan(1) to Apr(4) -> previousYear-currentYear
  if (month >= 1 && month <= 4) {
    return `${year - 1}-${year}`;
  }

  // Else May(5) to Dec(12) -> currentYear-nextYear
  return `${year}-${year + 1}`;
}
