<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" auto-reopen="true" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="green">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    Add Members to Vehicle
                  </DialogTitle>

                    <div class="bg-white sm:p-4">
                        <div class="">
                            <div class="mt-6">
                                <input type="text" v-model="memberWallet" placeholder="Wallet Address" @input="onTokenChange" :class="inputBox(memberWalletValid)" class="w-96" />
                            </div>
                            <div class="mt-6 pl-4">
                                <input type="number" placeholder="Tokens" v-model="memberAmount" @input="onTokenChange" :class="inputBox(memberAmountValid)" />
                                <label class="pl-4 text-sm text-gray-700">
                                    Available Balance: {{ formatNumber(availableTokens) }}
                                </label>
                            </div>
                            <div class="mt-6 pl-4">
                                <button v-if="memberWalletValid && memberAmountValid" @click.prevent="addDaoMember" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                    </svg>
                                    <span class="pl-2">Add Member</span>
                                </button>
                            </div>
                        </div>
                    </div>

                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to add this member to the vehicle?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" v-if="pstInputValid && pstInputTokens" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" @click="transferTokens">
                Add Member
              </button>
              <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="$emit('close')" ref="cancelButtonRef">
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
import { ExclamationIcon } from '@heroicons/vue/outline'
import { mapGetters } from 'vuex';
import numeral from "numeral";

export default {
    props : ['vehicle'],
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        ExclamationIcon,
    },
    data() {
        return {
            selectedPstId: "",
            pstInputTokens: null,
            pstSelected: false,
            inputValid: false,                              // Boolean to show when any input field is invalid
            pstInputValid: false,                           // Boolean to show when amount goes over tokens held
            nameValid: false,                               // Boolean for valid vehicle name
            tickerValid: false,                             // Boolean for valid ticker name
            pricePerToken: null,                            // Selected PST's price
            pstValue: null,                                 // pricePerShare * inputShares
            totalValue: null,
        }
    },
    computed : {
        pstBalance() {
            const currentPst = this.$store.getters.getActiveWallet.psts.find((item) => item.contractId === this.selectedPstId);
            return this.formatNumber(currentPst.balance);
        },
        pstTicker() {
            const currentPst = this.$store.getters.getActiveWallet.psts.find((item) => item.contractId === this.selectedPstId);
            return currentPst.ticker;
        },
        vehicleTokenBox() {
            if (this.vehicleTokensValid) {
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
            if (this.nameValid && this.tickerValid && this.vehicleTokensValid && this.memberRowValid) {
                return true;
            } else {
                return false;
            }
        },
        ...mapGetters(['arConnected', 'getActiveAddress']),
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
        transferTokens() {
            this.$log.info("VehicleMembers : transferTokens :: ", "TRANSFER");
            this.$emit('close');
        },
        pstChange() {
            this.pstInputTokens = null;
            this.pricePerToken = null;
        },
        calcPstPrice() {
            const currentPst = this.$store.getters.getActiveWallet.psts.find((item) => item.contractId === this.selectedPstId);
            this.pricePerToken = currentPst.price;
            this.pstValue = currentPst.price * this.pstInputTokens;
            this.updatePstInputValid(currentPst.balance);
        },
        updatePstInputValid(balance) {
            if (Number(this.pstInputTokens) <= balance) {
                this.pstInputValid = true;
            } else {
                this.pstInputValid = false;
            }
        },
    },
    setup() {
        const open = ref(true)

        return {
            open,
        }
    },
}
</script>
