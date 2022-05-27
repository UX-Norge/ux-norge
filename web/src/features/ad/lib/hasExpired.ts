// Add n days to a date
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const hasExpired = (startDate: string, duration: number) => {
  if (!startDate || !duration) return false;
  const now = new Date();
  const start = new Date(startDate);
  const expiry = addDays(start, duration);
  return now > expiry || expiry < now;
};
