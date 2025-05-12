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
const orderSuccess = ref(false)
const orderError = ref(null)

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

async function handleBuy() {
  orderSuccess.value = false
  orderError.value = null
  if (!cart.value.length) return
  try {
    const orderProducts = cart.value.map(item => ({
      id: item.id,
      name: item.name,
      amount: item.quantity,
      seller_id: item.owner_id
    }))
    await apiService.createOrder(orderProducts)
    cart.value = []
    orderSuccess.value = true
  } catch (err) {
    orderError.value = err.message || t('cart.buy_error')
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
      <div class="cart-section">
        <Cart :cart="cart" :onIncrease="increaseQty" :onDecrease="decreaseQty" />
        <button class="cart-buy-main" @click="handleBuy" :disabled="!cart.length">{{ t('cart.buy') }}</button>
        <div v-if="orderSuccess" class="order-success">{{ t('cart.buy_success') }}</div>
        <div v-if="orderError" class="order-error">{{ orderError }}</div>
      </div>
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

  .cart-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    min-width: 320px;
    max-width: 400px;
    width: 100%;
  }

  .cart-buy-main {
    background: #27ae60;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 18px;
    padding: 12px 0;
    cursor: pointer;
    font-weight: bold;
    margin-top: 8px;
    &:hover:enabled {
      filter: brightness(1.08);
    }
    &:disabled {
      background: #aaa;
      cursor: not-allowed;
    }
  }
  .order-success {
    color: #27ae60;
    text-align: center;
    font-weight: bold;
    margin-top: 8px;
  }
  .order-error {
    color: #e74c3c;
    text-align: center;
    font-weight: bold;
    margin-top: 8px;
  }
}
</style>
