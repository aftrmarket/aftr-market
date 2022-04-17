<template> 
    <div class="pt-4 w-full">
        <vue-json-pretty :path="'res'" :data="state" :showDoubleQuotes="keyQuotes" :deep=depth :deepCollapseChildren="false" :showLength="true" :showSelectController="true"> </vue-json-pretty>
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
            keyQuotes: false,
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