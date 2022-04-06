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
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    Add Tokens to Vehicle
                  </DialogTitle>
                    <div v-if="arConnected" class="pt-6">
                        <select v-model="selectedPstId" @change="pstChange" id="selectedPstId" name="selectedPstId" class="mt-1 block w-3/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="" disabled selected>
                                Select Token
                            </option>
                            <option v-for="pst in $store.getters.getActiveWallet.psts" :key="pst.id" :value="pst.id" :disabled="!pst.fcp">
                                {{ pst.name }} ({{ pst.id }})
                            </option>
                        </select>
                    </div>
                    <div v-if="selectedPstId !== ''">
                        <div class="pt-6 pb-4">
                            <label class="block text-sm font-medium text-gray-700">
                                You have <span class="font-bold text-aftrBlue">{{ pstBalance }} {{ pstTicker }}</span><span> available to use in your vehicle.</span>
                            </label>
                        </div>
                        <input type="number" placeholder="Amount" v-model="pstInputTokens" @input="calcPstPrice" :class="inputBox(pstInputValid)" />
                        <span v-if="pstInputTokens" class="block text-xs pt-2 pl-4 pr-6">@ {{ formatNumber( pricePerToken, true) }} AR {{ pstInputTokens ? " = " + formatNumber(pstValue, true) + " AR" : "" }}</span>
                    </div>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to transfer these tokens from your
                      wallet to the vehicle? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" v-if="pstInputValid && pstInputTokens" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" @click="transferTokens">
                Transfer
              </button>
              <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-aftrRed hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="$emit('close')" ref="cancelButtonRef">
                Cancel
              </button>
            </div>
             <Vehicle-Alert v-if="pstInputValid && pstInputTokens" :vehicle="msg"></Vehicle-Alert>
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
//import Arweave from "arweave";
import { interactWrite, interactWriteDryRun, readContract } from "smartweave";
import VehicleAlert from './VehicleAlert.vue';

