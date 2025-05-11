<script setup>
import TheBanner from '../components/banner.vue'
import TheSlider from '../components/slider.vue'

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

<style lang="scss">
</style>

<template>
  <main>
    <TheBanner/>
    <TheSlider :items="items"/>
  </main>
</template>
