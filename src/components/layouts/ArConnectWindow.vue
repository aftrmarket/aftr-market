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

                    <img src="../../assets/arconnect-logo.png" alt="Login to ArConnect" width="30" />

                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                            Your ArConnect Configuration for AFTR Market
                        </DialogTitle>
                        <div class="pt-6">
                            <div class="flex flex-row items-center gap-2">
                                <label class="text-gray-700 text-sm">AFTR Network: </label>
                                <label class="text-gray-700 text-xs font-mono">{{ aftrNetwork }}</label>
                            </div>
                            <div class="flex flex-row items-center gap-2">
                                <label class="text-gray-700 text-sm">Active Wallet: </label>
                                <label class="text-gray-700 text-xs font-mono">{{ getActiveAddress }}</label>
                            </div>
                            <div class="flex flex-row items-center gap-2">
                                <label class="text-gray-700 text-sm">Gateway: </label>
                                <label class="text-gray-700 text-xs font-mono">{{ arConnectConfig.host }}</label>
                            </div>
                            <div class="flex flex-row items-center gap-2">
                                <label class="text-gray-700 text-sm">AR: </label>
                                <label class="text-gray-700 text-xs font-mono">{{ getActiveWallet.ar }}</label>
                            </div>
                            <div v-if="arConnected" class="mt-3 border-t border-gray-200">
                                <label class="text-gray-700 text-sm">Arweave Assets</label>
                                <perfect-scrollbar>
                                    <div v-for="pst in getActiveWallet.psts" :key="pst.contractId" class="flex flex-column items-center pl-2">
                                        <label class="text-gray-700 text-xs font-mono">{{ pst.name }} ({{ pst.ticker }}): {{ pst.balance }}</label>
                                    </div>
                                </perfect-scrollbar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row">
                <button v-if="!arConnected" @click="buttonClick('connect')" type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Connect
                </button>
                <button v-else type="button" disabled class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-400 sm:ml-3 sm:w-auto sm:text-sm">
                    Connect
                </button>
                <button v-if="arConnected" @click="buttonClick('disconnect')" type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-aftrRed hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed sm:ml-3 sm:w-auto sm:text-sm">
                    Disconnect
                </button>
                <button v-else type="button" disabled class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-400 sm:ml-3 sm:w-auto sm:text-sm">
                    Disconnect
                </button>
                <button v-if="false" type="button" @click="refreshWallet" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue sm:ml-3 sm:w-auto sm:text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from 'vue';
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { mapGetters } from "vuex";


export default {
    components: { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot },
    data() {
        return {

        }
    },
    computed: {
        aftrNetwork() {
            if (import.meta.env.VITE_ENV === "PROD") {
                return "MAINNET";
            } else if (import.meta.env.VITE_ENV === "TEST") {
                return "TESTNET";
            } else {
                return "DEVNET";
            }
        },
        ...mapGetters(["arConnected", "getActiveAddress", "arConnectConfig", "getActiveWallet"]),
    },
    methods: {
        async buttonClick(type = "connect") {
            if (type === "connect") {
                await this.$store.dispatch('arConnect');
            } else {
                await this.$store.dispatch('arDisconnect');
            }
        },
        async refreshWallet() {
            this.$swal({
                icon: "info",
                html: "Please wait your wallet is being refreshed...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.$swal.showLoading()
                },
            });
            await this.$store.dispatch("arRefresh", { buildWallet: true });
            this.$swal.close();
        },
    },
    setup() {
        const open = ref(true)

        return {
            open,
        }
    },
    created() {

    },
}
</script>

<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>
<style scoped>
    .ps {
        height: 100px;
    }   
</style>
