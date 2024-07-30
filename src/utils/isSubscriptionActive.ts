import dayjs from "dayjs";

dayjs.locale("pt-br");

export function isSubscriptionActive(expiryDate: string) {
  const today = dayjs().format("YYYY-MM-DD");
  return dayjs(expiryDate).isAfter(today);
}
