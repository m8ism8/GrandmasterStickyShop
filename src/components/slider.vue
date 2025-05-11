<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

import {defineProps, ref} from 'vue'

import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps(['items'])
const items = ref(props.items)
</script>

<template>
    
    <div class="categories">
      <h2>Internet shop in Grandmaster Sticky Shop</h2>
      
      <Swiper
        :slides-per-view="3"
        :slides-per-group="3"
        :modules="[Navigation]"
        :navigation="true"
        class="categories__slider mySwiper"
      >
        <SwiperSlide v-for="(item, i) in items" :key="i" >
          <div class="categories__slider-card slide">
            <img :src="item.img"/>
            <p>{{ item.item }}</p>
          </div>
        </SwiperSlide>
      </Swiper>
      <!-- <div class="categories__slider">
        <div class="categories__slider-card" v-for="(item,index) in items" :key="index">
        </div>
      </div> -->
    </div>
</template>