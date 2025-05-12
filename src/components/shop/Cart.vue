<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
  cart: {
    type: Array,
    required: true
  },
  onIncrease: {
    type: Function,
    required: true
  },
  onDecrease: {
    type: Function,
    required: true
  }
})

const total = computed(() =>
  props.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
)
</script>

<template>
  <div class="cart">
    <h2>{{ t('cart.title') }}</h2>
    <div v-if="cart.length === 0" class="cart-empty">
      {{ t('cart.empty') }}
    </div>
    <div v-else>
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <span class="cart-item-name">{{ item.name }}</span>
        <span class="cart-item-price">{{ t('product.price', { price: item.price }) }}</span>
        <div class="cart-item-qty">
          <button @click="onDecrease(item)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="onIncrease(item)">+</button>
        </div>
        <span class="cart-item-subtotal">{{ t('product.price', { price: item.price * item.quantity }) }}</span>
      </div>
      <div class="cart-total">
        {{ t('cart.total') }}: <b>{{ t('product.price', { price: total }) }}</b>
      </div>
      <button class="cart-buy">{{ t('cart.buy') }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 24px;
  min-width: 320px;
  max-width: 400px;
  margin: 0 auto;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
  }
  .cart-empty {
    text-align: center;
    color: #888;
    font-size: 18px;
    margin: 40px 0;
  }
  .cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    gap: 8px;
    font-size: 16px;
    .cart-item-name {
      flex: 2;
      font-weight: 500;
    }
    .cart-item-price {
      flex: 1;
      color: #666;
    }
    .cart-item-qty {
      display: flex;
      align-items: center;
      gap: 4px;
      button {
        width: 28px;
        height: 28px;
        border: none;
        background: #eee;
        border-radius: 4px;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          background: #ddd;
        }
      }
      span {
        min-width: 24px;
        text-align: center;
      }
    }
    .cart-item-subtotal {
      flex: 1;
      text-align: right;
      font-weight: 500;
    }
  }
  .cart-total {
    margin-top: 24px;
    font-size: 20px;
    text-align: right;
  }
  .cart-buy {
    margin-top: 24px;
    width: 100%;
    background: #27ae60;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 18px;
    padding: 12px 0;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      filter: brightness(1.08);
    }
  }
}
</style> 