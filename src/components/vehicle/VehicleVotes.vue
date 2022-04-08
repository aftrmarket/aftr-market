<template>
    <div class="pt-4 w-full">
        <vehicle-votes-add v-if="showAddVotes" :vehicle="vehicle" @close="closeModal('add')"></vehicle-votes-add>
        <vehicle-votes-cast v-if="showCastVotes" :vehicle="vehicle" :voteId="voteId" :voteData="voteData" :contractId="contractId" :currentBlock="currentBlock.height"  @close="closeModal('cast')"></vehicle-votes-cast>
    </div>
    <div class="flex flex-col">
        <div class="flex justify-between">
            
            <div class="mt-2 pb-3 text-sm text-gray-700">Current Block: {{ currentBlock.height  }}</div>
            <div>
                <input type="radio" v-model="selectedVoteCategory" value="Active" class="form-radio text-aftrBlue" /><label class="px-2 text-sm text-gray-700">Active Votes</label>
                <input type="radio" v-model="selectedVoteCategory" value="Concluded" class="form-radio text-aftrBlue" /><label class="px-2 text-sm text-gray-700">Concluded Votes</label>
            </div>

            <div v-if="false">
                <button v-if="allowAdd" @click.prevent="openModal('add')" type="button" class="inline-flex items-center px-4 py-2 mb-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                    </svg>
                    <span class="pl-2">PROPOSE</span>
                </button>
                <div v-else-if="!arConnected">
                    <label class="pl-4 mt-2 mb-3 block text-sm text-gray-700">
                        You must connect a wallet in order to propose a vote
                    </label>
                </div>
                <div v-else>
                    <label class="pl-4 mt-2 mb-3 block text-sm text-gray-700 text-aftrRed">
                        Only Members are allowed to create a vote
                    </label>
                </div>
            </div>
        </div>
        <table v-if="filteredPeople.length > 0" class="min-w-full divide-y divide-gray-200">
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
                  Result (Y - N)
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200" v-for="vote in filteredPeople" :key="vote.id">
              <tr >
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ walletAddressSubstr(vote.id) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 break-all">
                  {{ displayProposal(vote) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ displayStatus(vote.status) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ vote.yays }} - {{ vote.nays }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                    <button v-if="canVote(vote) && vote.status === 'active'" @click.prevent="openModal('cast', vote.id, vote)" type="button" class="text-aftrBlue hover:text-indigo-900">
                        Vote
                    </button>
                    <div v-else-if="votedText(vote) === 'voted'" class="flex content-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="green">
                                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg> Voted
                    </div>
                </td>
              </tr>
            </tbody>
        </table>
        <div v-if="filteredPeople.length == 0">
            Votes are not available.
        </div>
    </div>
</template>

<script>

import VehicleVotesAdd from './votes/VehicleVotesAdd.vue';
import VehicleVotesCast from './votes/VehicleVotesCast.vue';
import { mapGetters,mapState } from 'vuex';
import capitalize from '../utils/shared.js';

export default {
    props: ['vehicle', 'contractId'],
    components: { VehicleVotesAdd, VehicleVotesCast },
    data() {
        return {
            showAddVotes: false,
            showCastVotes: false,
            allowAdd: false,
            voteId: 0,
            voteData : {},
            votes: this.vehicle.votes,
            selectedVoteCategory: "Active"
        };
    },
    computed: {
        ...mapGetters(['arConnected', 'getActiveAddress', 'getCurrentBlockValue']),
        ...mapState(['currentBlock']),
        filteredPeople() {
			let status = this.selectedVoteCategory;
            let vote = this.votes
            if(status == "active" || status == "Active"){
                    let voteArray = vote.filter(voteVal => voteVal.status === 'active');
                    return voteArray;
            } else {
                    let voteArray = vote.filter(voteVal => voteVal.status != 'active');
                    return voteArray;
            }
        },
    },
    mounted () {
        this.$store.dispatch('loadCurrentBlock')
    },
    watch: {
        arConnected(value) {
            this.setFlags();
        }
    },
    methods: {
    arConnect() {
        this.$store.dispatch('getCurrentBlockValue');
    },
     walletAddressSubstr(addr, chars = 10) {
            if (typeof addr === 'string') {
                let len = parseInt(chars/2);
                return addr.substr(0, len) + '...' + addr.substr(-len);
            } else {
                return '';
            }
        },
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
        displayStatus(status) {
            return capitalize(status);
        },
        displayProposal(vote) {
            if (!vote.type || vote.type === '') {
                return vote.note;
            } else if (vote.type=== 'set') {
                return "Change " + capitalize(vote.key) + " to " + capitalize(vote.value);
            } else if (vote.type === '?') {
                return "?";
            } else if (vote.type === '???') {
                return "???";
            } else {
                return capitalize(vote.note);
            }
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
        canVote(vote) {
            // In order to vote, user must be a member of the vehicle AND must not have already voted
            if (this.arConnected && this.getActiveAddress in this.vehicle.balances && !vote.voted.includes(this.getActiveAddress)) {
                return true;
            } else {
                return false;
            }
        },
        votedText(vote) {
            if (!this.arConnected) {
                return 'na';
            } else if (vote.voted.includes(this.getActiveAddress)) {
                return 'voted'
            } else if (this.getActiveAddress in this.vehicle.balances) {
                return 'eligible'
            }
        },
        openModal(modalType = 'add', id = 0, vote ={}) {
            if (modalType === 'add') {
                this.showAddVotes = true;
            } else {
                this.voteId = id;
                this.voteData = vote;
                this.showCastVotes = true;
            }
        },
        closeModal(modalType = 'add') {
            if (modalType === 'add') {
                this.showAddVotes = false;
            } else {
                this.showCastVotes = false;
            }
        },
        initVotes() {
            if (!('votes' in this.vehicle)) {
                this.vehicle.votes = [];
            }

        }
    },
    created() {
        this.setFlags();
        this.initVotes();
    }
};
</script>