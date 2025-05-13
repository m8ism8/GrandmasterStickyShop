<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import HeaderLinks from '@/components/HeaderLinks.vue'

const { t } = useI18n()
</script>

<template>
  <header>
    <div class="wrapper">
      <img src="./assets/icons/logo.png" style="max-width: 70px" />
      <nav class="header__nav">
        <RouterLink to="/" class="header__nav-link">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/shop" class="header__nav-link">{{ t('nav.shop') }}</RouterLink>
      </nav>
      <HeaderLinks />
    </div>
  </header>
  <RouterView />
</template>
