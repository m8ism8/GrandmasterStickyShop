<script setup>
import { ref } from 'vue'
import { apiService } from '@/services/api'

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const productName = ref('')
const productPrice = ref('')
const productImage = ref('')
const productCategory = ref('')
const productError = ref('')

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

<template>
  <div class="product-form">
    <h2>Create New Product</h2>
    <div class="form-group">
      <label for="name">Product Name</label>
      <input type="text" id="name" v-model="productName" placeholder="Enter product name" />
    </div>

    <div class="form-group">
      <label for="price">Price</label>
      <input type="number" id="price" v-model="productPrice" placeholder="Enter price" />
    </div>

    <div class="form-group">
      <label for="image">Image URL</label>
      <input type="text" id="image" v-model="productImage" placeholder="Enter image URL (optional)" />
    </div>

    <div class="form-group">
      <label for="category">Category</label>
      <select id="category" v-model="productCategory">
        <option value="">Select a category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name_en }}
        </option>
      </select>
    </div>

    <button @click="createProduct">Create Product</button>
    <p v-if="productError" class="error">{{ productError }}</p>
  </div>
</template>

<style lang="scss">
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
</style> 