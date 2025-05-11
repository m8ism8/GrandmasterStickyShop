<script setup>
import VueCategories from '@/components/shop/navigation.vue'
import { ref, onMounted } from 'vue'
import { apiService } from '@/services/api'
import { useI18n } from 'vue-i18n'
import { useLocalizedData } from '@/composables/useLocalizedData'

const { t } = useI18n()
const { getLocalizedName } = useLocalizedData()

const categories = ref([t('categories.all')])
const products = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const [categoriesData] = await Promise.all([apiService.getCategories()])
    categories.value = [
      t('categories.all'),
      ...categoriesData.map((cat) => {
        return getLocalizedName(cat)
      }),
    ]
    // products.value = productsData
  } catch (err) {
    error.value = t('shop.error')
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container">
    <VueCategories :categories="categories" />

    <div v-if="loading" class="loading">
      {{ t('shop.loading') }}
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else class="shop">
      <div v-for="product in products" :key="product.id" class="shop__card">
        <img :src="product.image_url || 'http://placehold.co/200x150'" />
        <p>{{ getLocalizedName(product) }}</p>
        <p>{{ t('shop.price', { price: product.price }) }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  .shop {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;

    &__card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;

      img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 4px;
      }

      p {
        margin: 0.5rem 0;
      }
    }
  }

  .loading,
  .error {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
  }

  .error {
    color: red;
  }
}
</style>
