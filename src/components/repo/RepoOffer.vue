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
                                        <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                                        Make an Offer
                                    </DialogTitle>
                                    <DialogTitle v-if="!isSwappable" as="h4" class="text-sm leading-6 font-medium text-aftrRed pt-4">
                                        {{ swapMsg }}
                                    </DialogTitle>
                                    <div class="pt-6 grid grid-cols-2">
                                        <input type="number" v-model="barQty" placeholder="bAR Amount" class="mt-1 mb-1 mr-4 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                                        <label class="text-sm self-center text-gray-500">Offer Amount (bAR)</label>
                                        <input type="number" v-model="voteLength" placeholder="Vote Length" class="mt-1 mb-1 mr-4 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                                        <label class="text-sm self-center text-gray-500">Offer Timeline (blocks)</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-end">
                            <!-- TODO : Button click -->
                            <button type="button" @click="submitOffer" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                                {{ btnMsg }}
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
    },
    data() {
        return {
            allow3rdPartyProposals: false,
            isSwappable: false,
            barQty: undefined,
            voteLength: 12,
        }
    },
    computed: {
        swapMsg() {
            if (!this.isSwappable) {
                return "This repo isn't swappable at the moment, but you can let the members know that you're interested.";
            }
        },
        btnMsg() {
            if (this.isSwappable) {
                return "Send Offer";
            } else {
                return "I'm Interested";
            }
        },
        ...mapGetters(['arConnected', 'getActiveAddress', 'keyFile']),
    },
    methods: {
        async arConnect() {
            await this.$store.dispatch('arConnect');
        },
        determineSwapability() {
            const settings = new Map(this.repo.settings);
            if (settings.get("3rdPartyProposals") === true || settings.get("3rdPartyProposals") === "true") {
                this.allow3rdPartyProposals = true;
                if (settings.get("swappable") === true || settings.get("swappable") === "true") {
                    this.isSwappable = true;
                } else {
                    this.isSwappable = false;
                }
            } else {
                this.allow3rdPartyProposals = false;
                this.isSwappable = false;
            }
            if (settings.get("voteLength")) {
                this.voteLength = settings.get("voteLength");
            }
        },
        isSwappableProposed() {
            // Is there already an active swappable proposal?
            const swapProposal = this.repo.votes.find(vote => vote.status === "active" && vote.type === "set" && vote.key === "settings.swappable");
            if (swapProposal.length > 0) {
                return true;
            } else {
                return false;
            }
        },
        async submitOffer() {
            if (!this.allow3rdPartyProposals) {
                return;
            }
            if (!this.isSwappable) {
                // Propose offer & create escrow
            } else {
                if (this.isSwappableProposed()) {
                    this.$swal({
                        icon: "warning",
                        html: "There's already an active proposal to request enabling repo purchase.",
                        showConfirmButton: true,
                        allowOutsideClick: false
                    });
                    return;
                }

                // Propose swapability
                const result = await this.$swal.fire({
                    title: "Allow Offer",
                    icon: "question",
                    html: "This repo is not available for purchase in its current state. Would you like to send a proposal to the repo's membership to make the repo available for purchase?",
                    showConfirmButton: true,
                    confirmButtonText: "Yes",
                    confirmButtonColor: "#6C8CFF",
                    showCancelButton: true,
                    cancelButtonText: "No",
                    cancelButtonColor: "#FF6C8C",
                });
                if (result.isConfirmed) {
                    const input = {
                        function: "propose",
                        type: "set",
                        recipient: "",
                        qty: "",
                        key: "settings.swappable",
                        value: true,
                        note: "User is interested in making an offer. Would you like to add the swappable setting to allow offers?"
                    };
                    const tx = await warpWrite(this.repo.id, input, true, undefined);
                    this.$swal({
                        icon: "info",
                        html: "Your request has been proposed.",
                        showConfirmButton: true,
                        allowOutsideClick: false,
                    });
                } 
                return;
            }
        }
    },
    created() {
        this.determineSwapability();
    },
    setup() {
        const open = ref(true)

        return {
            open,
        }
    },
}
</script>
