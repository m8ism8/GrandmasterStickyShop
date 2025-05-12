<script setup>
import { ref, onMounted } from 'vue'
import { apiService } from '@/services/api'
import { useI18n } from 'vue-i18n'
import ProductCard from '@/components/product/ProductCard.vue'
import Cart from '@/components/shop/Cart.vue'

const { t } = useI18n()
const products = ref([])
const loading = ref(true)
const error = ref(null)
const cart = ref([])

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

function addToCart(product) {
  const found = cart.value.find(item => item.id === product.id)
  if (found) {
    found.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}

function increaseQty(item) {
  item.quantity++
}

function decreaseQty(item) {
  if (item.quantity > 1) {
    item.quantity--
  } else {
    cart.value = cart.value.filter(i => i.id !== item.id)
  }
}
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
    
    <div v-else class="shop-content">
      <div class="products-grid">
        <div v-for="product in products" :key="product.id" class="product-card-wrapper">
          <ProductCard :product="product" />
          <button class="add-to-cart" @click="addToCart(product)">{{ t('cart.add') }}</button>
        </div>
      </div>
      <Cart :cart="cart" :onIncrease="increaseQty" :onDecrease="decreaseQty" />
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

  .shop-content {
    display: flex;
    gap: 40px;
    align-items: flex-start;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
    padding: 20px 0;
    flex: 2;
  }

  .product-card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .add-to-cart {
    background: #fcd92d;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    padding: 8px 0;
    cursor: pointer;
    font-weight: bold;
    transition: filter 0.2s;
    &:hover {
      filter: brightness(1.08);
    }
  }
}
</style>
