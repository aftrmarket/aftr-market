<template>
    <!--<div class="grid grid-cols-2 gap-4 p-4 border">
        <div class="col-span-2">Contract Comparison</div>
        <div class="pt-4 w-full">
            <p class="font-sans font-lg text-aftrBlue">3EM</p><br/>
            <vue-json-pretty :path="'res'" :data="contract" :showDoubleQuotes="keyQuotes" :deep=depth :deepCollapseChildren="false" :showLength="true" :showSelectController="true"> </vue-json-pretty>
        </div>
        <div class="pt-4 w-full">
            <p class="font-sans font-lg text-aftrBlue">Warp</p><br/>
            <vue-json-pretty :path="'res'" :data="contract3" :showDoubleQuotes="keyQuotes" :deep=depth :deepCollapseChildren="false" :showLength="true" :showSelectController="true"> </vue-json-pretty>
        </div>
    </div>-->
    <div class="grid grid-cols-1 gap-4 p-4 border">
        <div class="pt-4 w-full">
            <p class="font-sans font-lg text-aftrBlue">Warp</p><br/>
            <vue-json-pretty :path="'res'" :data="contract3" :showDoubleQuotes="keyQuotes" :deep=depth :deepCollapseChildren="false" :showLength="true" :showSelectController="true"> </vue-json-pretty>
        </div>
    </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
// import { readContract } from 'smartweave';
//import { executeContract } from "@three-em/js";
// import { WarpFactory, defaultCacheOptions } from 'warp-contracts/web';
import { warpRead } from "./utils/warpUtils.js";

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
        async readContract() {
            //let contractId = "Tb9kKmUqvNw_HnWgroWkRQK8Fa8frxl7CKA3zSsrETc";
            let contractId = this.contractId;
            // if (this.contractId === "") {
            //     return;
            // }
            const result = await warpRead(contractId);
            console.log(JSON.stringify(result.state));
            this.contract3 = result;
            this.contractState = result;
            this.contractSrcId = await this.getContractSourceId(contractId);
            this.findIdType(contractId);
        },
        async readContracts1() {
            let contractId = "Tb9kKmUqvNw_HnWgroWkRQK8Fa8frxl7CKA3zSsrETc";
            // try{
            //     // Using 3EM
            //     const { state, validity } = await executeContract(contractId, undefined, true, {
            //         ARWEAVE_HOST: import.meta.env.VITE_ARWEAVE_HOST,
            //         ARWEAVE_PORT: import.meta.env.VITE_ARWEAVE_PORT,
            //         ARWEAVE_PROTOCOL: import.meta.env.VITE_ARWEAVE_PROTOCOL
            //     });
            //     this.contract = { state, validity };
            // } catch(e) {
            //     console.log(e);
            // }


            // Try to get wallet, if fails, connect so user can assign permissions
            //let wallet = "";
            // try {
            //     wallet = await window.arweaveWallet.getActiveAddress();
            // } catch(e) {
            //     console.log(e);
            //     const promiseResult = await window.arweaveWallet.connect([
            //         "ACCESS_ADDRESS",
            //         "ACCESS_ALL_ADDRESSES",
            //         "SIGN_TRANSACTION",
            //         "ACCESS_ARWEAVE_CONFIG"
            //     ]);
            //     wallet = await window.arweaveWallet.getActiveAddress();
            // }
            let state1 = {};
            let state2 = {};

            try {
                // Using Warp
                let warp = {};

                warp = WarpFactory.forLocal();
                
                const contract = warp.contract(contractId)
                    .setEvaluationOptions( { internalWrites: true } )
                    //.connect("use_wallet");
                let result  = await contract.readState();
                state2 = result.cachedValue;
                this.contract = state2;
                
            } catch(e) {
                console.log(e);
            }

            // try {
            //     // Using Smartweave
            //     this.contract = await readContract(this.arweave, contractId, undefined, true);
            //     //this.contract = await readContract(this.arweave, "HKr5pJhPUAzlGvQqERPLwIw9hm2nAr3CY-b0iRfctN4", undefined, true);
            // } catch (e) {
            //     console.log(e);
            // }

            await new Promise(resolve => setTimeout(resolve, 5000));

            this.contract3 = state2;

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
            // this.arweave = await Arweave.init({
            //     host: "www.arweave.run",
            //     port: "443",
            //     protocol: "https",
            //     timeout: 20000,
            //     logging: true,
            // });
        } catch (error) {
            console.log(error);
            return false;
        }
        //await this.readContracts();
        await this.readContract();
    }
}
</script>