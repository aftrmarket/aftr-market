<template>
    <div class="pt-4 w-full">
        <vehicle-votes-add v-if="showAddVotes" :vehicle="vehicle" @close="closeModal"></vehicle-votes-add>
    </div>
    <!---<div class="pt-4 px-4 py-5 sm:px-6">
        <h3 class="text-xl font-light leading-6">Coming Soon...</h3>
    </div>--->


    <div class="mt-6 flex flex-col inline-flex">
        <button v-if="allowAdd" @click.prevent="openModal" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
            </svg>
            <span class="pl-2">CREATE VOTE</span>
        </button>
        <div v-else-if="!arConnected" class="pt-6 flex justify-start items-center">
            <button @click="arConnect" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aftrBlue hover:bg-aftrBlue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Login to ArConnect
            </button>
            <label class="pl-4 block text-sm text-gray-700">
                You must provide a wallet in order to create a vote
            </label>
        </div>
        <div v-else class="pt-6 flex justify-start items-center">
            <label class="pl-4 block text-sm text-gray-700">
                Only Members are allowed to create a vote
            </label>
        </div>
    </div>
</template>

<script>

import VehicleVotesAdd from './votes/VehicleVotesAdd.vue';
import { mapGetters } from 'vuex';

export default {
    props: ['vehicle'],
    components: { VehicleVotesAdd },
    data() {
        return {
            showAddVotes: false,
            allowAdd: false,
        };
    },
    computed: {
        ...mapGetters(['arConnected', 'getActiveAddress']),
    },
    watch: {
        arConnected(value) {
            this.setFlags();
        }
    },
    methods: {
        setFlags() {
            /*** 
                In order to create a vote, you must 
                    1. Be arConnected.
                    2. Be a member of the vehicle.
            ***/
            if (this.arConnected && this.getActiveAddress in this.vehicle.balances) {
                this.allowAdd = true;
            } else {
                this.allowAdd = false;
            }
        },
        arConnect() {
            this.$store.dispatch('arConnect');
        },
        openModal() {
            this.showAddVotes = true;
        },
        closeModal() {
            this.showAddVotes = false;
        }
    },
    created() {
        this.setFlags();
    }
};
</script>