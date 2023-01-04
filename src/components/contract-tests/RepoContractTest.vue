<template>
    <div class="pt-4 w-full">
        <div class="flex flex-col">
            <select v-model="selectInput" @change="loadInput"
                class="w-64 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md">
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
            <textarea v-model="input" rows="10"
                class=" mt-2 w-3/4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md" />
            <div class="mt-2" v-if="readyToTest">
                <button @click="testContract" type="button"
                    class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Test Contract (Dry Run)
                </button>
                <button @click="testContract('real')" type="button"
                    class="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Test Contract
                </button>
            </div>

            <div v-if="readyToOutput" class="mt-4">
                <label class="">Output:</label>
                <div class="mt-2 text-sm flex flex-row">
                    <label class="pl-1">Status: </label>
                    <label class="pl-2 text-green-700 font-mono">{{ outputType }}</label>
                </div>
                <div class="mt-2 mb-2 text-sm flex flex-row">
                    <label class="pl-1">Result: </label>
                    <label class="pl-2 text-green-700 font-mono">{{ outputResult }}</label>
                </div>
                <label class="text-sm pl-1">State: </label>
                <div class="border border-gray-200 mt-2 mb-2 w-full pt-2 pb-2">
                    <perfect-scrollbar>
                        <vue-json-pretty :path="'res'" :data="outputState" :showDoubleQuotes="keyQuotes" :deep=depth
                            :deepCollapseChildren="false" :showLength="true" :showSelectController="true">
                        </vue-json-pretty>
                    </perfect-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { interactWrite, interactWriteDryRun } from "smartweave";
//import { executeContract } from "@three-em/js";
import { mapGetters } from 'vuex';

import inputBalance from "./inputs/balance.json";
import inputPropose from "./inputs/propose.json";
import inputTransfer from "./inputs/transfer.json";
import inputDeposit from "./inputs/deposit.json";
import inputWithdrawal from "./inputs/withdrawal.json";
import inputReadOutbox from "./inputs/readOutbox.json";
import inputVote from "./inputs/vote.json";
import inputMultiInteraction from "./inputs/multiInteraction.json";
import { warpRead, warpWrite } from '../utils/warpUtils.js';

export default {
    props: ["repo"],
    components: { VueJsonPretty },
    data() {
        return {
            keyQuotes: true,
            depth: 3,
            selectInput: "",
            input: "Please select a function.",
            output: { message: "Waiting for input..." },
            readyToTest: false,
            readyToOutput: false,
            outputType: "",
            outputResult: "",
            outputState: "",


            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            arweaveMine: import.meta.env.VITE_MINE,
        };
    },
    computed: {
        inputString() {
            if (JSON.stringify(this.input).includes("{")) {
                return JSON.stringify(this.input, null, 4);
            } else {
                return this.input;
            }
        },
    },
    methods: {
        cleanupState() {
            /*** 
             * When a repo is created, a few keys are added to make them easier to access on the site.
             * This routine strips those keys so the UI just shows the state.
            ***/
            this.state = JSON.parse(JSON.stringify(this.repo));
            delete this.state.id;
            delete this.state.logo;
            delete this.state.desc;
        },
        loadInput() {
            this.readyToTest = true;
            this.readyToOutput = false;
            this.output = "Press the Test Contract button to to test the input.";
            let fileInput = {};
            if (this.selectInput === "balance") {
                fileInput = JSON.stringify(inputBalance);
            } else if (this.selectInput === "propose") {
                fileInput = JSON.stringify(inputPropose);
            } else if (this.selectInput === "transfer") {
                fileInput = JSON.stringify(inputTransfer);
            } else if (this.selectInput === "deposit") {
                fileInput = JSON.stringify(inputDeposit);
            } else if (this.selectInput === "withdrawal") {
                fileInput = JSON.stringify(inputWithdrawal);
            } else if (this.selectInput === "readOutbox") {
                fileInput = JSON.stringify(inputReadOutbox);
            } else if (this.selectInput === "vote") {
                fileInput = JSON.stringify(inputVote);
            } else if (this.selectInput === "multiInteraction") {
                fileInput = JSON.stringify(inputMultiInteraction);
            } else {
                this.readyToTest = false;
            }



            if (this.readyToTest) {
                this.input = JSON.stringify(JSON.parse(fileInput), null, 4);
            } else {
                this.input = "This function input has not been written yet."
            }

        },
        async testContract(type = "dry") {
            let arweave = {};

            try {
                arweave = await Arweave.init({
                    host: this.arweaveHost,
                    port: this.arweavePort,
                    protocol: this.arweaveProtocol,
                    timeout: 20000,
                    logging: true,
                });
            } catch (e) {
                this.$swal({
                    icon: "error",
                    html: "Failed to connect to the Arweave Gateway.",
                    showConfirmButton: true,
                    allowOutsideClick: false
                });
                return;
            }


            const wallet = "use_wallet";
            this.$swal({
                icon: "info",
                html: "Please wait while the input test is running...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.$swal.showLoading()
                },
            });
            let response = await warpWrite(this.repo.id, inputObj);


            // Handle the output
            console.log(JSON.stringify(response));
            this.outputType = response.type;
            this.outputResult = response.result;
            this.outputState = response.state;
            this.readyToOutput = true;

            /***
             * type = ok or error
             * result = "message"
             * state = {}
             */

            /**** IN ORDER FOR THIS TO PROCESS, YOU NEED TO RUN http://localhost:1984/mine */
            if (type !== "dry") {
                if (Boolean(this.arweaveMine)) {
                    const mineUrl = this.arweaveProtocol + "://" + this.arweaveHost + ":" + this.arweavePort + "/mine";
                    const response = await fetch(mineUrl);
                }
            }

            // this.$swal({
            //     icon: "info",
            //     html: "Getting new repo state...",
            //     showConfirmButton: false,
            //     allowOutsideClick: false,
            //     didOpen: () => {
            //         this.$swal.showLoading()
            //     },
            // });

            // try {
            //     const stateInteractions = await executeContract(this.repo.id, undefined, true, {
            //         ARWEAVE_HOST: import.meta.env.VITE_ARWEAVE_HOST,
            //         ARWEAVE_PORT: import.meta.env.VITE_ARWEAVE_PORT,
            //         ARWEAVE_PROTOCOL: import.meta.env.VITE_ARWEAVE_PROTOCOL
            //     });
            //     this.output = stateInteractions;
            // } catch(e) {
            //     this.output = "Error executing contract: " + e;
            // }

            this.$swal.close();
        },
    },
    async created() {
        //this.cleanupState();
    }
}
</script>















<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>
<style scoped>
.ps {
    height: 750px;
}
</style>