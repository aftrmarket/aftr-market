<template>
    <div class="pt-2">
        <vote-simulator v-if="showVoteSimulator" :vehicle="vehicle" @close="closeModal"></vote-simulator>
        <div class="flex items-center justify-between">
            <div class="px-4 py-6 sm:px-6 grid grid-cols-2 gap-x-4">
                <label class="block text-lg text-gray-900">Vehicle Name:</label>
                <label class="block text-lg text-gray-500 font-medium">{{ vehicle.name }}</label>
                <label class="block text-lg text-gray-900">Ticker:</label>
                <label class="block text-lg text-gray-500 font-medium">{{ vehicle.ticker }}</label>
            </div>
            <div class="pr-6">
                <p class="text-gray-900">Current Value: <span class="px-2 py-3 sm:px-6 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{ formatNumber(vehicle.treasury, true) }} AR</span></p>
            </div>
        </div>
        <div v-if="vehicle.desc !== '' && vehicle.desc !== undefined" class="px-4 py-4 sm:px-6">
            <div class="block text-lg text-gray-900">Description</div>
            <div class="block text-lg text-gray-500 font-medium">{{ vehicle.desc }}</div>
        </div>
        <div>
            <div class="grid grid-cols-3 gap-4">
                <dl class="mt-5">
                    <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt class="text-sm font-medium text-gray-500 truncate">
                            Members
                        </dt>
                        <dd class="mt-1 text-3xl font-semibold text-aftrBlue">
                            {{ formatNumber(counts.members.total) }} 
                            <span class="ml-2 text-sm font-medium text-gray-500"> with {{ formatNumber(counts.members.sumOfLocked) }} locked tokens</span>
                        </dd>
                    </div>
                </dl>
                <dl class="mt-5">
                    <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt class="text-sm font-medium text-gray-500 truncate">
                            Tokens
                        </dt>
                        <dd class="mt-1 text-3xl font-semibold text-aftrBlue">
                            {{ formatNumber(counts.assets.sumOfTokens) }} 
                            <span class="ml-2 text-sm font-medium text-gray-500"> from {{ formatNumber(counts.assets.total) }} assets</span>
                        </dd>
                    </div>
                </dl>
                <dl class="mt-5">
                    <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt class="text-sm font-medium text-gray-500 truncate">
                            Active Votes
                        </dt>
                        <dd class="mt-1 text-3xl font-semibold text-aftrBlue">
                            {{ formatNumber(counts.votes.active) }} 
                            <span class="ml-2 text-sm font-medium text-gray-500"> from {{ formatNumber(counts.votes.total) }} votes</span>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
        <div class="pt-4 grid grid-cols-4">
            <div>
                <div class="px-4 sm:px-6 max-w-2xl text-sm text-gray-500">Status</div>
                <div class="flex items-center justify-between pb-4">
                    <div class="px-4 sm:px-6">
                        {{ getStatus }}
                    </div>
                </div>
            </div>
            <div>
                <div class="px-4 sm:px-6 max-w-2xl text-sm text-gray-500">Ownership</div>
                <div class="flex items-center justify-between pb-4">
                    <div class="px-4 sm:px-6">
                        {{ getOwnership }}
                    </div>
                </div>
            </div>
            <div>
                <div class="px-4 sm:px-6 max-w-2xl text-sm text-gray-500">Owner</div>
                <div class="flex items-center justify-between pb-4">
                    <div class="px-4 sm:px-6 text-left text-sm font-mono tracking-wider">
                        {{ walletAddressSubstr(vehicle.owner) }}
                    </div>
                </div>
            </div>
            <div v-if="allowVoteSimulator">
                <div class="px-4 sm:px-6 max-w-2xl text-sm text-gray-500">
                    Use the <button style="color:#6C8CFF" @click.prevent="voteSimulatorTest" type="submit" :vehicle="vehicle"> Vote Simulator </button> to validate your vote system settings.
                </div>
            </div>
        </div>
        <div class="pt-4 grid grid-cols-4">    
            <div>
                <div class="px-4 sm:px-6 max-w-2xl text-sm text-gray-500">Voting System</div>
                <div class="flex items-center justify-between pb-4">
                    <div class="px-4 sm:px-6">
                        {{ getVotingSystem }}
                    </div>
                </div>
            </div>
            <div>
                <div class="px-4 sm:px-6 max-w-2xl text-sm text-gray-500">Vote Length</div>
                <div class="flex items-center justify-between pb-4">
                    <div class="px-4 sm:px-6">
                        {{ formatNumber(currentVehicleSettings.get('voteLength')) }}
                    </div>
                </div>
            </div>
            <div>
                <div class="px-4 sm:px-6 max-w-2xl text-sm text-gray-500">Quorum</div>
                <div class="flex items-center justify-between pb-4">
                    <div class="px-4 sm:px-6">
                        {{ formatNumber(currentVehicleSettings.get('quorum'), true) }} %
                    </div>
                </div>
            </div>
            <div>
                <div class="px-4 sm:px-6 max-w-2xl text-sm text-gray-500">Support</div>
                <div class="flex items-center justify-between pb-4">
                    <div class="px-4 sm:px-6">
                        {{ formatNumber(currentVehicleSettings.get('support'), true) }} %
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import numeral from "numeral";
import VoteSimulator from "./VoteSimulator.vue";
import { mapGetters } from 'vuex';

