import { AdminProvider } from "@/context/adminAuthContext";
import { UserProvider } from "@/context/userAuthContext";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <AdminProvider>
      <UserProvider>
        <Slot />
      </UserProvider>
    </AdminProvider>
  );
}
