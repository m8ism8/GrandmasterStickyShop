<script setup>
import { ref, onMounted } from 'vue'
import { apiService } from '@/services/api'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import CreateProductForm from '@/components/product/CreateProductForm.vue'

const router = useRouter()
const { t } = useI18n()
const userData = ref(JSON.parse(localStorage.getItem('account')))
const categories = ref([])
const loading = ref(true)
const error = ref(null)

const boughtOrders = ref([])
const sellerOrders = ref([])
const ordersLoading = ref(true)
const ordersError = ref(null)

// Product form data
const productName = ref('')
const productPrice = ref('')
const productImage = ref('')
const productCategory = ref('')
const productError = ref('')

async function handleLogout() {
  try {
    await apiService.logout()
    router.push('/login')
  } catch (err) {
    console.error('Error logging out:', err)
  }
}

onMounted(async () => {
  try {
    const categoriesData = await apiService.getCategories()
    categories.value = categoriesData
    // Fetch orders
    boughtOrders.value = await apiService.getMyOrders()
    if (userData.value.is_seller) {
      sellerOrders.value = await apiService.getOrdersForMyProducts()
    }
  } catch (err) {
    error.value = t('shop.error')
    ordersError.value = t('shop.error')
    console.error('Error:', err)
  } finally {
    loading.value = false
    ordersLoading.value = false
  }
})

async function createProduct() {
  if (!productName.value || !productPrice.value || !productCategory.value) {
    productError.value = 'All fields are required'
    return
  }

  try {
    const productData = {
      name: productName.value,
      price: parseInt(productPrice.value),
      img: productImage.value || 'http://placehold.co/200x200',
      category_id: parseInt(productCategory.value)
    }

    await apiService.createProduct(productData)
    
    // Clear form
    productName.value = ''
    productPrice.value = ''
    productImage.value = ''
    productCategory.value = ''
    productError.value = ''
    
    alert('Product created successfully!')
  } catch (err) {
    productError.value = err.message
    console.error('Error creating product:', err)
  }
}
</script>

<style lang="scss">
.profile {
  margin: 50px 0;
  font-size: 48px;
  text-align: center;
  p {
    font-size: 36px;
  }
}

.product-form {
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 8px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      font-size: 16px;
    }

    input, select {
      width: 100%;
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }

  button {
    width: 100%;
    padding: 10px;
    background: #fcd92d;
    border: none;
    border-radius: 4px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      filter: brightness(1.08);
    }
  }

  .error {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
}

.orders {
  margin: 40px auto;
  max-width: 700px;
  h2 {
    margin-top: 32px;
    font-size: 28px;
    color: #2c3e50;
  }
  .order-block {
    background: #f8f8f8;
    border-radius: 8px;
    margin: 18px 0;
    padding: 18px 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    ul {
      margin: 10px 0 0 0;
      padding: 0 0 0 18px;
    }
    li {
      font-size: 18px;
      margin-bottom: 4px;
    }
  }
}
</style>

<template>
  <div class="container">
    <div class="profile">
      Welcome home
      <p>{{ userData.username }}</p>
    </div>

    <!-- Product Creation Form for Sellers -->
    <CreateProductForm v-if="userData.is_seller" :categories="categories" />

    <div class="orders">
      <h2>My Purchases</h2>
      <div v-if="ordersLoading">Loading orders...</div>
      <div v-else-if="ordersError">{{ ordersError }}</div>
      <div v-else-if="!boughtOrders.length">No orders found.</div>
      <div v-else>
        <div v-for="order in boughtOrders" :key="order.id" class="order-block">
          <div><b>Order #{{ order.id }}</b> ({{ new Date(order.created_at).toLocaleString() }})</div>
          <ul>
            <li v-for="product in order.products" :key="product.id">
              {{ product.name }} x{{ product.amount }} (Seller: {{ product.seller_id }})
            </li>
          </ul>
        </div>
      </div>

      <div v-if="userData.is_seller">
        <h2>Orders for My Products</h2>
        <div v-if="ordersLoading">Loading orders...</div>
        <div v-else-if="ordersError">{{ ordersError }}</div>
        <div v-else-if="!sellerOrders.length">No orders for your products.</div>
        <div v-else>
          <div v-for="order in sellerOrders" :key="order.id" class="order-block">
            <div><b>Order #{{ order.id }}</b> ({{ new Date(order.created_at).toLocaleString() }})</div>
            <ul>
              <li v-for="product in order.products" :key="product.id">
                {{ product.name }} x{{ product.amount }} (Buyer: {{ order.buyer_username || '?' }})
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
