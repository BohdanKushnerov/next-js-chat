import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useDefaultLanguage = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.language) {
      return;
    }

    const userLanguage = navigator.language;

    if (userLanguage === "en-US") {
      localStorage.setItem("language", "en");
    } else if (userLanguage === "uk-UA") {
      localStorage.setItem("language", "ua");
    } else if (userLanguage === "ru-RU") {
      localStorage.setItem("language", "ru");
    } else {
      localStorage.setItem("language", "en");
    }

    // Устанавливаем язык в i18n после установки в localStorage
    i18n.changeLanguage(localStorage.language);
  }, [i18n]);
};

export default useDefaultLanguage;
