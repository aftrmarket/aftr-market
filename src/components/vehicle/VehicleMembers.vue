<template>
    <div class="pt-4 w-full grid grid-cols-3 gap-4">
        <vehicle-members-add v-if="showAddModal" :vehicle="vehicle" @close="closeModal"></vehicle-members-add>
        <!-- Member Table -->
        <div class="col-span-2 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Member ({{ Object.keys(vehicle.balances).length }})
                        </th>
                        <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tokens
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(tokens, addr) in vehicle.balances" :key="addr" class="text-xs text-gray-500 hover:bg-gray-50">
                        <td class="text-left px-4 py-2">
                            {{ addr }}
                        </td>
                        <td class="text-right px-4 py-2">
                            {{ formatNumber(tokens) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="grid justify-end">
            <vehicle-status-text 
                :headerText="'Adding Members'" 
                :item1="'Creator'" 
                :item1Status="getActiveAddress === creatorAddress ? true : false" 
                :item2="'Status = Not Running'" 
                :item2Status="vehicle.status === 'stopped' || typeof vehicle.status === 'undefined' ? true : false"
                :item3="'Single Ownership'"
                :item3Status="vehicle.ownership === 'single' ? true : false"
                :footerMessage="allowVehicleAdds ? 'Members may be added or removed' : 'Votes must be passed to add/remove members'"
                :footerStatus="allowVehicleAdds ? true : false">
            </vehicle-status-text>
        </div>

        <div class="col-span-3 flex flex-col inline-flex">
            <div v-if="false && allowVehicleAdds && !arConnected" class="pt-6 flex justify-start items-center">
                <button @click="arConnect" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aftrBlue hover:bg-aftrBlue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Login to ArConnect
                </button>
                <label class="pl-4 block text-sm text-gray-700">
                    You must provide a wallet in order to add members to a vehicle
                </label>
            </div>
            <div v-if="false && allowVehicleAdds && arConnected">
                <button @click.prevent="addMember" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                    <span class="pl-2">ADD MEMBERS</span>
                </button>
            </div>
        </div>
    </div>

</template>

<script>
import numeral from "numeral";
import { mapGetters } from 'vuex';
import VehicleStatusText from './VehicleStatusText.vue';
import VehicleMembersAdd from './VehicleMembersAdd.vue';

export default {
    props: ['vehicle'],
    components: { VehicleStatusText, VehicleMembersAdd },
    data() {
        return {
            allowVehicleAdds: false,            // Allow adding members if Creator and Not Started
            allowVehicleRemoves: false,         // Allow removing members if Creator, Single Ownership, and Not Started
            showAddModal: false                 // ADD THIS FUNCTIONALITY LATER
        };
    },
    watch: {
        arConnected() {
            this.setFlags();
        },
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
    methods: {
        formatNumber(num, dec = false) {
            if (dec) {
                return numeral(num).format("0,0.0000");
            } else {
                return numeral(num).format("0,0");
            }
        },
        setFlags() {
            // Allow member add/remove if user is creator and (ownership is single or vehicle is not running), otherwise changes must be via vote
            if (this.getActiveAddress === this.creatorAddress && (this.vehicle.ownership === 'single' || this.vehicle.status !== 'started')) {
                this.allowVehicleAdds = true;
                this.allowVehicleRemoves = true;
            } else {
                this.allowVehicleAdds = false;
                this.allowVehicleRemoves = false;
            }
        },
        arConnect() {
            this.$store.dispatch('arConnect');
        },
        addMember(){
            this.showAddModal = true;
        },
        closeModal() {
            this.showAddModal = false;
        },
    },
};
</script>