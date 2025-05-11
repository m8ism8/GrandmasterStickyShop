<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const toggleLocale = () => {
  const newLocale = locale.value === 'en' ? 'ru' : 'en'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
  location.reload()
}
</script>

<template>
  <header>
    <div class="wrapper">
      <img src="./assets/icons/logo.png" style="max-width: 70px" />
      <nav class="header__nav">
        <RouterLink to="/" class="header__nav-link">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/shop" class="header__nav-link">{{ t('nav.shop') }}</RouterLink>
        <RouterLink to="/about" class="header__nav-link">{{ t('nav.guide') }}</RouterLink>
      </nav>
      <div>
        <a class="header__nav-link" @click="toggleLocale">{{ locale.toUpperCase() }}</a>
      </div>
    </div>
  </header>
  <RouterView />
</template>
