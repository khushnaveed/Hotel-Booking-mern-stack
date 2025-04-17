// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationES from "./locales/es/translation.json"; // example

const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
  es: { translation: translationES },
};

i18n
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en", // default
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
