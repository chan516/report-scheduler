export const getTime = (date: Date) => {
  return date.toISOString().split('T')[1].split('.')[0];
}