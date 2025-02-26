export const checkScheduledTime = (date: Date) => {
  const currentDate = new Date();
  const scheduledDate = new Date(date)
  if (scheduledDate.getHours() === currentDate.getHours() && scheduledDate.getMinutes() === currentDate.getMinutes())
    return true;
  return false;
}