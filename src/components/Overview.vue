<template>
    <div v-if="overviewRoute === 'DEV'">
        <overview-dev></overview-dev>
    </div>
    <div v-else-if="overviewRoute === 'TEST'">
        NEED TO BUILD
    </div>
    <div v-else>
        <overview-prod></overview-prod>
    </div>
</template>

<script>
import OverviewProd from "./overview/OverviewProd.vue";
import OverviewDev from "./overview/OverviewDev.vue";

export default {
    components: { OverviewProd, OverviewDev },
    props: { 
        siteMode: { type: String, required: false }
    },
    data() {
        return {
            //overviewRoute: import.meta.env.VITE_ENV,
            overviewRoute: "PROD"
        };
    },
}
</script>