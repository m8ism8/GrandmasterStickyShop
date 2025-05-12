<script setup>
import { ref } from 'vue'

const userData = ref(JSON.parse(localStorage.getItem('account')))
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
</style>

<template>
  <div class="container">
    <div class="profile">
      Welcome home
      <p>{{ userData.username }}</p>
    </div>
    <div class="orders">
      <div class="order"></div>
    </div>
  </div>
</template>
