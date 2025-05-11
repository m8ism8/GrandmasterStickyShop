import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useLocalizedData() {
  const { locale } = useI18n()

  const getLocalizedName = (item) => {
    if (!item) return ''
    return item[`name_${locale.value}`] || item.name_en || ''
  }

  const getLocalizedDescription = (item) => {
    if (!item) return ''
    return item[`description_${locale.value}`] || item.description_en || ''
  }

  return {
    getLocalizedName,
    getLocalizedDescription
  }
} 