export default {
    props : ['vehicle'],
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        ExclamationIcon,
        VehicleAlert
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
            /** Smartweave variables */
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            arweaveMine: import.meta.env.VITE_MINE,
            /** */
            msg: ""
        }
    },
    computed : {
        pstBalance() {
            const currentPst = this.$store.getters.getActiveWallet.psts.find((item) => item.id === this.selectedPstId);
            return this.formatNumber(currentPst.balance);
        },
        pstTicker() {
            const currentPst = this.$store.getters.getActiveWallet.psts.find((item) => item.id === this.selectedPstId);
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
    async transferTokens() {
      this.msg = "Please wait for deposit into vehicle to complete..."
      let arweave = {};

      arweave = await Arweave.init({
        host: this.arweaveHost,
        port: this.arweavePort,
        protocol: this.arweaveProtocol,
        timeout: 20000,
        logging: true,
      });

      const inputTransfer = {
        function: "transfer",
        target: this.vehicle.id,
        qty: Number(this.pstInputTokens),
      };
      const currentPst = this.$store.getters.getActiveWallet.psts.find(
        (item) => item.id === this.selectedPstId
      );

      let vertoTxId;
      if (import.meta.env.VITE_ENV === "DEV") {
        let wallet = JSON.parse(this.keyFile);
        const mineUrl =
            import.meta.env.VITE_ARWEAVE_PROTOCOL +
            "://" +
            import.meta.env.VITE_ARWEAVE_HOST +
            ":" +
            import.meta.env.VITE_ARWEAVE_PORT +
            "/mine";
        if(Boolean(this.arweaveMine)){
          let response = await fetch(mineUrl);
        }

        await interactWrite(arweave, wallet, currentPst.id, inputTransfer)
          .then(async (id) => {
            vertoTxId = id;
            this.$log.info("VehicleTokensAdd : interactWrite :: ", "Transfer Verto = " + JSON.stringify(vertoTxId));

            if(Boolean(this.arweaveMine)){
              await fetch(mineUrl);
            }

            const inputDeposit = {
              function: "deposit",
              tokenId: currentPst.id,
              txId: vertoTxId,
            };
            this.$log.info("VehicleTokensAdd : interactWrite :: ", "INPUT DEP: " + JSON.stringify(inputDeposit));
            await interactWrite(arweave, wallet, this.vehicle.id, inputDeposit)
              .then(async (txId) => {
                this.msg = "Deposit Successful : " + txId
                if(Boolean(this.arweaveMine)){
                  await fetch(mineUrl);
                }
              })
              .catch((error) => {
                this.msg = error;
              });
          })
          .catch((error) => {
           this.msg = error;
          });

        //let vertoTxId = await interactWrite(arweave, wallet, currentPst.id, inputTransfer);
        //this.$log.info("Transfer Verto = " + JSON.stringify(vertoTxId));

        // await fetch(mineUrl);

        // const inputDeposit = {
        //     function: "deposit",
        //     tokenId: currentPst.id,
        //     txId: vertoTxId
        // };

        //this.$log.info("INPUT DEP: " + JSON.stringify(inputDeposit));
        //let txId = await interactWrite(arweave, wallet, this.vehicle.id, inputDeposit);
        //await fetch(mineUrl);
        let vehicle = {};
        try {
          vehicle = await readContract(arweave, this.vehicle.id);
          this.$log.info("VehicleTokensAdd : interactWrite :: ", "VEHICLE = " + JSON.stringify(vehicle));
        } catch (e) {
          this.$log.error("VehicleTokensAdd : interactWrite :: ", "ERROR reading contract: " + e);
          this.$log.error("VehicleTokensAdd : interactWrite :: ", "VEHICLE: " + JSON.stringify(vehicle));
          this.$log.error("VehicleTokensAdd : interactWrite :: ", "THIS VEHICLE: " + this.vehicle.id);
        }
      } else {
        await interactWrite(arweave, "use_wallet", currentPst.id, inputTransfer)
          .then(async (id) => {
            vertoTxId = id;
            this.$log.info("VehicleTokensAdd : interactWrite :: ", "Transfer Verto = " + JSON.stringify(vertoTxId));

            const inputDeposit = {
              function: "deposit",
              tokenId: currentPst.id,
              txId: vertoTxId,
            };
            this.$log.info("VehicleTokensAdd : interactWrite :: ", "INPUT DEP: " + JSON.stringify(inputDeposit));
            await interactWrite(arweave, "use_wallet", this.vehicle.id, inputDeposit)
              .then(async (txId) => {
                this.msg = "Deposit Successful : " + txId
              })
              .catch((error) => {
                this.msg = error;
              });
          })
          .catch((error) => {
           this.msg = error;
          });

        this.$log.info("VehicleTokensAdd : interactWrite :: ", "READ CONTRACT...");
        let vehicle = {};
        try {
          vehicle = await readContract(arweave, this.vehicle.id);
          this.$log.info("VehicleTokensAdd : interactWrite :: ", "VEHICLE = " + JSON.stringify(vehicle));
        } catch (e) {
          this.$log.error("VehicleTokensAdd : interactWrite :: ", "ERROR reading contract: " + e);
          this.$log.error("VehicleTokensAdd : interactWrite :: ", "VEHICLE: " + JSON.stringify(vehicle));
          this.$log.error("VehicleTokensAdd : interactWrite :: ", "THIS VEHICLE: " + this.vehicle.id);
        }
      }
      // window.location.reload();
      this.$router.push("../vehicles");
      this.$emit("close");
    },
        pstChange() {
            this.pstInputTokens = null;
            this.pricePerToken = null;
        },
        calcPstPrice() {
            const currentPst = this.$store.getters.getActiveWallet.psts.find((item) => item.id === this.selectedPstId);
            this.pricePerToken = currentPst.balance;
            this.pstValue = currentPst.balance * this.pstInputTokens;
            this.updatePstInputValid(currentPst.balance);
            this.msg = "WARNING: Please wait while the transactions complete. If you leave or close this page, your deposit will fail."
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
