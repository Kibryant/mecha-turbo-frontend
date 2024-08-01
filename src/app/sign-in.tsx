import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect, useRouter } from "expo-router";
import { logoVertical } from "@/constants/logo";
import { useAuthUser } from "@/context/userAuthContext";
import { User } from "@/core/user";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/language-selector";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, signInSchema } from "@/lib/schemas";
import { useAuthAdmin } from "@/context/adminAuthContext";

export default function SignIn() {
  const router = useRouter();
  const { signIn, user } = useAuthUser();
  const { token } = useAuthAdmin();
  const userObject: User = JSON.parse(user || "{}");
  const [, setInputFocused] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const { t } = useTranslation();

  const handleLogin: SubmitHandler<SignInSchema> = async ({
    email,
    password,
  }) => {
    const { success } = await signIn({ email, password });

    if (!success) {
      return;
    }

    router.replace("/");
  };

  if (userObject._id) {
    return <Redirect href="/" />;
  }

  if (token) {
    return <Redirect href="/admin" />;
  }

  const handleFocus = () => {
    setInputFocused(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: -200,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBlur = () => {
    setInputFocused(false);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-secondary">
      <View className="flex-1 items-center justify-center p-4">
        <LanguageSelector />

        <Animated.View style={{ opacity: fadeAnim }}>
          <Image source={logoVertical} style={{ width: 280, height: 280 }} />
        </Animated.View>

        <Animated.View
          style={{ transform: [{ translateY: translateYAnim }], width: "100%" }}
        >
          <View className="w-full">
            <View className="justify-center items-center">
              <Text className="text-2xl font-headingBold mb-1 text-gray-100">
                {t("Boas vindas!")}
              </Text>
              <Text className="text-gray-100 mb-4 font-body">
                {t("Faça login para acessar o sistema.")}
              </Text>
            </View>

            <View className="w-full flex-row justify-between">
              <Link
                href="/sign-in-adm"
                className="text-primary mb-2 text-center font-body"
              >
                {t("Acessar como administrador")}
              </Link>
            </View>

            <View className="w-full mb-2">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur } }) => (
                  <TextInput
                    className="w-full px-2 py-3 border rounded-md border-gray-700 font-body"
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    accessibilityLabel="Email"
                    placeholderTextColor="#374151"
                    style={{ color: "#f3f4f6", fontSize: 12 }}
                    onBlur={() => {
                      onBlur();
                      handleBlur();
                    }}
                    onFocus={handleFocus}
                    onChangeText={onChange}
                  />
                )}
                name="email"
              />
              {errors.email && (
                <Text className="text-red-500 mb-2 text-sm font-body">
                  {t(errors.email.message as string)}
                </Text>
              )}
            </View>

            <View className="w-full">
              <Controller
                control={control}
                render={({ field: { onBlur, onChange } }) => (
                  <TextInput
                    className="w-full px-2 py-3 border rounded-md border-gray-700 font-body"
                    placeholder={t("Senha")}
                    secureTextEntry
                    accessibilityLabel={t("Senha")}
                    placeholderTextColor="#374151"
                    style={{ color: "#f3f4f6", fontSize: 12 }}
                    onBlur={() => {
                      onBlur();
                      handleBlur();
                    }}
                    onFocus={handleFocus}
                    onChangeText={onChange}
                  />
                )}
                name="password"
              />
              {errors.password && (
                <Text className="text-red-500 mb-2 text-sm font-body">
                  {t(errors.password.message as string)}
                </Text>
              )}
            </View>

            <TouchableOpacity
              className="w-full px-2 py-3 bg-primary rounded-md mt-2"
              onPress={handleSubmit(handleLogin)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text className="text-center text-white font-headingBold">
                  {t("Acessar")}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View className="absolute bottom-2">
          <Text className="text-primary text-xs font-body">
            &copy; {t("Todos os direitos reservados DNA MECHA TURBO")}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
