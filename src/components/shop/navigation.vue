<script setup>
import { RouterLink } from 'vue-router'
import { defineProps, ref } from 'vue'

const props = defineProps(['categories'])
</script>

<template>
    <div class="navigation">
        <RouterLink class="navigation-link" v-for="(category,index) in props.categories" :key="index">
        {{ category }}
        </RouterLink>
    </div>
</template>