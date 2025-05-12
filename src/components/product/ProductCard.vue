<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const placeholderImg = 'http://placehold.co/200x200?text=No+Image'

defineProps({
  product: {
    type: Object,
    required: true
  }
})

function handleImgError(e) {
  if (e && e.target) {
    e.target.src = placeholderImg
  }
}
</script>

<template>
  <div class="product-card">
    <img :src="product.img || placeholderImg" :alt="product.name" class="product-image" @error="handleImgError" />
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <div class="product-price-row">
        <span class="product-price">{{ t('product.price', { price: product.price }) }}</span>
        <button class="buy-button">{{ t('product.buy') }}</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    background: #f0f0f0;
  }

  .product-info {
    padding: 16px;

    .product-name {
      margin: 0 0 12px 0;
      font-size: 26px;
      color: #333;
      font-weight: bold;
    }

    .product-price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .product-price {
        font-size: 20px;
        font-weight: bold;
        color: #2c3e50;
      }

      .buy-button {
        background: #27ae60;
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: filter 0.2s;
        font-weight: bold;

        &:hover {
          filter: brightness(1.08);
        }
      }
    }
  }
}
</style> 