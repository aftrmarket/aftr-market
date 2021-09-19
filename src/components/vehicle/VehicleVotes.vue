<template>
    <div class="pt-4 w-full">
        <vehicle-votes-add v-if="showAddVotes" :vehicle="vehicle" @close="closeModal"></vehicle-votes-add>
    </div>
    <div class="flex flex-col">
        <div class="grid grid-cols-2">
            <div class="pb-2 text-sm text-gray-700">Current Block: {{ currentBlock }}</div>
            
            <div class="grid justify-items-end pb-2">
                <button v-if="allowAdd" @click.prevent="openModal" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                    </svg>
                    <span class="pl-2">PROPOSE</span>
                </button>
                <div v-else-if="!arConnected" class="flex justify-start items-center">
                    <label class="pl-4 block text-sm text-gray-700">
                        You must connect a wallet in order to propose a vote
                    </label>
                </div>
                <div v-else class="pt-6 flex justify-start items-center">
                    <label class="pl-4 block text-sm text-gray-700">
                        Only Members are allowed to create a vote
                    </label>
                </div>
            </div>
        </div>
        <table v-if="votes.length > 0" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vote
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proposal
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Result (Y / N)
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="vote in votes" :key="vote.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ vote.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ vote.proposal }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ calculateStatus(vote) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ vote.result }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a v-if="arConnected && vote.status === 'in-progress'" href="#" class="text-aftrBlue hover:text-indigo-900">Vote</a>
                </td>
              </tr>
            </tbody>
          </table>
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
            currentBlock: 110,  // TEMP, GET CURRENT BLOCK
            votes: [
                {
                    id: 101,
                    proposal: "Change something",
                    voteStart: 100,
                    voteEnd: 150,
                    result: "50 / 50"
                }
            ]
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
        calculateStatus(vote) {
            if (this.currentBlock >= vote.voteEnd) {
                // Voting is over
                vote['status'] = 'ended';
                return "Ended";
            } else if (this.currentBlock < vote.voteStart) {
                vote['status'] = 'not started';
                return "Starts @ " + (vote.voteStart).toString();
            } else {
                vote['status'] = 'in-progress';
                return "Ends @ " + (vote.voteEnd).toString();
            }
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