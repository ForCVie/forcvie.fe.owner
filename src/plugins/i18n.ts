import { createI18n } from 'vue-i18n'


import VI from '@/locales/vi/module.json'
import KO from '@/locales/ko/module.json'

// Type-define 'en-US' as the master schema for the resource
type MessageSchema = typeof VI

export const i18n = createI18n<[MessageSchema], 'en' | 'vi'>({
  legacy: false,
  locale: 'vi',
  messages: {
    vi: VI,
    ko: KO
  },
  fallbackLocale: 'vi'
})
