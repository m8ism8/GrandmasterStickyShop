<script setup>
import TheBanner from '../components/banner.vue'
import {ref} from 'vue'
const items = ref(
  [{
    item: 'Smartphones and Accesories',
    img: 'https://placehold.co/200x200'
  },{
    item: 'Smartphones and Accesories',
    img: 'https://placehold.co/200x200'
  },{
    item: 'Smartphones and Accesories',
    img: 'https://placehold.co/200x200'
  },{
    item: 'Smartphones and Accesories',
    img: 'https://placehold.co/200x200'
  },{
    item: 'Smartphones and Accesories',
    img: 'https://placehold.co/200x200'
  },{
    item: 'Smartphones and Accesories',
    img: 'https://placehold.co/200x200'
  }]
)
</script>

<style scoped lang="scss">
.categories{
  height: 800px;
  background: #f5f5f5;
  padding: 50px 0;
  h2{
    font-size: 36px;
    text-align: center;
  }
  &__slider{
    max-width: 900px;
    margin: 30px auto;
    display: flex;
    flex-flow: wrap;
    justify-content: space-evenly;
    
    &-card{
      text-align: center;
      max-width: 200px;
      min-height: 300px;
      margin: 20px 0;
      background: #fff;
      border-radius: 20px;
      padding: 20px;
      p{
        margin: 10px 0;
        font-size: 28px;
      }
    }
  }
}
</style>

<template>
  <main>
    <TheBanner/>
    <div class="categories">
      <h2>Internet shop in Grandmaster Sticky Shop</h2>
      <div class="categories__slider">
        <div class="categories__slider-card" v-for="(item,index) in items" :key="index">
          <img :src="item.img"/>
          <p>{{ item.item }}</p>
        </div>
      </div>
    </div>
  </main>
</template>
