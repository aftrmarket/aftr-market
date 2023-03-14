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
                        class="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full space-y-4 p-6">
                        <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 text-center">
                            $STAMP {{ repo.name }}
                        </DialogTitle>
                        <div class="flex justify-center">
                            <img class="w-20 h-20 bg-gray-300 rounded-full" :src="repoLogo" alt="">
                        </div>
                        <div class="flex justify-between px-4">
                            <div class="flex flex-col items-center">
                                <span>Total Stamped</span>
                                <span class="text-6xl">{{ count.total }}</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <span>Vouched Stamps</span>
                                <span class="text-6xl">{{ count.vouched }}</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <span>Super Stamped</span>
                                <span class="text-6xl">{{ count.super }}</span>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center space-y-6">
                            <div class="flex flex-col items-center space-y-4">
                                <div class="flex items-center space-x-3">
                                    <transition enter-from-class="opacity-0 translate-x-10" enter-active-class="transition-all duration-200"
                                        leave-active-class="transition-all duration-200" leave-to-class="opacity-0 translate-x-5">
                                        <div class="flex flex-col w-24" v-if="superStamp">
                                            <input type="number" id="stampCounter" min="1" :max="balance" v-model="superStampCount" class="text-center rounded-lg">
                                        </div>
                                    </transition>
                                    <button @click.prevent="stamp">
                                        <StampIcon stampColor="hover:fill-green-500" :size="48" class="fill-aftrBlue" />
                                    </button>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <button class="flex space-x-2 outline-2" @click.prevent="superStamp = !superStamp">
                                        <p class="text-xs uppercase" :class="superStamp ? 'text-green-500 hover:text-gray-400' : 'text-red-400 hover:text-aftrBlue'">
                                            super stamp {{ superStamp ? 'enabled' : 'disabled' }} </p>
                                        <!-- <input type="checkbox" :checked="superStamp" class="radio-md rounded-sm" /> -->
                                    </button>
                                    <div class="relative flex flex-col-reverse items-center" @mouseenter="superStampTooltip = true" @mouseleave="superStampTooltip = false">
                                        <QuestionMarkCircleIcon class="h-4 text-gray-500 z-10" />
                                        <transition enter-from-class="opacity-0" enter-active-class="transition-all duration-400" leave-active-class="transition-all duration-300"
                                            leave-to-class="opacity-0">
                                            <div v-show="superStampTooltip" class="absolute bg-gray-200 p-2 rounded-lg text-sm z-0 w-72 m-6">
                                                <p>Super Stamp this asset to send $STAMP tokens you own as a tip!</p>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                            </div>
                            <transition enter-from-class="opacity-0 translate-y-10" enter-active-class="transition-all duration-200" leave-active-class="transition-all duration-200"
                                leave-to-class="opacity-0 translate-y-5">
                                <div v-if="superStamp" class="flex flex-col text-right text-sm">
                                    <span>Current $STAMP Balance: {{ balance }}</span>
                                    <span :class="balance - superStampCount < 0 ? 'text-aftrRed' : ''">New $STAMP Balance: {{ balance - superStampCount }}</span>
                                </div>
                            </transition>
                        </div>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
import { mapGetters } from 'vuex';
import StampIcon from './StampIcon.vue';

export default {
    props: ['repo'],
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        QuestionMarkCircleIcon,
        StampIcon
    },
    data() {
        return {
            open: true,
            count: {
                total: 0,
                vouched: 0,
                super: 0
            },
            balance: 0,
            repoLogo: '',
            superStamp: false,
            superStampCount: 1,
            superStampTooltip: false,
            stamped: false
        }
    },
    computed: {
        ...mapGetters(['getActiveAddress'])
    },
    methods: {
        async getBalance(address) {
            return await this.$stampUtils.balance(address)
        },
        async getCount() {
            return await this.$stampUtils.count(this.repo.id)
        },
        async stamp() {
            let repo = this.repo
            if (this.superStamp) {
                // super stamp an Asset
                try {
                    await this.$stampUtils.stamp(repo.id, this.superStampCount)
                    this.count.super++
                } catch (error) {
                    console.log(error)
                }
            } else {
                // stamp an Asset
                try {
                    await this.$stampUtils.stamp(repo.id)
                    this.count.total++
                    console.log('Stamped ' + repo.name)
                } catch (error) {
                    console.log(error)
                }
            }
        },
        getRepoLogo() {
            let logoUrl = "";

            if (!this.repo.logo || this.repo.logo === '') {
                logoUrl = "https://avatars.dicebear.com/api/pixel-art-neutral/:" + this.repo.id + ".svg";
            } else {
                // logoUrl = "https://arweave.net/" + this.repo.logo;
                if (import.meta.env.VITE_ARWEAVE_PORT) {
                    logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/" + this.repo.logo}`;
                } else {
                    logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + "/" + this.repo.logo}`;
                }
            }
            this.repoLogo = this.repo.logo
        },
    },
    async created() {
        this.getRepoLogo()
        this.count = await this.getCount()
        this.balance = await this.getBalance(this.getActiveAddress)
    },
}
</script>
