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
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 break-all">
                    Cast Vote - {{ voteId }}
                  </DialogTitle>
                  <div class="pt-6 text-sm font-medium">
                    <dl>
                      <dt class="text-gray-500">Proposal</dt>
                      <dd class="mt-1 text-gray-900 break-all">
                        {{ displayProposal(vote.type) }}
                      </dd>
                    </dl>
                    <div class="mt-4 mb-4 grid grid-cols-3 gap-x-4">
                      <div class="text-gray-500">Starting Block</div>
                      <div class="text-gray-500">Ending Block</div>
                      <div class="text-gray-500">Current Block</div>
                      <div class="text-gray-700">{{ vote.start }}</div>
                      <div class="text-gray-700">
                        {{ vote.start + vote.voteLength }}
                      </div>
                      <div class="text-gray-700">{{ currentBlock }}</div>
                    </div>
                    <dl>
                      <dt class="text-gray-500">Current Results (Y - N)</dt>
                      <dd class="mt-1 text-gray-900">
                        {{ vote.yays }} - {{ vote.nays }}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between">
              <button type="button"
                class="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="recordVote(true)">
                Yes
              </button>
              <span class="px-4 py-2 text-sm text-aftrRed">This action cannot be undone</span>
              <button type="button"
                class="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-aftrRed hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="recordVote(false)">
                No
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ExclamationCircleIcon } from "@heroicons/vue/24/outline";
import { mapGetters } from "vuex";
import numeral from "numeral";
import { capitalize } from "../../utils/shared.js";
import Arweave from "arweave";
import { warpWrite } from '../../utils/warpUtils.js';

export default {
  props: ["repo", "voteId", "voteData", "contractId", "currentBlock"],
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    ExclamationCircleIcon,
  },
  data() {
    return {
      vote: this.voteData,
    };
  },
  computed: {
    isInputValid() { },
    ...mapGetters(["arConnected", "getActiveAddress", "keyFile"]),
  },
  methods: {
    formatNumber(num, dec = false) {
      if (dec) {
        return numeral(num).format("0,0.0000");
      } else {
        return numeral(num).format("0,0");
      }
    },
    inputBox(valid) {
      if (valid) {
        return "mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md";
      } else {
        return "mt-1 focus:ring-aftrRed focus:border-aftrRed shadow-sm sm:text-sm border-gray-300 rounded-md";
      }
    },
    displayProposal(type) {
      if (!type || type === "") {
        return this.vote.note;
      } else if (type === "set") {
        return (
          "Change " +
          capitalize(this.vote.key) +
          " to " +
          capitalize(String(this.vote.value))
        );
      } else if (type === "?") {
        return "?";
      } else if (type === "???") {
        return "???";
      } else {
        return capitalize(this.vote.note);
      }
    },
    async recordVote(vote) {
      // Create input
      let input = {};
      let txID = "";
      if (vote) {
        input = {
          function: "vote",
          voteId: this.voteId,
          cast: "yay",
        };
      } else {
        // NO vote
        input = {
          function: "vote",
          voteId: this.voteId,
          cast: "nay",
        };
      }

      txID = await warpWrite(this.contractId, input);
      this.$swal({
        icon: "success",
        html: "Thank you for casting your vote.  Your vote will be reflected in the next block.",
        showConfirmButton: true,
        allowOutsideClick: false
      })
      this.$log.info("RepoVotesCast : recordVote :: ", txID);
      //this.$router.go(0); -> We're losing the Arconnection when we try to go back to the repo page
      this.$router.push("/repos");
    //   this.$emit("close");
      return
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
