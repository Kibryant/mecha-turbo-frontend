import { useState, useCallback, useEffect } from "react";
import { User } from "@/core/user";

export function useUserFilter(users: User[]) {
  const [searchEmail, setSearchEmail] = useState("");
  const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(undefined);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  const handleFilter = useCallback(() => {
    let filtered = users.filter((user) =>
      user.email.toLowerCase().includes(searchEmail.toLowerCase()),
    );

    if (purchaseDate) {
      const actualDate = new Date(purchaseDate);

      filtered = filtered.filter((user) => {
        const purchaseDate = new Date(user.purchaseDate);
        const expirationDate = new Date(user.expirationDate);

        return actualDate <= expirationDate && actualDate >= purchaseDate;
      });
    }

    setFilteredUsers(filtered);
  }, [searchEmail, purchaseDate, users]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return {
    searchEmail,
    setSearchEmail,
    purchaseDate,
    setPurchaseDate,
    filteredUsers,
    handleFilter,
  };
}
