import "@/lib/i18n/i18n.config";

import { AdminProvider } from "@/context/adminAuthContext";
import { UserProvider } from "@/context/userAuthContext";
import { Slot } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function Layout() {
  const [fontsLoaded, error] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded || error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <UserProvider>
          <Slot />
        </UserProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
}
