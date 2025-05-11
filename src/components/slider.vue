<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps(['items'])
</script>

<template>
  <div class="categories">
    <h2>{{ t('categories.title') }}</h2>

    <Swiper
      :slides-per-view="3"
      :slides-per-group="3"
      :modules="[Navigation]"
      :navigation="true"
      class="categories__slider mySwiper"
    >
      <SwiperSlide v-for="(item, i) in props.items" :key="i">
        <div class="categories__slider-card slide">
          <img :src="item.img" style="max-width: 200px" />
          <p style="margin-top: 25px">{{ item.item }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
    <!-- <div class="categories__slider">
        <div class="categories__slider-card" v-for="(item,index) in items" :key="index">
        </div>
      </div> -->
  </div>
</template>
