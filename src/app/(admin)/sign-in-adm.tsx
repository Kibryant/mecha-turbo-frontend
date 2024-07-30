import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { logoVertical } from "@/constants/logo";
import { useAuthAdmin } from "@/context/adminAuthContext";
import { useTranslation } from "react-i18next";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInAdmSchema, signInAdmSchema } from "@/lib/schemas";
import LanguageSelector from "@/components/language-selector";

export default function SignInAdm() {
  const router = useRouter();
  const { signIn } = useAuthAdmin();
  const { t } = useTranslation();

  const [, setInputFocused] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInAdmSchema),
    defaultValues: {
      email: "",
      password: "",
      accessCode: "",
    },
  });

  const handleLogin: SubmitHandler<SignInAdmSchema> = async ({
    accessCode,
    email,
    password,
  }) => {
    const { success } = await signIn({ accessCode, email, password });

    if (!success) {
      return;
    }

    router.replace("/admin");
  };

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
          <Image source={logoVertical} style={{ width: 300, height: 300 }} />
        </Animated.View>

        <Animated.View
          style={{ transform: [{ translateY: translateYAnim }], width: "100%" }}
        >
          <View className="w-full">
            <View className="justify-center items-center">
              <Text className="text-2xl font-headingBold mb-1 text-gray-100">
                {t("Boas vindas!")}
              </Text>
              <Text className="text-gray-100 mb-4">
                {t("Faça login para acessar o painel administrativo.")}
              </Text>
            </View>

            <View className="w-full flex-row justify-between">
              <Link href="/admin" className="text-primary mb-2 text-center">
                Esqueceu a senha?
              </Link>
              <Link href="/sign-in" className="text-primary mb-2 text-center">
                {t("Acessar como usuário")}
              </Link>
            </View>

            <View className="w-full mb-2">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur } }) => (
                  <TextInput
                    className="w-full px-2 py-3 border rounded-md border-gray-700"
                    placeholder={t("Código de acesso")}
                    keyboardType="number-pad"
                    accessibilityLabel={t("Código de acesso")}
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
                name="accessCode"
              />
              {errors.accessCode && (
                <Text className="text-red-500 text-sm mb-2">
                  {t(errors.accessCode.message as string)}
                </Text>
              )}
            </View>

            <View className="w-full mb-2">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur } }) => (
                  <TextInput
                    className="w-full px-2 py-3 border rounded-md border-gray-700"
                    placeholder="Email"
                    keyboardType="email-address"
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
                <Text className="text-red-500 text-sm mb-2">
                  {t(errors.email.message as string)}
                </Text>
              )}
            </View>

            <View className="w-full mb-3">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur } }) => (
                  <TextInput
                    className="w-full px-2 py-3 border rounded-md border-gray-700"
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
                <Text className="text-red-500 text-sm mb-2">
                  {t(errors.password.message as string)}
                </Text>
              )}
            </View>

            <TouchableOpacity
              className="w-full px-2 py-3 bg-primary rounded-md"
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
          <Text className="text-primary text-xs">
            &copy; {t("Todos os direitos reservados DNA MECHA TURBO")}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
