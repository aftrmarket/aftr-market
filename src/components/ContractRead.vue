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
                ARWEAVE_HOST: import.meta.env.VITE_ARWEAVE_HOST,
                ARWEAVE_PORT: import.meta.env.VITE_ARWEAVE_PORT,
                ARWEAVE_PROTOCOL: import.meta.env.VITE_ARWEAVE_PROTOCOL
            },
        };
    },
    computed: {
        
    },
    methods: {
        async readContracts() {
            try {
                // Using Smartweave
                this.contract = await readContract(this.arweave, this.contractId, undefined, true);
                //this.contract = await readContract(this.arweave, "HKr5pJhPUAzlGvQqERPLwIw9hm2nAr3CY-b0iRfctN4", undefined, true);
            } catch (e) {
                console.log(e);
            }

            try{
                // Using 3EM
                //this.contract3 = await executeContract(this.contractId, undefined, true, this.gatewayConfig);
                //const { state, validity } = await executeContract(this.contractId, undefined, true, this.gatewayConfig);
                //const { state, validity } = await executeContract("Vjt13JlvOzaOs4St_Iy2jmanxa7dc-Z3pDk3ktwEQNA", undefined, true, 
                //this.contract3 = await executeContract("HKr5pJhPUAzlGvQqERPLwIw9hm2nAr3CY-b0iRfctN4", undefined, true, 
                //const { state, validity } = await executeContract(this.contractId, undefined, true,
                //     {
                //         ARWEAVE_HOST: "www.arweave.run",
                //         ARWEAVE_PORT: "443",
                //         ARWEAVE_PROTOCOL: "https"
                //     }
                // );
                this.contract3 = await executeContract(this.contractId, undefined, true,
                    {
                        ARWEAVE_HOST: "www.arweave.run",
                        ARWEAVE_PORT: "443",
                        ARWEAVE_PROTOCOL: "https"
                    }
                );
                // this.contract3 = state;
                // this.contract3 = await executeContract(this.contractId, undefined, true,
                // {
                //     ARWEAVE_HOST: import.meta.env.VITE_ARWEAVE_HOST,
                //     ARWEAVE_PORT: import.meta.env.VITE_ARWEAVE_PORT,
                //     ARWEAVE_PROTOCOL: import.meta.env.VITE_ARWEAVE_PROTOCOL
                // });
                //console.log(JSON.stringify(state));
                //this.contract3 = state;
            } catch(e) {
                console.log(e);
            }
        }
    },
    async created() {
        try {
            // this.arweave = await Arweave.init({
            //     host: this.arweaveHost,
            //     port: this.arweavePort,
            //     protocol: this.arweaveProtocol,
            //     timeout: 20000,
            //     logging: true,
            // });
            this.arweave = await Arweave.init({
                host: "www.arweave.run",
                port: "443",
                protocol: "https",
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