export default {
    props: ['vehicle'],
    components: {VoteSimulator},
    data() {
        return {
            currentVehicleSettings: null,
            counts: {
                members: {
                    total: 0,
                    sumOfUnlocked: 0,
                    sumOfLocked: 0
                },
                assets: {
                    total: 0,
                    sumOfTokens: 0
                },
                votes: {
                    total: 0,
                    active: 0,
                    finalized: 0
                },
            },
            allowVoteSimulator: false,
            showVoteSimulator: false,
        };
    },
    computed: {
        getStatus() {
            if (this.vehicle.status === 'started') {
                return 'Started';
            } else if (this.vehicle.status === 'stopped') {
                return 'Not Running';
            } else {
                return 'Expired';
            }
        },
        getOwnership() {
            if (this.vehicle.ownership === 'single') {
                return 'Single';
            } else {
                return 'DAO Owned'
            }
        },
        getVotingSystem() {
            if (this.vehicle.votingSystem === 'equal') {
                return 'Distributed Evenly';
            } else {
                return 'Weighted';
            }
        },
        ...mapGetters(['getActiveAddress']),
    },
    methods: {
        voteSimulatorTest(){
            //  console.log("vehicle", this.vehicle)
            this.showVoteSimulator = true;
        },
        closeModal() {
            this.showVoteSimulator = false;
        },
        formatNumber(num, dec = false) {
            if (dec) {
                return (num * 100).toFixed(2);
                // numeral(num).format("0,0.0000");
            } else {
                return numeral(num).format("0,0");
            }
        },
        walletAddressSubstr(addr, chars = 10) {
            if (typeof addr === 'string') {
                let len = parseInt(chars/2);
                return addr.substring(0, len) + '...' + addr.substring(addr.length - len);
            } else {
                return '';
            }
        },
        aggregateInfo() {
            this.$log.info("VehicleInfoRead : aggregateInfo :: ", JSON.stringify(this.vehicle));
            
            if (!this.vehicle.votingSystem || this.vehicle.votingSystem === '' || this.vehicle.votingSystem === 'undefined') {
                this.vehicle.votingSystem = 'equal';
            }

            this.currentVehicleSettings = new Map(this.vehicle.settings);


            if (typeof this.vehicle.balances !== 'undefined') {
                this.counts.members.total = Object.keys(this.vehicle.balances).length;
            }
            if (typeof this.vehicle.vault !== 'undefined') {
                for (const addr in this.vehicle.vault) {
                    this.vehicle.vault[addr].forEach( vault => {
                        this.counts.members.sumOfLocked += vault.balance;
                    });
                }
                this.counts.members.sumOfUnlocked = this.counts.members.total - this.counts.members.sumOfLocked;
            }
            if (typeof this.vehicle.tokens !== 'undefined') {
                this.counts.assets.total = this.vehicle.tokens.length;
                this.vehicle.tokens.forEach(token => {
                    this.counts.assets.sumOfTokens += token.balance;
                });
            }
            if (typeof this.vehicle.votes !== 'undefined') {
                this.counts.votes.total = this.vehicle.votes.length;

                const activeVotes = this.vehicle.votes.filter(vote => vote.status === 'active');
                this.counts.votes.active = activeVotes.length;
                this.counts.votes.finalized = this.counts.votes.total - this.counts.votes.active;
            }
            
            // Only allow Vote Simulator if user is member of Vehicle
            if (this.getActiveAddress in this.vehicle.balances) {
                this.allowVoteSimulator = true;
            } else {
                this.allowVoteSimulator = false;
            }
        }
    },
    created() {
        this.aggregateInfo();
    }
};
</script>