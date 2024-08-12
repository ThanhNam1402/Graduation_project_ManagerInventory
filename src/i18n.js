import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import NAVBAR_EN from './translations/en/navbar.json'
import NAVBAR_VI from './translations/vi/navbar.json'
import FILTER_EN from './translations/en/filters.json'
import ACTION_EN from './translations/en/action.json'
import PRODUCT_EN from './translations/en/product.json'


import DASHBOARD_EN from "./translations/en/dashboard.json"
import DASHBOARD_VI from "./translations/vi/dashboard.json"
import FILTER_VI from './translations/vi/filters.json'
import ACTION_VI from './translations/vi/action.json'
import PRODUCT_VI from './translations/vi/product.json'



export const localLng = {
  en: 'English',
  vi: 'Tiếng Việt'
}

const resources = {
  en: {
    navbar: NAVBAR_EN,
    dashboard: DASHBOARD_EN,
    filter: FILTER_EN,
    action: ACTION_EN,
    product: PRODUCT_EN
  },
  vi: {
    navbar: NAVBAR_VI,
    dashboard: DASHBOARD_VI,
    filter: FILTER_VI,
    action: ACTION_VI,
    product: PRODUCT_VI


  }
};

const defaultNS = 'home'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi",
    ns: ['navbar', 'dashboard', 'filter', 'product', 'action',],
    defaultNS,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;