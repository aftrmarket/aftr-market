<template>
    <div v-if="overviewRoute === 'DEV'">
        <overview-test></overview-test>
    </div>
    <div v-else-if="overviewRoute === 'TEST'">
        <overview-test></overview-test>
    </div>
    <div v-else>
        <overview-prod></overview-prod>
    </div>
</template>

<script>
import OverviewProd from "./overview/OverviewProd.vue";
import OverviewTest from "./overview/OverviewTest.vue";
import OverviewDev from "./overview/OverviewDev.vue";

export default {
    components: { OverviewProd, OverviewTest, OverviewDev },
    props: { 
        siteMode: { type: String, required: false }
    },
    data() {
        return {
            overviewRoute: import.meta.env.VITE_ENV,
            //overviewRoute: "TEST"
        };
    },
}
</script>