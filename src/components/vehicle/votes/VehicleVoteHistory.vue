<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" auto-reopen="true" class="relative z-50" @close="open = false"> 
      <div class="fixed inset-0 overflow-y-auto flex items-center justify-center p-4 rounded-md shadow border-b border-gray-200">
      <DialogPanel class="w-full max-w-4xl shadow border-b border-gray-200">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-lg leading-6 font-medium text-gray-900 break-all"
                  >
                    Voting History - {{ voteData.id }}
                  </DialogTitle>

                  <div class="pt-6 text-sm font-medium">
                    <div class="mt-4 mb-4 grid grid-cols-3 gap-x-4">
                      <div class="text-gray-500">VOTE</div>
                      <div class="text-gray-500">{{ walletAddressSubstr(voteData.id) }}</div>
                    </div>

                    <div class="mt-4 mb-4 grid grid-cols-3 gap-x-4">
                      <div class="text-gray-500">STATUS</div>
                      <div class="text-gray-500">{{ voteData.status }}</div>
                    </div>

                     <div class="mt-4 mb-4 grid grid-cols-3 gap-x-4">
                      <div class="text-gray-500">PROPOSAL</div>
                      <div class="text-gray-500">{{ voteData.note }}</div>
                    </div>
                    
                    <dl>
                      <dt class="text-gray-500">VOTING POWER</dt>
                      <perfect-scrollbar>
                      <div class="mt-4 mb-4 grid grid-cols-3 gap-x-4" v-for="(tokens, addr) in vehicle.balances" :key="addr">
                        <div class="ml-6 text-gray-500">{{ walletAddressSubstr(addr) }}</div>
                        <div class="text-gray-500">{{ formatNumber(tokens) }}</div>
                      </div>
                      </perfect-scrollbar>
                      <div class="mt-4 mb-4 grid grid-cols-3 gap-x-4 border-t border-gray-300">
                        <div class="ml-6 text-gray-500">TOTAL :</div>
                        <div class="text-gray-500">{{ total }}</div>
                      </div> 
                    </dl>

                    <div v-if="vehicle.ownership == 'dao'">
                      <div class="mt-4 mb-4 grid grid-cols-2 gap-x-4">
                        <div class="text-gray-500">STARTING BLOCK</div>
                        <div class="text-gray-500">ENDING BLOCK</div>
                        <div class="text-gray-700">{{ voteData.start }}</div>
                        <div class="text-gray-700">{{ voteData.start + voteData.voteLength}}</div>
                      </div>

                      <dl>
                        <dt class="text-gray-500">RESULT</dt>
                        <div class="mt-4 mb-2 grid grid-cols-3 gap-x-4">
                          <div class="ml-6 text-gray-500">(Y - N) :</div>
                          <div class="text-gray-500">{{ voteData.yays }} - {{ voteData.nays }}</div>
                        </div>
                      </dl>
                    </div> 

                     <dl>
                      <dt class="text-gray-500">{{ voteData.statusNote }}</dt>
                    </dl> 
                    
                     <dl v-if="voteData.status == 'quorumFailed'">
                      <dt class="text-gray-500">The proposal failed due to the Quorum not being met. The proposal's quorum was {{vehicle.settings[0][1]}}</dt>
                    </dl> 
                    
                  </div>

                </div>
              </div>
            </div>
      </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ExclamationIcon } from "@heroicons/vue/outline";
import numeral from "numeral";

export default {
  props: ["vehicle", "voteData"],
  components: {
    Dialog,
    DialogPanel,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    ExclamationIcon,
  },
  data() {
    return {
      // voteData : this.vehicle.votes[0],
      voteData : this.voteData,
      total: 0
    };
  },
  mounted() {
   this.totalBalance()
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
    formatNumber(num, dec = false) {
            if (dec) {
                return numeral(num).format("0,0.0000");
            } else {
                return numeral(num).format("0,0");
            }
    },
     totalBalance(){
       console.log("voteData", this.vehicle, this.voteData , this.vehicle.settings[0][1])
      this.total = Object.values(this.vehicle.balances).reduce((accumulator, object) => {
            return accumulator + object;
          }, 0)
    }
  },
  setup() {
    const open = ref(true);

    return {
      open,
    };
  },
};
</script>
<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>
<style scoped>
    .ps {
        height: 110px;
    } 
/*     
    .visible {
        height: 3em;
        width: 10em
    } */
</style>
