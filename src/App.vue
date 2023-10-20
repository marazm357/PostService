<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/pages/NavbarPage.vue';

  export default {
    components: { Navbar }
}
</script>

<style lang="scss">
* {
margin: 0;
padding: 0;
box-sizing: border-box;
}
.app {
padding: 20px;
}
</style>