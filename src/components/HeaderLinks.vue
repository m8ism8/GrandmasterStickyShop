<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onUnmounted, watch } from 'vue'
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

// Watch for changes in localStorage
const checkLocalStorage = () => {
  const newAccountData = JSON.parse(localStorage.getItem('account'))
  if (JSON.stringify(newAccountData) !== JSON.stringify(accountData.value)) {
    location.reload()
  }
}

// Set up an interval to check localStorage
let intervalId

onMounted(() => {
  // Check every 100ms
  intervalId = setInterval(checkLocalStorage, 10)
})

onUnmounted(() => {
  // Clear the interval when component is unmounted
  clearInterval(intervalId)
})

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
  <div class="routerlinks">
    <a class="header__nav-link" @click="toggleLocale">{{ locale.toUpperCase() }}</a>
    <RouterLink to="/login" class="header__nav-link" v-if="$route.name !== 'login' && !isAuthorized"
      >Authorize</RouterLink
    >
    <a
      class="header__nav-link"
      @click="handleLogout"
      v-if="$route.name === 'profile' && isAuthorized"
      >Logout</a
    >
    <RouterLink
      class="header__nav-link"
      to="/profile"
      v-if="$route.name !== 'profile' && isAuthorized"
      >{{ accountData.username }}</RouterLink
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
</template>

<style lang="scss" scoped>
.routerlinks {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
