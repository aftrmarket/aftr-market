<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" auto-reopen="true" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300"
                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div
                        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="bg-white px-4 pt-5 pb-2">
                            <div class="sm:flex sm:items-start">
                                <div
                                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="green">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                    </svg>
                                </div>
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                                        Add Assets to Repo
                                    </DialogTitle>
                                    <div v-if="arConnected" class="pt-6">
                                        <select v-model="selectedPstId" @change="pstChange" id="selectedPstId"
                                            name="selectedPstId"
                                            class="mt-1 block w-3/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                            <option value="" disabled selected>
                                                Select Asset
                                            </option>
                                            <option v-for="pst in walletPsts" :key="pst.contractId"
                                                :value="pst.contractId">
                                                {{ pst.name }} ({{ pst.contractId }})
                                            </option>
                                            <option value="NOT-FOUND">
                                                --Asset Not In List--
                                            </option>
                                        </select>
                                    </div>
                                    <div v-if="selectedPstId === 'NOT-FOUND'">
                                        <div class="pt-6 pb-4 flex flex-col">
                                            <label class="block text-sm font-medium text-gray-700">
                                                Please paste the Contract ID of the asset that you'd like to deposit.
                                            </label>
                                            <input type="text" placeholder="Asset ID (i.e. Contract ID)"
                                                v-model="nfTokenId" @input="readAssetContract"
                                                :class="inputBox(nfTokenId.length === 43)" />
                                            <div v-if="nfTokenValid" class="flex flex-col">
                                                <label class="block text-sm font-medium text-gray-700 pt-2 pb-2">
                                                    You have a balance of <span class="font-bold text-aftrBlue">{{
                                                            formatNumber(pstBalance - pstInputTokens)
                                                    }} {{ pstTicker }}</span><span> available to use in your repo.</span>
                                                </label>
                                                <input type="number" placeholder="Amount" v-model="pstInputTokens"
                                                    @input="calcPstPrice" :class="inputBox(pstInputValid)" />
                                            </div>
                                            <div v-else>
                                                <label class="block pt-2 text-sm font-medium text-aftrRed">
                                                    {{ nfMsg }}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="selectedPstId !== '' && selectedPstId !== 'NOT-FOUND'">
                                        <div class="pt-6 pb-4">
                                            <label class="block text-sm font-medium text-gray-700">
                                                You have <span class="font-bold text-aftrBlue">{{
                                                        formatNumber(pstBalance - pstInputTokens)
                                                }} {{ pstTicker}}</span><span> available to use in your repo.</span>
                                            </label>
                                        </div>
                                        <input type="number" placeholder="Amount" v-model="pstInputTokens"
                                            @input="calcPstPrice" :class="inputBox(pstInputValid)" />
                                        <span v-if="pstInputTokens && false" class="block text-xs pt-2 pl-4 pr-6">@ {{
                                                formatNumber(pricePerToken, true)
                                        }} AR {{ pstInputTokens ? " = " + formatNumber(pstValue, true) + " AR" : "" }}</span>
                                    </div>
                                    <!--
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to transfer these tokens from your
                      wallet to the repo? This action cannot be undone.
                    </p>
                  </div>
                  -->
                                </div>
                            </div>
                        </div>
                        <repo-alert v-if="pstInputValid && pstInputTokens" :repo="msg"></repo-alert>
                        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" v-if="pstInputValid && pstInputTokens"
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                @click="transferTokens">
                                Deposit
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
import numeral from "numeral";
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
        pstBalance() {
            if (this.nfAmountValid) {
                return this.nfTokenBal;
            } else {
                const currentPst = this.$store.getters.getActiveWallet.psts.find((item) => item.contractId === this.selectedPstId);
                return currentPst.balance;
            }
        },
        pstTicker() {
            if (this.nfAmountValid) {
                return this.nfTokenTicker;
            } else {
                const currentPst = this.$store.getters.getActiveWallet.psts.find((item) => item.contractId === this.selectedPstId);
                return currentPst.ticker;
            }
        },
        repoTokenBox() {
            if (this.repoTokensValid) {
                return "mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md";
            } else {
                return "mt-1 focus:ring-aftrRed focus:border-aftrRed shadow-sm sm:text-sm border-gray-300 rounded-md";
            }
        },
        memberTokenBox() {
            if (this.availableTokens < 0) {
                return "mt-1 focus:ring-aftrRed focus:border-aftrRed shadow-sm sm:text-sm border-gray-300 rounded-md";
            } else {
                return "mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md";
            }
        },
        isInputValid() {
            if (this.nameValid && this.tickerValid && this.repoTokensValid && this.memberRowValid) {
                return true;
            } else {
                return false;
            }
        },
        ...mapGetters(['arConnected', 'getActiveAddress', 'keyFile']),
    },
    methods: {
        formatNumber(num, dec = false) {
            if (dec) {
                return numeral(num).format("0,0.0000");
            } else {
                return numeral(num).format("0,0");
            }
        },
        printTokens(value) {
            if (Number(value) > 1) {
                return "Tokens";
            } else {
                return "Token";
            }
        },
        inputBox(valid) {
            if (valid) {
                return "mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md";
            } else {
                return "mt-1 focus:ring-aftrRed focus:border-aftrRed shadow-sm sm:text-sm border-gray-300 rounded-md";
            }
        },
        assetIdInputBox() {

        },
        async readAssetContract() {
            let msg = "";
            this.nfAmountValid = false;
            this.nfTokenValid = false;
            if (this.nfTokenId.length === 43) {
                msg = await this.isDepositAllowed(this.nfTokenId);
                if (msg !== "") {
                    this.nfMsg = msg;
                } else {
                    this.nfAmountValid = true;
                    this.nfTokenValid = true;
                }
            }
            if (!this.nfTokenValid) {
                this.nfMsg = msg;
            } else {
                this.nfMsg = "";
            }
        },
        async isDepositAllowed(contractId) {
            let msg = "";

            // Make sure user isn't trying to deposit asset of itself
            if (this.repo.id === contractId) {
                msg = "You can't deposit an asset to itself."
                return msg;
            }

            // Is internalWrite Supported?
            const stateInteractions = await warpRead(contractId);

            if (!stateInteractions || Object.keys(stateInteractions).length === 0) {
                msg = "This asset can't be found on the Permaweb."
                return msg;
            }

            /*** Changing to look for Warp's version of FCP which will require claims and claimable arrays. */
            //if (!stateInteractions.state.invocations || !stateInteractions.state.foreignCalls) {
            if (!stateInteractions.state.claims || !stateInteractions.state.claimable) {
                msg = "This asset doesn't support cross-contract communication so it can't be deposited into an AFTR repo.";
                return msg;
            }

            // Test to see if owner's balance would be 0
            if ((stateInteractions.state.ownership === "single") && (this.getActiveAddress === stateInteractions.state.owner) && (stateInteractions.state.balances[this.getActiveAddress] - Number(this.pstInputTokens) <= 0)) {
                msg = "Can't deposit this asset because the owner's balance of a single-owner repo would become 0.";
                return msg;
            }

            // Test to see if user has enough balance on the contract
            if (stateInteractions.state.balances[this.getActiveAddress] - Number(this.pstInputTokens) <= 0 || !stateInteractions.state.balances[this.getActiveAddress]) {
                msg = "Can't deposit this asset because you don't appear to have a balance on this contract.";
                return msg;
            }

            this.nfTokenBal = stateInteractions.state.balances[this.getActiveAddress];
            this.nfTokenTicker = stateInteractions.state.ticker;

            return msg;
        },
        async transferTokens() {
            this.msg = "Please wait for deposit into repo to complete..."

            /*** Depositing tokens process
             * 1. Setup Claim on token being deposited.
             * 2. Call AFTR contract to claim tokens and update the AFTR repo tokens object.
             */

            const quantity = Number(this.pstInputTokens);

            let pstId = "";
            if (this.selectedPstId === "NOT-FOUND" && this.nfTokenId !== "") {
                pstId = this.nfTokenId;
            } else {
                const currentPst = this.$store.getters.getActiveWallet.psts.find(
                    (item) => item.contractId === this.selectedPstId
                );
                pstId = currentPst.contractId;

                // If the token was selected, then the contract hasn't been read yet for validation
                const resultMsg = await this.isDepositAllowed(pstId);
                if (resultMsg !== "") {
                    this.$swal({
                        icon: "error",
                        html: resultMsg,
                        showConfirmButton: true,
                        allowOutsideClick: false,
                    });
                    this.pstInputValid = false;
                    this.msg = "";
                    return;
                }
            }

            // 1. Setup Claim
            const inputAllow = {
                function: "allow",
                target: this.repo.id,
                qty: quantity
            };
            const allowTxId = await warpWrite(pstId, inputAllow);


            this.$swal({
                icon: "info",
                html: "Please wait while the allow transaction completes...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.$swal.showLoading()
                },
            });

            // 2. Claim tokens
            const inputDep = {
                function: "deposit",
                tokenId: pstId,
                qty: quantity,
                txID: allowTxId
            };
            const allowDepId = await warpWrite(this.repo.id, inputDep);

            this.$swal({
                icon: "info",
                html: "Please wait while the deposit transaction completes...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.$swal.showLoading()
                },
            });

            if (import.meta.env.VITE_ENV !== "PROD") {
                /*** This will not be needed when ArConnect is automatically updated on TESTNET */
                // Update user's PST balance 
                const updatedPst = this.$store.getters.getActiveWallet.psts.find((item) => item.contractId === pstId);
                if (updatedPst) {
                    updatedPst.balance = +this.pstBalance - quantity;
                } else {
                    // Not found wallet, so add it
                    let pst = {
                        contractId: pstId,
                        balance: +this.pstBalance - quantity,
                        name: this.nfTokenName,
                        ticker: this.nfTokenTicker,
                    };
                    this.$store.commit("addWalletPst", pst);
                }
                /***  */
            }
            await this.arConnect();
            this.$swal.close();
            this.$router.push("../repos");
            this.$emit("close");
        },
        pstChange() {
            if (this.selectedPstId !== "NOT-FOUND") {
                this.pstInputTokens = null;
                this.pricePerToken = null;
            }
        },
        calcPstPrice() {
            let bal = 0;
            if (this.nfTokenValid) {
                bal = this.nfTokenBal;
            } else {
                const currentPst = this.$store.getters.getActiveWallet.psts.find((item) => item.contractId === this.selectedPstId);
                this.pricePerToken = currentPst.balance;
                this.pstValue = currentPst.balance * this.pstInputTokens;
                bal = currentPst.balance;
            }
            this.updatePstInputValid(bal);
            this.msg = "WARNING: Are you sure you want to transfer these assets from your wallet to the repo? This action cannot be undone."
        },
        updatePstInputValid(balance) {
            if (Number(this.pstInputTokens) <= balance && Number(this.pstInputTokens > 0)) {
                this.pstInputValid = true;
            } else {
                this.pstInputValid = false;
            }
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
