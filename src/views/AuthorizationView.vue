<script setup>
import { ref } from 'vue'
import { apiService } from '@/services/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const isSeller = ref(false)
const error = ref('')
function errorCheck() {
  if (!username.value || !password.value) {
    error.value = 'Fields should not be empty'
    return false
  }
  if (username.value.length < 3) {
    error.value = 'Username should be 3 symbols or more'
    return false
  }
  if (password.value.length < 3) {
    error.value = 'Password should be 8 symbols or more'
    return false
  }
  return true
}
async function register() {
  if (errorCheck()) {
    try {
      const response = await apiService.register({
        username: username.value,
        password: password.value,
        is_seller: isSeller.value,
      })
      // console.log('User registered:', response)
      localStorage.setItem('account', JSON.stringify(response))
      router.push({ name: 'home' })
    } catch (e) {
      error.value = e.message
      console.error('Registration failed:', e.message)
    }
  }
}
async function login() {
  if (errorCheck()) {
    try {
      const userData = await apiService.login(username.value, password.value)
      // userData will contain { username: 'your_username', is_seller: true/false }
      localStorage.setItem('account', JSON.stringify(userData))
      router.push({ name: 'home' })
    } catch (error) {
      console.error('Login failed:', error.message)
    }
  }
}
</script>
<style lang="scss">
.authorization {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &-checkbox {
    input,
    label {
      cursor: pointer;
    }
  }
  &-form {
    background: #f0f0f0;
    padding: 60px 50px 30px;
    display: flex;
    flex-flow: column;
    h2 {
      font-size: 36px;
      margin-bottom: 15px;
    }
    input {
      padding: 10px 20px;
      font-size: 24px;
      margin-bottom: 10px;
    }
    p {
      margin: 0 auto 10px;
      margin-top: 35px;
      color: red;
    }
    button {
      cursor: pointer;
      border: 0;
      padding: 15px 10px;
      margin: 0 auto;
      width: 75%;
      background-color: #fcd92d;
      font-size: 36px;
    }
    button:hover {
      filter: brightness(1.08);
    }
  }
}
</style>
<template>
  <div class="authorization">
    <form v-if="!$route.query.login" class="authorization-form" @submit.prevent="register">
      <h2>Register user</h2>
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <div class="authorization-checkbox" style="margin-top: 10px">
        <input type="checkbox" id="seller" v-model="isSeller" />
        <label for="seller"> Are you a seller? </label>
      </div>
      <p>{{ error }}</p>
      <button type="submit">Register user</button>
    </form>
    <form v-else class="authorization-form" @submit.prevent="login">
      <h2>Log in</h2>
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <p>{{ error }}</p>
      <button type="submit">Sign in</button>
    </form>
  </div>
</template>
