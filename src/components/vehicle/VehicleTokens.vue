<template>
    <div class="pt-4 w-full">
        <!-- PSTs in Vehicle -->
        <div v-if="vehicle.psts.length > 0" class="pt-1">
            <div class="pt-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit Sharing Token ({{ vehicle.psts.length }})</th>
                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Tokens</th>
                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value (AR)</th>
                                    <th v-if="allowTransfer" scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Transfer</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="pst in vehicle.psts" :key="pst.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10">
                                                <img class="h-10 w-10 rounded-full" :src="`https://arweave.net/` + pst.logo" alt="" />
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900"> {{ pst.name + " (" + pst.ticker + ")" }} </div>
                                                <div class="text-sm text-gray-500"> {{ pst.id }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-right px-6 py-3 text-gray-500">{{ formatNumber(pst.tokens) }}</td>
                                    <td class="text-right px-6 py-3 text-gray-500">{{ formatNumber(pst.total, true) }}</td>
                                    <td class="text-center px-6 py-3">
                                        <button v-if="allowTransfer" @click.prevent="transferPst(pst.id)" type="submit" class="inline-flex items-center p-1 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#065F46">
                                                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h3 class="text-xl font-light leading-6">No current tokens in vehicle</h3>
        </div>

        <div class="mt-6 flex flex-col inline-flex">
            <button v-if="allowAdd" @click.prevent="addPst" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                </svg>
                <span class="pl-2">ADD TOKEN</span>
            </button>
            <div v-else class="pt-6 flex justify-start items-center">
                <button @click="arConnect" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aftrBlue hover:bg-aftrBlue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Login to ArConnect
                </button>
                <label class="pl-4 block text-sm text-gray-700">
                    You must provide a wallet in order to create a vehicle
                </label>
            </div>
        </div>
    </div>

</template>

<script>
import numeral from "numeral";
import { mapGetters } from 'vuex';

export default {
    props: ['vehicle'],
    data() {
        return {
            allowAdd: false,
            allowTransfer: false,
        };
    },
    computed: {
        creatorAddress() {
            if (typeof this.vehicle.creator === 'undefined' || this.vehicle.creator === null || this.vehicle.creator === '') {
                return '~NO ONE~';
            } else {
                return this.vehicle.creator;
            }
        },
        ...mapGetters(['arConnected', 'getActiveAddress']),
    },
    watch: {
        arConnected(value) {
            this.setFlags();
        }
    },
    methods: {
        setFlags() {
            if (this.arConnected) {
                this.allowAdd = true;
            } else {
                this.allowAdd = false;
            }
            // For transfers, you must be the creator and the vehicle must have single owenership
            if (this.getActiveAddress === this.creatorAddress && this.vehicle.ownership === 'single') {
                this.allowTransfer = true;
            } else {
                this.allowTransfer = false;
            }
        },
        arConnect() {
            this.$store.dispatch('arConnect');
        },
        formatNumber(num, dec = false) {
            if (dec) {
                return numeral(num).format("0,0.0000");
            } else {
                return numeral(num).format("0,0");
            }
        },
    },
    created() {
        this.setFlags();
    },
};
</script>