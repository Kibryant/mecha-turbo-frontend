import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ptBR from "./pt-BR.json";
import es from "./es.json";
import en from "./en.json";
import { getLocales } from "expo-localization";

const deviceLanguage = getLocales()[0].languageCode;

const resources = {
  pt: {
    translation: ptBR,
  },
  es: {
    translation: es,
  },
  en: {
    translation: en,
  },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  debug: process.env.NODE_ENV === "development",
  lng: deviceLanguage || "pt",
  fallbackLng: deviceLanguage || "pt",
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18next;
