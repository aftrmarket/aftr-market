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
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                        Create AFTR Vehicle
                    </DialogTitle>
                    <div class="pt-6">
                        <div class="flex flex-row items-center gap-2">
                            <label class="text-gray-700 text-sm">Vehicle Name&nbsp;</label>
                            <input v-model="vehicleName" ref="inputName" type="text" placeholder="Vehicle Name" class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div class="flex flex-row items-center gap-2">
                            <label class="text-gray-700 text-sm">Vehicle Ticker</label>
                            <input v-model="vehicleTicker" ref="inputTicker" type="text" placeholder="Ticker" class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div class="pt-4 relative flex items-start">
                            <div class="flex items-center h-5">
                                <input v-model="transferAssets" @click="transferClick" type="checkbox" class="focus:ring-aftrBlue h-4 w-4 text-aftrBlue border-gray-300 rounded" />
                            </div>
                            <div class="ml-3 text-sm">
                                <label class="text-gray-700">Transfer your assets into your new vehicle</label>
                                <!--<p class="text-gray-500">Transfer your assets into the new vehicle.</p>-->
                            </div>
                            <div v-if="transferAssets && false">
                                <label v-for="pst in walletPsts" :key="pst.contractId" :value="pst.contractId">
                                    {{ pst.name }} ({{ pst.contractId }})
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col text-sm text-gray-700 mt-4 border-t border-gray-200">
                        <label class="mt-4">Owner: &nbsp;&nbsp;&nbsp;&nbsp; <span class="font-mono font-medium text-aftrBlue">{{ walletAddressSubstr(getActiveAddress) }}</span></label>
                        <label>Quorum: &nbsp; <span class="font-mono font-medium">50%</span></label>
                        <label>Support: &nbsp; <span class="font-mono font-medium">50%</span></label>

                    </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row">
              <button v-if="dataValid" @click="createVehicle" type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                Create
              </button>
              <button v-if="dataValid" type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                Add to Existing
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
import Arweave from "arweave";
import { createContractFromTx } from "smartweave";
import Swal from 'sweetalert2';


export default {
    components: { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot },
    data() {
        return {
            contractSourceId: import.meta.env.VITE_SMARTWEAVE_CONTRACT_SOURCE_ID,
            tagProtocol: import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL,
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            mineUrl: import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/mine",
            arweaveMine: import.meta.env.VITE_MINE,


            vehicleName: "",
            vehicleTicker: "",
            transferAssets: false,
            dataValid: true,
            walletPsts: [],



            vehicleTemplate: {
                "name": "",
                "ticker": "",
                "balances": {},
                "invocations": [],
                "foreignCalls": [],
                "tokens": [],
                "vault": {},
                "votes": [],
                "status": "started",
                "creator" : "",
                "ownership" : "single",
                "votingSystem" : "weighted",
                "settings": [
                    [
                        "quorum",
                        0.5
                    ],
                            [
                        "support",
                        0.5
                    ],
                    [
                        "voteLength",
                        2160
                    ],
                    [
                        "communityLogo",
                        ""
                    ]
                ]
            }
        }
    },
    computed: {

        ...mapGetters(['arConnected', 'getActiveAddress', 'keyFile', 'getAftrContractSrcId']),
    },
    methods: {
        walletAddressSubstr(addr, chars = 10) {
            if (typeof addr === 'string') {
                let len = parseInt(chars/2);
                return addr.substring(0, len) + '...' + addr.substring(addr.length - len);
            } else {
                return '';
            }
        },
        transferClick() {
            console.log(JSON.stringify(this.walletPsts));
        },
        async createVehicle() {
            // Validate values
            if (this.vehicleName.length == 0) {
                this.$swal.fire({
                    icon: "error",
                    html: "Please enter a name for your new vehicle.",
                    allowOutsideClick: false
                });
                return;
            }
            if (this.vehicleTicker.length == 0) {
                this.$swal.fire({
                    icon: "error",
                    html: "Please enter the ticker for your new vehicle.",
                    allowOutsideClick: false
                });
                return;
            }

            this.$swal({
                icon: "info",
                html: "Please wait while your new vehicle is being created...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.$swal.showLoading()
                },
            });
            let arweave = {};
            try {
                arweave = await Arweave.init({
                    host: this.arweaveHost,
                    port: this.arweavePort,
                    protocol: this.arweaveProtocol,
                    timeout: 20000,
                    logging: true,
                });
            } catch (error) {
                this.$swal.fire({
                    icon: "error",
                    html: "An error occurred when trying to connect to Arweave.  You can try again and/or let us know that you're having trouble.",
                    showConfirmButton: true,
                    allowOutsideClick: false,
                }).then((result) => {
                    this.$router.push("vehicles");
                });
            }

            // Complete vehicleTemplate values
            this.vehicleTemplate.name = this.vehicleName;
            this.vehicleTemplate.ticker = this.vehicleTicker;
            this.vehicleTemplate.creator = this.getActiveAddress;
            this.vehicleTemplate.balances[this.getActiveAddress] = 1;

            let use_wallet;
            if (import.meta.env.VITE_ENV === "DEV") {
                if (this.keyFile.length) {
                    use_wallet = JSON.parse(this.keyFile);
                } else {
                    this.$swal({
                        icon: 'warning',
                        html: "Please attach your keyfile",
                    })
                    return false;
                }
            }

            let initTags = [{ name: "Protocol", value: this.tagProtocol }];
            if (import.meta.env.VITE_ENV !== "PROD") {
                initTags.push({ name: "Aftr-Playground", value: this.vehicleTemplate.ticker});
            }
            try {
                if (import.meta.env.VITE_ENV === "DEV") {
                    this.vehicleTemplate["id"] = await createContractFromTx(arweave, use_wallet, this.getAftrContractSrcId, JSON.stringify(this.vehicleTemplate), initTags);  
                } else {
                    this.vehicleTemplate["id"] = await createContractFromTx(arweave, "use_wallet", this.getAftrContractSrcId, JSON.stringify(this.vehicleTemplate), initTags);
                }

                if (import.meta.env.VITE_ENV === "DEV" || import.meta.env.VITE_BUILD_PSTS) {
                    // Add to Wallet PSTs if the Verto Cache is not being used
                    let pst = {
                        contractId: this.vehicleTemplate["id"],
                        balance: this.vehicleTemplate.balances[this.vehicleTemplate.creator],
                        name: this.vehicleTemplate.name,
                        ticker: this.vehicleTemplate.ticker,
                        //logo: this.communityLogoValue,
                        //fcp: true
                    };
                    this.$store.commit("addWalletPst", pst);
                }

                if(Boolean(this.arweaveMine)){
                    await fetch(this.mineUrl);
                }
            } catch(error) {
                this.$swal.fire({
                    icon: 'error',
                    html: "An error occurred during the creation of your vehicle.  You can try again and/or let us know.",
                    allowOutsideClick: false,
                }).then((result) => { return });
            }
            this.$swal.close();
            this.$swal.fire({
                icon: 'success',
                html: "Successfully created " + this.vehicleTemplate.name + ".",
                allowOutsideClick: false,
            });
            this.$emit('close');
            this.$router.push( { name: 'vehicle', params: { vehicleId: this.vehicleTemplate.id } } );
        },
    },
    setup() {
        const open = ref(true)

        return {
            open,
        }
    },
    created() {
        //this.walletPsts = this.$store.getters.getActiveWallet.psts;
        this.vehicleName = this.walletAddressSubstr(this.getActiveAddress);
        this.vehicleTicker = this.walletAddressSubstr(this.getActiveAddress).substring(0, 5);
    },
}
</script>
