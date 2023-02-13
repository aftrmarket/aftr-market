<template>
    <vote-simulator v-if="showVoteSimulator" :repo="repo" :vote="simulatedVote" @close="closeSimulatorModal"></vote-simulator>
    <div class="pt-4 w-full">
        <repo-vote-history v-if="showVoteHistory" :repo="repo" :voteData="voteData" @close="closeVoteHostory"></repo-vote-history>
        <repo-votes-add v-if="showAddVotes" :repo="repo" @close="closeModal('add')"></repo-votes-add>
        <repo-votes-cast v-if="showCastVotes" :repo="repo" :voteId="voteId" :voteData="voteData" :contractId="contractId" :currentBlock="currentBlock.height"
            @close="closeModal('cast')">
        </repo-votes-cast>
    </div>
    <div class="flex flex-col">
        <div class="flex justify-between">

            <div class="mt-2 pb-3 text-sm text-gray-700">Current Block: {{ currentBlock.height }}</div>
            <div>
                <input type="radio" v-model="selectedVoteCategory" value="Active" class="form-radio text-aftrBlue" /><label class="px-2 text-sm text-gray-700">Active Votes</label>
                <input type="radio" v-model="selectedVoteCategory" value="Concluded" class="form-radio text-aftrBlue" /><label class="px-2 text-sm text-gray-700">Concluded
                    Votes</label>
            </div>

            <div v-if="false">
                <button v-if="allowAdd" @click.prevent="openModal('add')" type="button"
                    class="inline-flex items-center px-4 py-2 mb-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clip-rule="evenodd" />
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
        <table v-if="filteredVotes.length > 0" class="min-w-full divide-y divide-gray-200">
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
                        Result <br /> (Y - N)
                    </th>
                    <th v-if="allowAdd && selectedVoteCategory === 'Active'" scope="col" class="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200" v-for="vote in filteredVotes" :key="vote.id">
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-aftrBlue cursor-pointer" @click.prevent="voteHistoryModel(vote)">
                        {{ walletAddressSubstr(vote.id) }}
                    </td>
                    <td class="px-6 py-4 whitespace-normal text-sm text-gray-500 break-all">
                        {{ displayProposal(vote) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ displayStatus(vote.status) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ vote.yays }} - {{ vote.nays }}
                    </td>
                    <td v-if="allowAdd && selectedVoteCategory === 'Active'"
                        class="lg:flex lg:flex-row px-6 py-4 whitespace-nowrap text-sm font-medium lg:space-x-4 justify-center items-center table-cell">
                        <div v-if="canVote(vote) && vote.status === 'active'" class="text-center">
                            <button @click.prevent="openModal('cast', vote.id, vote)" type="button" class="text-aftrBlue hover:text-indigo-900">
                                Cast
                            </button>
                        </div>
                        <div v-else-if="votedText(vote) === 'voted'" class="flex content-center justify-end">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="green">
                                <path fill-rule="evenodd"
                                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd" />
                            </svg> Voted
                        </div>
                        <div v-if="vote.status === 'active'" class="text-center">
                            <button @click.prevent="voteSimulatorTest(vote)" :repo="repo" type="submit" class="text-aftrBlue hover:text-indigo-900">Simulate</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="filteredVotes.length == 0">
            No Votes to show.
        </div>
    </div>
</template>

<script>

import RepoVotesAdd from './votes/RepoVotesAdd.vue';
import RepoVotesCast from './votes/RepoVotesCast.vue';
import RepoVoteHistory from './votes/RepoVoteHistory.vue';
import { mapGetters } from 'vuex';
import { capitalize } from '../utils/shared.js';
import VoteSimulator from "./VoteSimulator.vue";

