<template> 
    <div class="pt-4 w-full">
        <div class="flex flex-col">
            <select v-model="selectInput" @change="loadInput" class="w-64">
                <option value="" disabled>Select Function</option>
                <option value="balance">Balance</option>
                <option value="propose">Propose</option>
                <option value="vote">Vote</option>
                <option value="transfer">Transfer</option>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="multiInteraction">Multi-Interaction</option>
                <option value="readOutbox">Read Outbox</option>
            </select>

            <label class="mt-4">Input:</label>
            <div class="border border-gray-200 mt-2 mb-2 w-3/4 pt-2 pb-2">
                <textarea v-model="inputString" rows="4" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
            </div>
            <div>
                <button v-if="readyToTest" @click="testContract" type="button" class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Test Contract
                </button>
            </div>

            <label class="mt-4">Output:</label>
            <div class="border border-gray-200 mt-2 mb-2 w-3/4 pt-2 pb-2">
                <perfect-scrollbar>
                    <vue-json-pretty :path="'res'" :data="output" :showDoubleQuotes="keyQuotes" :deep=depth :deepCollapseChildren="false" :showLength="true" :showSelectController="true"> </vue-json-pretty>
                </perfect-scrollbar>
            </div>
        </div>
    </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { interactWrite } from "smartweave";
import { executeContract } from "@three-em/js";
import { mapGetters } from 'vuex';

import inputBalance from "./inputs/balance.json";
import inputPropose from "./inputs/propose.json";

export default {
    props: ["vehicle"],
    components: { VueJsonPretty },
    data() {
        return {
            keyQuotes: true,
            depth: 3,
            selectInput: "",
            input: { message: "Please select a function." },
            output: { message: "Waiting for input..." },
            readyToTest: false,


            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            arweaveMine: import.meta.env.VITE_MINE,
        };
    },
    computed: {
        inputString() {
            return JSON.stringify(this.input, null, 4);
        },
        ...mapGetters(['keyFile']),
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
        },
        loadInput() {
            this.readyToTest = true;
            if (this.selectInput === "balance") {
                this.input = inputBalance;
            } else if (this.selectInput === "propose") {
                this.input = inputPropose;
            } else {
                this.readyToTest = false;
                this.input = { message: "This function is not setup yet." } ;
            }
            
        },
        async testContract() {
            let arweave = {};

            try {
                arweave = await Arweave.init({
                        host: this.arweaveHost,
                        port: this.arweavePort,
                        protocol: this.arweaveProtocol,
                        timeout: 20000,
                        logging: true,
                        });
            } catch(e) {
                this.$swal({
                    icon: "error",
                    html: "Failed to connect to the Arweave Gateway.",
                    showConfirmButton: true,
                    allowOutsideClick: false
                });
                return;
            }


            let wallet;
            if (import.meta.env.VITE_ENV === "DEV") {
                if(this.keyFile.length){
                    wallet =  JSON.parse(this.keyFile)
                } else {
                    // alert("Please attach your keyfile")
                    this.$swal({
                        icon: 'warning',
                        html: "Please attach your keyfile",
                    })
                }        
            } else {
                return;
            }
            this.$swal({
                icon: "info",
                html: "Please wait while the input test is running...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.$swal.showLoading()
                },
            });
            try {
                if (import.meta.env.VITE_ENV === "DEV") {
                    const txid = await interactWrite(arweave, wallet, this.vehicle.id, this.input);
                    console.log(JSON.stringify(txid));
                }
            } catch(e) {
                this.$swal({
                    icon: "error",
                    html: "Failed to write to the Permaweb.  Please try again.",
                    showConfirmButton: true,
                    allowOutsideClick: false
                });
            }

            /**** IN ORDER FOR THIS TO PROCESS, YOU NEED TO RUN http://localhost:1984/mine */
            if(Boolean(this.arweaveMine)){
                const mineUrl = this.arweaveProtocol + "://" + this.arweaveHost + ":" + this.arweavePort + "/mine";
                const response = await fetch(mineUrl);
            }

            this.$swal({
                icon: "info",
                html: "Getting new vehicle state...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.$swal.showLoading()
                },
            });

            try {
                const stateInteractions = await executeContract(this.vehicle.id, undefined, true, {
                    ARWEAVE_HOST: import.meta.env.VITE_ARWEAVE_HOST,
                    ARWEAVE_PORT: import.meta.env.VITE_ARWEAVE_PORT,
                    ARWEAVE_PROTOCOL: import.meta.env.VITE_ARWEAVE_PROTOCOL
                });
                this.output = stateInteractions;
            } catch(e) {
                this.output = "Error executing contract: " + e;
            }

            this.$swal.close();
        },
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