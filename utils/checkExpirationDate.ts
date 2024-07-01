import dayjs from "dayjs";

export function checkExpirationDate(expiryDate: string) {
  const today = dayjs().format("YYYY-MM-DD");
  return dayjs(expiryDate).isAfter(today);
}
