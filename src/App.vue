<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>


<template>
  <header>

    <div class="wrapper">
      <img src="./assets/icons/logo.png" style="max-width: 70px;"/>
      <nav class="header__nav">
        <RouterLink to="/" class="header__nav-link">Home</RouterLink>
        <RouterLink to="/about" class="header__nav-link">Shop</RouterLink>
        <RouterLink to="/about" class="header__nav-link">Grandmaster Guide</RouterLink>
      </nav>
      <div>
        <a class="header__nav-link">Ru</a>
        <a class="header__nav-link">Eng</a>
      </div>
    </div>
  </header>

  <RouterView />
</template>

