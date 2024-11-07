import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: "JS in my heart",
        page1: "Page 1",
        page2: "Page 2",
        namePlaceholder: "Search by Name",
        all: "All",
        image: "Image",
        video: "Video",
        locale: "en",
        to: "to",
      },
    },
    ru: {
      translation: {
        home: "JS в моём сердце",
        page1: "Страница 1",
        page2: "Страница 2",
        namePlaceholder: "Поиск по имени",
        all: "Все",
        image: "Изображение",
        video: "Видео",
        locale: "ru",
        to: "по",
      },
    },
    kz: {
      translation: {
        home: "Менің жүрегімде JS",
        page1: "Бет 1",
        page2: "Бет 2",
        namePlaceholder: "Атын іздеу",
        all: "Барлығы",
        image: "Сурет",
        video: "Бейне",
        to: "дейін",
        locale: "kz",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
