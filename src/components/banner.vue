<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <div class="banner">
    <img class="banner-logo" src="../assets/icons/logo.png" style="" />
    <div class="banner__text">
      <h1>{{ t('banner.title') }}</h1>
      <p>{{ t('banner.subtitle') }}</p>
    </div>
  </div>
</template>
