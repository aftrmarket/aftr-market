<template> 
    <div class="grid grid-cols-2 gap-4 p-4 border">
        <div class="col-span-2">Contract Comparison</div>
        <div class="pt-4 w-full">
            <p class="font-sans font-lg text-aftrBlue">SmartWeave</p><br/>
            <vue-json-pretty :path="'res'" :data="contract" :showDoubleQuotes="keyQuotes" :deep=depth :deepCollapseChildren="false" :showLength="true" :showSelectController="true"> </vue-json-pretty>
        </div>
        <div class="pt-4 w-full">
            <p class="font-sans font-lg text-aftrBlue">3EM</p><br/>
            <vue-json-pretty :path="'res'" :data="contract3" :showDoubleQuotes="keyQuotes" :deep=depth :deepCollapseChildren="false" :showLength="true" :showSelectController="true"> </vue-json-pretty>
        </div>
    </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { readContract } from 'smartweave';
import { executeContract } from "@three-em/js";

export default {
    props: ["contractId"],
    components: { VueJsonPretty },
    data() {
        return {
            contract: {},
            contract3: {},
            keyQuotes: true,
            depth: 3,
            
            arweave: {},
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            gatewayConfig: {
                host: import.meta.env.VITE_ARWEAVE_HOST,
                port: import.meta.env.VITE_ARWEAVE_PORT,
                protocol: import.meta.env.VITE_ARWEAVE_PROTOCOL
            },
        };
    },
    computed: {
        
    },
    methods: {
        async readContracts() {
            // Using Smartweave
            this.contract = await readContract(this.arweave, this.contractId, undefined, true);
            this.contract3 = await executeContract(this.contractId, undefined, true, this.gatewayConfig);
        }
    },
    async created() {
        try {
            this.arweave = await Arweave.init({
                host: this.arweaveHost,
                port: this.arweavePort,
                protocol: this.arweaveProtocol,
                timeout: 20000,
                logging: true,
            });
        } catch (error) {
            console.log(error);
            return false;
        }
        await this.readContracts();
    }
}
</script>