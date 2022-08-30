<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      auto-reopen="true"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="open = false"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="
              inline-block
              align-bottom
              bg-white
              rounded-lg
              text-left
              overflow-hidden
              shadow-xl
              transform
              transition-all
              sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
            "
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="
                    mx-auto
                    flex-shrink-0 flex
                    items-center
                    justify-center
                    h-12
                    w-12
                    rounded-full
                    bg-green-100
                    sm:mx-0 sm:h-10 sm:w-10
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-lg leading-6 font-medium text-gray-900"
                  >
                    Vote History
                  </DialogTitle>
                  <div >
                    <!-- <perfect-scrollbar> -->
                      <vue-json-pretty
                        :path="'res'"
                        :data="vehicle.votes"
                        :showDoubleQuotes="keyQuotes"
                        :deep="depth"
                        :deepCollapseChildren="false"
                        :showLength="true"
                        :showSelectController="true"
                      >
                      </vue-json-pretty>
                    <!-- </perfect-scrollbar> -->
                  </div>
                  <div></div>
                </div>
              </div>
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
import { ExclamationIcon } from "@heroicons/vue/outline";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

export default {
  props: ["vehicle"],
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    ExclamationIcon,
    VueJsonPretty,
  },
  data() {
    return {
      arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
      arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
      arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,

      voteType: "",
      stateKey: "",
      stateValue: "",
      currentValue: "",
      memberVoteType: "add",
      memberWallet: "",
      memberQty: "",
      tokenAction: "mint",
      proposedMemberBalance: 0,
      dataValid: false,
      stateKeys: [
        {
          id: "status",
          desc: "Status",
          valid: ["stopped", "started", "expired"],
        },
        { id: "name", desc: "Name" },
        { id: "ticker", desc: "Ticker" },
        { id: "creator", desc: "Creator" },
        { id: "ownership", desc: "Ownership", valid: ["single", "dao"] },
        { id: "settings.quorum", desc: "Quorum", type: "number" },
        { id: "settings.voteLength", desc: "Vote Length", type: "number" },
        {
          id: "settings.lockMinLength",
          desc: "Minimum Lock Length",
          type: "number",
        },
        {
          id: "settings.lockMaxLength",
          desc: "Maximum Lock Length",
          type: "number",
        },
        { id: "settings.communityLogo", desc: "Community Logo" },
      ],
    };
  },

  setup() {
    const open = ref(true);

    return {
      open,
    };
  },
};
</script>
