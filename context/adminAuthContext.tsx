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
  }) => Promise<void>;
  signOut: () => void;
  token?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
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
          if (email.length === 0 || password.length === 0) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
          }

          try {
            const response = await api.post("/login-adm", {
              accessCode,
              email,
              password,
            });

            const { message, status, token } = response.data;

            if (status !== HttpStatusCode.Ok) {
              Alert.alert("Erro", message);
              return;
            }

            setToken(token);
          } catch (error) {
            if (error instanceof Error) {
              Alert.alert("Erro", error.message);
            }
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
