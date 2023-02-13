<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" auto-reopen="true" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                    leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div
                        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="bg-white px-4 pt-5 pb-2">
                            <div class="sm:flex sm:items-start">
                                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-aftrBlue sm:mx-0 sm:h-10 sm:w-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
                                        <path fill-rule="evenodd"
                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                                            clip-rule="evenodd" />
                                    </svg>

                                </div>
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                                        Run Asset Directives
                                    </DialogTitle>
                                    <div v-if="arConnected" class="pt-6">
                                        <select v-model="selectedPstId" @change="fetchContract" id="selectedPstId" name="selectedPstId"
                                            class="mt-1 block w-3/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                            <option value="" disabled selected>
                                                Select Asset
                                            </option>
                                            <option v-for="pst in filteredTokens()" :key="pst.tokenId" :value="pst.tokenId">
                                                {{ pst.name }} ({{ pst.tokenId }})
                                            </option>
                                        </select>
                                    </div>
                                    <!-- <div v-if="selectedPstId !== ''">
                                        <div class="pt-6 pb-4">
                                            <label class="block text-sm font-medium text-gray-700">
                                                <span>Select an interaction to run:</span>
                                            </label>
                                        </div>
                                        <select v-model="pstInputTokens" @change=""
                                            class="mt-1 block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                            <option value="" disabled selected>
                                                Select Interaction
                                            </option>
                                            <option v-for="action in this.actions" :key="action.name">
                                                {{ action.name }}
                                            </option>
                                        </select>
                                    </div> -->
                                    <textarea v-model="inputStr" class="p-2 w-3/4 mt-4" rows="10"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end">
                            <!-- TODO : Button click -->
                            <button type="button" v-if="isInputValid && selectedPstId !== ''"
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                @click="runInput">
                                Run
                            </button>
                            <button type="button"
                                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-aftrRed hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                @click="$emit('close')" ref="cancelButtonRef">
                                Cancel
                            </button>
                        </div>

                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import { ref } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import { mapGetters } from 'vuex';
import RepoAlert from './RepoAlert.vue';
import Aftr from "aftr-market";
import { warpRead, warpWrite } from '../utils/warpUtils.js';

export default {
    props: ['repo'],
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        ExclamationCircleIcon,
        RepoAlert
    },
    data() {
        return {
            selectedPstId: "",
            actions: {},
            inputStr: JSON.stringify({
                "function": "mint",
                "qty": 22
            }, null, 4),
            // "{\n\t\n}",


            pstInputTokens: null,
            pstSelected: false,
            inputValid: false,                              // Boolean to show when any input field is invalid
            pstInputValid: false,                           // Boolean to show when amount goes over tokens held
            nameValid: false,                               // Boolean for valid repo name
            tickerValid: false,                             // Boolean for valid ticker name
            pricePerToken: null,                            // Selected PST's price
            pstValue: null,                                 // pricePerShare * inputShares
            totalValue: null,
            msg: "",
            walletPsts: [],
            nfTokenId: "",
            nfAmountValid: false,
            nfTokenValid: false,
            nfTokenBal: 0,
            nfTokenTicker: "",
            nfTokenName: "",
            nfMsg: "",
        }
    },
    computed: {
        isInputValid() {
            try {
                return JSON.parse(this.inputStr)
            }
            catch (e) {
                return 0
            }
        },
        ...mapGetters(['arConnected', 'getActiveAddress', 'keyFile']),
    },
    methods: {
        filteredTokens() {
            let seen = {}
            for (let token of this.repo.tokens) {
                if (!seen.hasOwnProperty(token.tokenId)) {
                    seen[token.tokenId] = token
                }
            }
            return (Object.values(seen))
        },
        async fetchContract() {
            // assuming on test or prod
            let route = 'https://gateway.warp.cc/gateway/contract?txId=' + this.selectedPstId + (this.network === 'TEST' ? '&testnet=true' : '')
            let response = await fetch(route)
            let data = await response.json()
            let source = data.src
        },
        async runInput() {
            let interaction = {
                "function": "propose",
                "type": "externalInteraction",
                "target": this.selectedPstId,  // Token ID that you're calling the interaction on
                "value": this.inputStr.replace(/\s+/g, '')  // Input that you want to run on the token.  Note, that the double quotes must be delimited.
            }
            let tx = await warpWrite(this.repo.id, interaction);  // This is from my warpUtils in my test app.  I think the network property is different in our regular warpUtils
            console.log(tx);
        },
        async arConnect() {
            await this.$store.dispatch('arConnect');
        },
    },
    created() {
        this.walletPsts = this.$store.getters.getActiveWallet.psts.filter(pst => pst.contractId !== this.repo.id);
    },
    setup() {
        const open = ref(true)

        return {
            open,
        }
    },
}
</script>
