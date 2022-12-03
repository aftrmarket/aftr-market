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
            <div class="px-4 py-6 sm:px-6 grid grid-cols-2 gap-x-4">
                <label class="block text-lg text-gray-900">Vehicle's Running Source:</label>
                <label :class="vehicleRunningSrcClass">
                    {{ walletAddressSubstr(vehicleRunningSourceId) }}
                    <span v-if="vehicleRunningSourceId === latestAftrSrcId" class="py-1 tooltip">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="green" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M9.661 2.237a.531.531 0 01.678 0 11.947 11.947 0 007.078 2.749.5.5 0 01.479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 01-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 01.48-.425 11.947 11.947 0 007.077-2.75zm4.196 5.954a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="tooltiptext text-sm">Running latest AFTR version</span>
                    </span>
                    <span v-else class="tooltip">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FF6C8C" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="tooltiptext text-sm">Newer AFTR version available</span>
                    </span>
                </label>
                <label class="block text-lg text-gray-900">Latest AFTR Source:</label>
                <label class="block text-aftrBlue text-lg font-mono tracking-wider" @click="viewLatestAftrSource">{{
                        walletAddressSubstr(latestAftrSrcId)
                }}</label>
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
                            <span class="ml-2 text-sm font-medium text-gray-500"> with {{
                                    formatNumber(counts.members.sumOfLocked)
                            }} locked in the vault</span>
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
                            <span class="ml-2 text-sm font-medium text-gray-500"> from {{
                                    formatNumber(counts.assets.total)
                            }} assets</span>
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
                            <span class="ml-2 text-sm font-medium text-gray-500"> from {{
                                    formatNumber(counts.votes.total)
                            }} votes</span>
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
                        {{ ownerText }}
                    </div>
                </div>
            </div>
            <div v-if="allowVoteSimulator">
                <div class="px-4 sm:px-6 max-w-2xl text-sm text-gray-500">
                    Use the <button style="color:#6C8CFF" @click.prevent="voteSimulatorTest" type="submit"
                        :vehicle="vehicle"> Vote Simulator </button> to validate your vote system settings.
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
    components: { VoteSimulator },
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
            latestAftrSrcId: "",
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
                return 'Multiple';
            }
        },
        getVotingSystem() {
            if (this.vehicle.votingSystem === 'equal') {
                return 'Distributed Evenly';
            } else {
                return 'Weighted';
            }
        },
        ownerText() {
            if (this.vehicle.ownership === 'single') {
                return this.walletAddressSubstr(this.vehicle.owner);
            } else {
                return 'Members';
            }
        },
        vehicleRunningSourceId() {
            if (this.vehicle.evolve !== "") {
                return this.vehicle.evolve;
            } else {
                return this.vehicle.contractSrc;
            }
        },
        vehicleRunningSrcClass() {
            if (this.vehicleRunningSourceId !== this.latestAftrSrcId) {
                return "block text-aftrRed text-lg font-mono tracking-wider flex flex-nowrap";
            }
            return "block text-aftrBlue text-lg font-mono tracking-wider flex flex-nowrap";
        },
        ...mapGetters(['getActiveAddress', 'getAftrContractSources']),
    },
    methods: {
        voteSimulatorTest() {
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
                let len = parseInt(chars / 2);
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
                    this.vehicle.vault[addr].forEach(vault => {
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
        },
        viewLatestAftrSource() {
            this.$router.push("../latest-contract-source");
        }
    },
    created() {
        const csArray = this.getAftrContractSources;
        this.latestAftrSrcId = csArray[csArray.length - 1];
        this.aggregateInfo();
    }
};
</script>
<style>
/* Tooltip container */
.tooltip {
    position: relative;
    display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    bottom: 100%;
    left: 50%;
    margin-left: -60px;
    background-color: #555555;
    color: white;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text*/
    position: absolute;
    z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
    visibility: visible;
}

.tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    top: 100%;
    /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555555 transparent transparent transparent;
}
</style>