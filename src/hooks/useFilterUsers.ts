import { useState, useMemo } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import { User } from "@/core/user";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

export function useUserFilter(users: User[]) {
  const [searchEmail, setSearchEmail] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  const handleFilter = useMemo(() => {
    let filtered = users.filter((user) =>
      user.email.toLowerCase().includes(searchEmail.toLowerCase()),
    );

    if (startDate && endDate) {
      const startDateFormated = dayjs(startDate);
      const endDateFormated = dayjs(endDate);

      if (startDateFormated.isAfter(endDateFormated)) {
        return;
      }

      filtered = filtered.filter((user) => {
        const userPurchaseDate = dayjs(user.purchaseDate, "DD/MM/YYYY");
        const userExpirationDate = dayjs(user.expirationDate, "DD/MM/YYYY");

        return (
          userPurchaseDate.isBefore(startDateFormated, "day") &&
          userExpirationDate.isAfter(endDateFormated, "day")
        );
      });
    }

    setFilteredUsers(filtered);
  }, [searchEmail, startDate, endDate, users]);

  return {
    searchEmail,
    setSearchEmail,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filteredUsers,
    handleFilter,
  };
}
