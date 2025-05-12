<script setup>
import TheBanner from '../components/banner.vue'
import TheSlider from '../components/slider.vue'

import { ref, onMounted } from 'vue'
import { apiService } from '@/services/api'
import { useI18n } from 'vue-i18n'
import { useLocalizedData } from '@/composables/useLocalizedData'

const { t } = useI18n()
const { getLocalizedName } = useLocalizedData()

const loading = ref(true)
const error = ref(null)

const categories = ref([])
onMounted(async () => {
  try {
    const [categoriesData] = await Promise.all([apiService.getCategories()])
    categories.value = categoriesData.map((cat) => ({ item: getLocalizedName(cat), img: cat.image_url }))
  } catch (err) {
    error.value = t('shop.error')
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss"></style>

<template>
  <main>
    <TheBanner />
    <TheSlider :items="categories" />
  </main>
</template>
