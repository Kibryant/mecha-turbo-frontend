import { useState } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import Br from "../flags/br";
import Es from "../flags/es";
import Us from "../flags/us";

export default function LanguageSelector() {
  const [modalVisible, setModalVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      console.log(i18n.language);
    });
  };

  return (
    <View className="absolute top-4 right-4">
      <Pressable onPress={() => setModalVisible(true)}>
        {i18n.language === "pt-BR" && <Br />}
        {i18n.language === "es" && <Es />}
        {i18n.language === "en" && <Us />}
      </Pressable>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-secondary/95">
          <View className="border border-primary w-3/4 p-4 rounded-lg">
            <Text className="text-xl font-headingBold mb-4 text-gray-100">
              {t("Selecione o idioma")}
            </Text>

            <Pressable
              onPress={() => {
                changeLanguage("pt-BR");
                setModalVisible(false);
              }}
              className={`border border-primary px-3 py-2 rounded-md mb-2 ${i18n.language === "pt-BR" ? "bg-primary" : ""}`}
            >
              <Text className="text-gray-100">{t("Português")}</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                changeLanguage("es");
                setModalVisible(false);
              }}
              className={`border border-primary px-3 py-2 rounded-md mb-2 ${i18n.language === "es" ? "bg-primary" : ""}`}
            >
              <Text className="text-gray-100">{t("Espanhol")}</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                changeLanguage("en");
                setModalVisible(false);
              }}
              className={`border border-primary px-3 py-2 rounded-md ${i18n.language === "en" ? "bg-primary" : ""}`}
            >
              <Text className="text-gray-100">{t("Inglês")}</Text>
            </Pressable>

            <Pressable
              onPress={() => setModalVisible(false)}
              className="mt-4 px-3 py-2 bg-primary rounded-md"
            >
              <Text className="text-center text-gray-100">{t("Fechar")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
