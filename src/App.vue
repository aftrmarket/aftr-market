<template>
    <div>
        <the-header></the-header>
        <router-view></router-view>
        <the-footer></the-footer>
    </div>
</template>

<script>

import TheHeader from './components/layouts/TheHeader.vue';
import TheFooter from './components/layouts/TheFooter.vue';

export default {
  components: { TheHeader, TheFooter }
}

</script>