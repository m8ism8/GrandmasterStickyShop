import { createI18n } from 'vue-i18n'
import en from './en.json'
import ru from './ru.json'

const i18n = createI18n({
  legacy: false, // Set to false to use Composition API
  locale: localStorage.getItem('locale') || 'en', // Default locale
  fallbackLocale: 'en', // Fallback locale
  messages: {
    en,
    ru
  }
})

export default i18n 