<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { apiService } from '@/services/api'
import { useRouter } from 'vue-router'
import HeaderLinks from '@/components/HeaderLinks.vue'

const router = useRouter()
const { t, locale } = useI18n()

const toggleLocale = () => {
  const newLocale = locale.value === 'en' ? 'ru' : 'en'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
  location.reload()
}

const accountData = ref(JSON.parse(localStorage.getItem('account')))
const isAuthorized = ref(!!localStorage.getItem('account'))

async function handleLogout() {
  try {
    await apiService.logout()
    router.push('/login')
  } catch (err) {
    console.error('Error logging out:', err)
  }
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
      <HeaderLinks />
    </div>
  </header>
  <RouterView />
</template>
