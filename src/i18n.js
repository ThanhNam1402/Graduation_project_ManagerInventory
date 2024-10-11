import i18n from "i18next";
import { initReactI18next } from "react-i18next";


import DASHBOARD_EN from "./translations/en/dashboard.json"
import NAVBAR_EN from './translations/en/navbar.json'
import FILTER_EN from './translations/en/filters.json'
import ACTION_EN from './translations/en/action.json'
import PRODUCT_EN from './translations/en/product.json'
import PRICEBOOK_EN from './translations/en/pricebook.json'
import INVENTORYCOUNT_EN from './translations/en/inventorycount.json'
import ORDER_EN from './translations/en/order.json'
import NOTIFI_EN from './translations/en/notification.json'
import SUPPLIER_EN from './translations/en/supplier.json'
import CUSTOMER_EN from './translations/en/customer.json'



import DASHBOARD_VI from "./translations/vi/dashboard.json"
import NAVBAR_VI from './translations/vi/navbar.json'
import FILTER_VI from './translations/vi/filters.json'
import ACTION_VI from './translations/vi/action.json'
import PRODUCT_VI from './translations/vi/product.json'
import PRICEBOOK_VI from './translations/vi/pricebook.json'
import INVENTORYCOUNT_VI from './translations/vi/inventorycount.json'
import ORDER_VI from './translations/vi/order.json'
import NOTIFI_VI from './translations/vi/notification.json'
import SUPPLIER_VI from './translations/vi/supplier.json'
import CUSTOMER_VI from './translations/vi/customer.json'



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
    product: PRODUCT_EN,
    pricebook: PRICEBOOK_EN,
    inventorycount: INVENTORYCOUNT_EN,
    order: ORDER_EN,
    notification: NOTIFI_EN,
    supplier: SUPPLIER_EN,
    customer: CUSTOMER_EN,
  },
  vi: {
    navbar: NAVBAR_VI,
    dashboard: DASHBOARD_VI,
    filter: FILTER_VI,
    action: ACTION_VI,
    product: PRODUCT_VI,
    pricebook: PRICEBOOK_VI,
    inventorycount: INVENTORYCOUNT_VI,
    order: ORDER_VI,
    notification: NOTIFI_VI,
    supplier: SUPPLIER_VI,
    customer: CUSTOMER_VI,


  }
};

const defaultNS = 'home'

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "vi",
    ns: ['navbar', 'dashboard', 'filter', 'product', 'action', 'pricebook', 'inventorycount', 'order', 'notification', 'supplier', 'customer'],
    defaultNS,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;