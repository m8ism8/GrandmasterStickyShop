<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { apiService } from '@/services/api'
import { useRouter } from 'vue-router'

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
      <div>
        <a class="header__nav-link" @click="toggleLocale">{{ locale.toUpperCase() }}</a>
        <RouterLink
          to="/login"
          class="header__nav-link"
          v-if="$route.name !== 'login' && !isAuthorized"
          >Authorize</RouterLink
        >
        <a
          class="header__nav-link"
          @click="handleLogout"
          v-if="$route.name !== 'login' && isAuthorized"
          >Logout</a
        >

        <a
          class="header__nav-link"
          @click="$router.push({ query: { login: 'true' } })"
          v-if="$route.name === 'login' && !$route.query.login"
          >Login
        </a>

        <a
          class="header__nav-link"
          @click="$router.push({ query: {} })"
          v-if="$route.name === 'login' && $route.query.login"
          >Register
        </a>
      </div>
    </div>
  </header>
  <RouterView />
</template>
