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
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </div>

                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                            Evolve Contract
                        </DialogTitle>
                        <div class="pt-6">
                            A newer version of the AFTR Protocol has been released.  To see the updates, please go to the <a href="https://github.com/aftrmarket/aftr-contracts">AFTR Protocol Documentation</a>.
                        </div>
                        <div class="pt-6">
                            Press the Evolve button to propose a vote to evolve the vehicle contract to the latest AFTR contract.
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row">
                <button @click="buttonClick" type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Evolve
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
import { interactWrite } from "smartweave";
import { warpInit, warpRead, warpWrite } from './../utils/warpUtils.js';


export default {
    props : ['vehicleId'],
    components: { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot },
    data() {
        return {
            contractId: this.vehicleId,
        }
    },
    computed: {
        ...mapGetters(["keyFile", "getActiveAddress", "arConnectConfig", "getActiveWallet"]),
    },
    methods: {
        async buttonClick() {
            await this.proposeVote();
        },
        async proposeVote() {
            let arweave = {};

            try {
                arweave = await Arweave.init({
                    host: import.meta.env.VITE_ARWEAVE_HOST,
                    port: import.meta.env.VITE_ARWEAVE_PORT,
                    protocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
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
                    wallet =  JSON.parse(this.keyFile);
                } else {
                    this.$swal({
                        icon: 'warning',
                        html: "Please attach your keyfile",
                    })
                }        
            } 
            this.$swal({
                icon: "info",
                html: "Please wait while the vehicle is updated.",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.$swal.showLoading()
                },
            });
        
            const input = {
                function: "propose",
                type: "set",
                recipient: "",
                qty: "",
                key: "settings.evolve",
                value: import.meta.env.VITE_EVOLVED_CONTRACT_SOURCE_ID,
                note: ""
            };

            try {
                // if (import.meta.env.VITE_ENV === "DEV") {
                //     console.log("hello");
                //     const txid = await interactWrite(arweave, wallet, this.contractId, input);
                //     this.$log.info("VehicleEvolve : proposeVote :: ", "TX: " + txid);
                // } else {
                //     const txid = await interactWrite(arweave, "use_wallet", this.contractId, input);
                //     this.$log.info("VehicleEvolve : proposeVote :: ", "TX: " + txid);
                // }
                this.warp = warpInit();

                let txid = await warpWrite(this.warp, this.vehicle.id, input);
                this.$log.info("VehicleEvolve : proposeVote :: ", "TX: " + txid);
            } catch(e) {
                this.$swal({
                    icon: "error",
                    html: "Failed to write to the Permaweb.  Please try again.",
                    showConfirmButton: true,
                    allowOutsideClick: false
                });
            }

            // if(Boolean(import.meta.env.VITE_MINE)){
            //     const mineUrl = import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/mine";
            //     const response = await fetch(mineUrl);
            // }
            this.$swal.close();
            this.$router.push("/vehicles");
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

