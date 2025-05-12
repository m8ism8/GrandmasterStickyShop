<script setup>
import { ref, onMounted } from 'vue'
import { apiService } from '@/services/api'
import { useI18n } from 'vue-i18n'
import ProductCard from '@/components/product/ProductCard.vue'

const { t } = useI18n()
const products = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const productsData = await apiService.getProducts()
    products.value = productsData
  } catch (err) {
    error.value = t('shop.error')
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="shop">
    <h1>{{ t('shop.title') }}</h1>
    
    <div v-if="loading" class="loading">
      {{ t('shop.loading') }}
    </div>
    
    <div v-else-if="error" class="error">
      {{ t('shop.error') }}
    </div>
    
    <div v-else class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shop {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 32px;
    color: #2c3e50;
  }

  .loading, .error {
    text-align: center;
    font-size: 18px;
    color: #666;
  }

  .error {
    color: #e74c3c;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
    padding: 20px 0;
  }
}
</style>