export default {
    props: ['repo', 'contractId', 'isMember'],
    components: { RepoVotesAdd, RepoVotesCast, VoteSimulator, RepoVoteHistory },
    data() {
        return {
            showAddVotes: false,
            showCastVotes: false,
            showVoteHistory: false,
            allowAdd: false,
            voteId: 0,
            voteData: {},
            votes: this.repo.votes ? this.repo.votes : [],
            selectedVoteCategory: "Active",
            showVoteSimulator: false,
            simulatedVote: {},

            /** Smartweave variables */
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            arweaveMine: import.meta.env.VITE_MINE,
            /** */
        };
    },
    computed: {
        ...mapGetters(['arConnected', 'getActiveAddress', 'currentBlock']),
        filteredVotes() {
            let status = this.selectedVoteCategory;
            let vote = this.votes
            if (status == "active" || status == "Active") {
                let voteArray = vote.filter(voteVal => voteVal.status === 'active');
                return voteArray;
            } else {
                let voteArray = vote.filter(voteVal => voteVal.status != 'active');
                return voteArray;
            }
        },
    },
    async mounted() {
        await this.$store.dispatch('loadCurrentBlock');
    },
    watch: {
        arConnected(value) {
            this.setFlags();
        }
    },
    methods: {
        voteSimulatorTest(vote) {
            //  console.log("repo", this.repo)
            this.simulatedVote = vote;
            this.showVoteSimulator = true;
        },
        closeSimulatorModal() {
            this.showVoteSimulator = false;
        },
        voteHistoryModel(vote) {
            this.showVoteHistory = true;
            this.voteData = vote;
        },
        closeVoteHostory() {
            this.showVoteHistory = false;
        },
        walletAddressSubstr(addr, chars = 10) {
            if (typeof addr === 'string') {
                let len = parseInt(chars / 2);
                return addr.substring(0, len) + '...' + addr.substring(addr.length - len);
            } else {
                return '';
            }
        },
        setFlags() {
            /*** 
                In order to create a vote, you must 
                    1. Be arConnected.
                    2. Be a member of the repo.
            ***/
            if (this.isMember) {
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
            } else if (vote.type === 'set') {
                return "Change " + capitalize(vote.key) + " to " + capitalize(String(vote.value));
            } else if (vote.type === 'evolve') {
                return "Evolve contract proposal. Press the Vote ID to see more."
            } else if (vote.type === '?') {
                return "?";
            } else if (vote.type === '???') {
                return "???";
            } else {
                if (vote.note) {
                    return capitalize(vote.note);
                } else {
                    return vote.type;
                }
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
            // In order to vote, user must be a member of the repo AND must not have already voted
            if (this.allowAdd && !vote.voted.includes(this.getActiveAddress) && vote.votingPower.hasOwnProperty(this.getActiveAddress)) {
                return true;
            } else {
                return false;
            }
        },
        // async completeVote() {
        //     /*** 
        //      * To complete a vote, the contract needs to have an interaction run so that the concludeVotes function can run.
        //      * To do this, just do a dry run interaction.
        //      */

        //      /*** UPDATE:
        //       * Using Warp, there is no longer the need to complete a vote b/c it happens when readState is run.
        //       */
        //     let arweave = {};

        //     arweave = await Arweave.init({
        //         host: this.arweaveHost,
        //         port: this.arweavePort,
        //         protocol: this.arweaveProtocol,
        //         timeout: 20000,
        //         logging: true,
        //     });

        //     const wallet = "use_wallet";

        //     // Call SmartWeave
        //     try {
        //         const input = {
        //             function: "balance",
        //             target: this.getActiveAddress
        //         };
        //         // const input = {
        //         //     function: "propose",
        //         //     type: "set",
        //         //     key: "settings.quorum",
        //         //     value: 0.5
        //         // };

        //         const tx = await interactWriteDryRun(
        //             arweave,
        //             wallet,
        //             this.repo.id,
        //             input
        //         );         
        //         /**** IN ORDER FOR THIS TO PROCESS, YOU NEED TO RUN http://localhost:1984/mine */
        //         if(Boolean(this.arweaveMine)){
        //             const mineUrl = import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/mine";
        //             const response = await fetch(mineUrl);
        //         }
        //     } catch(e) {
        //         this.$swal({
        //             icon: "error",
        //             html: "The Complete Vote action failed.",
        //             showConfirmButton: true,
        //             allowOutsideClick: false,
        //         });
        //     }
        //     this.$swal({
        //         icon: "success",
        //         html: "The complete vote action has been submitted.  Once the contract processes the vote, the repo will be updated.",
        //         showConfirmButton: true,
        //         allowOutsideClick: false
        //     });

        //     this.$router.push({ name: "repo", params: { repoId: this.repo.id } });
        // },
        votedText(vote) {
            if (!this.arConnected) {
                return 'na';
            } else if (vote.voted.includes(this.getActiveAddress)) {
                return 'voted'
            } else if (this.getActiveAddress in this.repo.balances) {
                return 'eligible'
            }
        },
        openModal(modalType = 'add', id = 0, vote = {}) {
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
            if (!('votes' in this.repo)) {
                this.repo.votes = [];
            }
        }
    },
    created() {
        this.setFlags();
        this.initVotes();
    }
};
</script>