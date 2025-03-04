export const getScheduleDate = (date: Date) => {
  const hour = new Date(date).getHours()
  const minutes = new Date(date).getMinutes()
  return `${minutes} ${hour} * * *`
}