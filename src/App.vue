<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // TODO language change do we need it i18n required for that
};
</script>

<style lang="scss">
  @import './assets/scss/main.scss';
</style>
