<template> 
    <div class="pt-4 w-full">
        <perfect-scrollbar>
            <vue-json-pretty :path="'res'" :data="state" :showDoubleQuotes="keyQuotes" :deep=depth :deepCollapseChildren="false" :showLength="true" :showSelectController="true"> </vue-json-pretty>
        </perfect-scrollbar>
    </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
    props: ["vehicle"],
    components: { VueJsonPretty },
    data() {
        return {
            state: {},
            keyQuotes: true,
            depth: 3,
        };
    },
    computed: {
        
    },
    methods: {
        cleanupState(){
            /*** 
             * When a vehicle is created, a few keys are added to make them easier to access on the site.
             * This routine strips those keys so the UI just shows the state.
            ***/
           this.state = JSON.parse(JSON.stringify(this.vehicle));
           delete this.state.id;
           delete this.state.logo;
           delete this.state.desc;
        }
    },
    async created() {
        this.cleanupState();
    }
}
</script>

<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>
<style scoped>
    .ps {
        height: 750px;
    }   
</style>