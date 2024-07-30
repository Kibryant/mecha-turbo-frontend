import { createContext, useContext, PropsWithChildren } from "react";
import { useSecureStorage } from "@/hooks/useSecureStorage";
import { api } from "@/lib/api";
import { Alert } from "react-native";
import { HttpStatusCode } from "axios";

const AdminAuthContext = createContext<{
  signIn: ({
    accessCode,
    email,
    password,
  }: {
    accessCode: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean }>;
  signOut: () => void;
  token?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => {
    return { success: false };
  },
  signOut: () => null,
  token: null,
  isLoading: false,
});

export function useAuthAdmin() {
  const value = useContext(AdminAuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuthAdmin must be wrapped in a <AdminProvider />");
    }
  }

  return value;
}

export function AdminProvider(props: PropsWithChildren) {
  const [[isLoading, token], setToken] = useSecureStorage("token");

  return (
    <AdminAuthContext.Provider
      value={{
        signIn: async ({ accessCode, email, password }) => {
          try {
            const response = await api.post("/login-adm", {
              accessCode,
              email,
              password,
            });

            const { message, status, token } = response.data;

            if (status !== HttpStatusCode.Ok) {
              Alert.alert("Erro", message);
              return { success: false };
            }

            setToken(token);

            return { success: true };
          } catch (error) {
            if (error instanceof Error) {
              Alert.alert("Erro", error.message);
              return { success: false };
            }

            return { success: false };
          }
        },
        signOut: () => {
          setToken(null);
        },
        token,
        isLoading,
      }}
    >
      {props.children}
    </AdminAuthContext.Provider>
  );
}
