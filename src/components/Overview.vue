<template>
    <div v-if="overviewRoute === 'DEV'">
        <overview-prod></overview-prod>
    </div>
    <div v-else-if="overviewRoute === 'TEST'">
        <overview-prod></overview-prod>
    </div>
    <div v-else>
        <overview-prod></overview-prod>
    </div>
</template>

<script>
import OverviewProd from "./overview/OverviewProd.vue";
//import OverviewTest from "./overview/OverviewTest.vue";
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