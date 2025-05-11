<script setup>

import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const categories = ref([
  'All categories', 'Smartphones and Gadgets', 'Appliances', 'Tv, Audio, Video', 'Computers', 'Furniture', 'Beauty', 'For children', 'Pharmacy'
])

</script>

<style lang="scss">
.container{
  max-width: 1000px;
  margin: 0 auto;
}
.navigation{
  max-width: 1000px;
  margin: 25px auto;
  display: flex;
  justify-content: space-around;
  max-height: 100px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  &-link:first-child{
    border-left: 1px solid #e5e5e5;
  }
  &-link{
    display: flex;
    align-items: center;
    text-align: center;
    padding: 10px 20px;
    font-size: 22px;
    border-right: 1px solid #e5e5e5;
    color: #555555;
  }
}
</style>
<template>
  <div class="container">
    <div class="navigation">
      <RouterLink class="navigation-link" v-for="(category,index) in categories" :key="index">
        {{ category }}
      </RouterLink>
    </div>
  </div>
</template>
