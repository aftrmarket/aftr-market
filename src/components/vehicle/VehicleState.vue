<template> 
    <div class="pt-4 w-full">
        <vue-json-pretty :path="'res'" :data="vehicle" :showDoubleQuotes="keyQuotes" :deep="depth" :deepCollapseChildren="true" :showLength="true" :showSelectController="true"> </vue-json-pretty>
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
            keyQuotes: false,
            depth: 3,
        };
    },
    computed: {
        
    },
    methods: {
        
    },
    async created() {

    }
}
</script>