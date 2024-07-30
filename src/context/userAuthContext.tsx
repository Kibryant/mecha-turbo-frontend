import { createContext, useContext, PropsWithChildren } from "react";
import { api } from "@/lib/api";
import { Alert } from "react-native";
import { HttpStatusCode } from "axios";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { isSubscriptionActive } from "@/utils/isSubscriptionActive";

const UserAuthContext = createContext<{
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<{
    success: boolean;
  }>;
  signOut: () => void;
  user: string | null;
  isLoading: boolean;
}>({
  signIn: async ({ email, password }) => {
    return { success: false };
  },
  signOut: () => null,
  isLoading: false,
  user: null,
});

export function useAuthUser() {
  const value = useContext(UserAuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuthUser must be wrapped in a <UserProvider />");
    }
  }

  return value;
}

export function UserProvider(props: PropsWithChildren) {
  const [[isLoading, user], setUser] = useAsyncStorage("user");

  return (
    <UserAuthContext.Provider
      value={{
        signIn: async ({ email, password }) => {
          try {
            // const response = await api.post("/login", { email, password });

            // const { message, status, user } = response.data;

            // if (status !== HttpStatusCode.Ok) {
            //   Alert.alert("Erro", message);
            //   return { success: false };
            // }

            // if (!isSubscriptionActive(user.expirationDate)) {
            //   Alert.alert("Erro", "Conta expirada.");
            //   return { success: false };
            // }

            // setUser(JSON.stringify(user));

            setUser(
              JSON.stringify({
                name: "Arthur Gustavo",
                email,
                password,
                expirationDate: new Date().setFullYear(
                  new Date().getFullYear() + 1,
                ),
              }),
            );

            return { success: true };
          } catch (error) {
            if (error instanceof Error) {
              Alert.alert("Erro", "Erro ao fazer login. Tente novamente.");
              return { success: false };
            }

            return { success: false };
          }
        },
        signOut: () => {
          setUser(null);
        },
        user,
        isLoading,
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
}
