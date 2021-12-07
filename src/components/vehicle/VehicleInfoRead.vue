<template>
    <div class="pt-2">
        <div class="flex items-center justify-between">
            <div class="px-4 py-5 sm:px-6">
                <h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">
                    {{ vehicle.name }}
                </h2>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    <span class="text-lg text-black">{{ vehicle.ticker }}</span>
                </p>
            </div>
            <div class="pr-6">
                <p class="text-gray-900">Current Value: <span class="px-2 py-3 sm:px-6 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{ formatNumber(vehicle.treasury, true) }} AR</span></p>
            </div>
        </div>
        <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
            Contained in Vehicle
            </h3>
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
        <div class="flex items-start justify-between">
            <div>
                <div class="px-4 sm:px-6 max-w-2xl text-sm text-gray-500">Status</div>
                <div class="flex items-center justify-between pb-4">
                    <div class="px-4 sm:px-6">
                        <!--
                        <span :class="vehicleStatusAlert">{{ vehicleStatusText }}</span>
                        -->
                    </div>
                </div>
            </div>
            <!--
            <vehicle-status-text 
                :headerText="'Editing'" 
                :item1="'Creator'" 
                :item1Status="getActiveAddress === creatorAddress ? true : false" 
                :item2="'Status = Not Running'" 
                :item2Status="vehicle.status === 'stopped' || typeof vehicle.status === 'undefined' ? true : false"
                :item3="'Single Ownership'"
                :item3Status="vehicle.ownership === 'single' ? true : false"
                :footerMessage="allowVehicleEdits ? 'Edits allowed' : 'Votes must be passed to edit'"
                :footerStatus="allowVehicleEdits ? true : false">
            </vehicle-status-text>
            -->
        </div>
    </div>
</template>

<script>
import numeral from "numeral";

export default {
    props: ['vehicle'],
    components: {},
    data() {
        return {
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
            }
        };
    },
    computed: {

    },
    methods: {
        formatNumber(num, dec = false) {
            if (dec) {
                return numeral(num).format("0,0.0000");
            } else {
                return numeral(num).format("0,0");
            }
        },
        aggregateInfo() {
            console.log(JSON.stringify(this.vehicle));
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
        }
    },
    created() {
        this.aggregateInfo();
    }
};
</script>