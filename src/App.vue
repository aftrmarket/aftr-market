<template>
<div>
  <the-header></the-header>
  <router-view></router-view>
</div>
</template>

<script>

import TheHeader from './components/layouts/TheHeader.vue';

export default {
  components: { TheHeader }
}

</script>