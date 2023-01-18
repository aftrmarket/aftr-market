<template>

    <div class="w-full justify-between p-6 space-x-6 overflow-hidden">
        <div class="grid grid-rows-3 grid-flow-col gap-x-4 gap-y-1">
            <div class="row-span-3 w-20">
                <img class="w-20 h-20 bg-gray-300 rounded-full" :src="repoLogo" alt="">
            </div>
            <div class="col-span-2 min-w-full">
                <h3 :class="actionRequiredClass">{{ repo.name }}</h3>
            </div>
            <div class="row-span-2 col-span-1">
                <div v-if="repo.desc" class="mt-1 text-gray-500 text-sm line-clamp-3 break-words">{{ repo.desc }}
                </div>
                <div v-else class="border-t border-white w-60"></div>
            </div>
        </div>
    </div>
    <div class="grid grid-cols-3 justify-items-center">
        <p class="pl-2 t-1 text-gray-500 text-sm truncate">Assets</p>
        <p class="pl-2 t-1 text-gray-500 text-sm truncate">Members</p>
        <p class="pl-2 t-1 text-gray-500 text-sm truncate">Active Votes</p>
        <p>{{ repo.tokens.length }}</p>
        <p>{{ Object.keys(repo.balances).length }}</p>
        <p>{{ formatNumber(repo.totalActiveVotes) }}</p>
        <!--
        <div class="pb-3 grid grid-cols-2 items-center text-base">
            <div class="pl-3 justify-self-start">Tips(AR): <span class="font-medium text-green-500">{{ formatNumber(repo.tipsAr) }}</span></div>
            <div class="pr-3 justify-self-end">Tips(Misc): <span class="font-medium text-green-500">{{ formatNumber(repo.tipsMisc) }}</span></div>
        </div>-->
    </div>
    <div>
        <div class="pt-4 pb-3 grid grid-cols-3 gap=2 items-center text-base">
            <div class="pl-3 justify-self-start">
                <span :class="repoStatusAlert">{{ repoStatusText }}</span>
            </div>
            <div class="justify-self-center">
                <div v-if="evolveNeeded" class="tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#FF6C8C">
                        <path fill-rule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                            clip-rule="evenodd" />
                    </svg>
                    <span class="tooltiptext">{{ evolveText }}</span>
                </div>
                <div v-if="concludeVote" class="tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#FF6C8C" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <span class="tooltiptext">{{ concludeVoteText }}</span>
                </div>
            </div>
            <div class="pr-3 justify-self-end">
                <span class="capitalize px-2 sm:px-4 py-3 inline-flex leading-3 text-xs font-medium rounded-full bg-blue-100 text-blue-800">{{ repo.ticker }}</span>
            </div>
            <!---
            <div class="-ml-px w-0 flex-1 flex justify-end pr-3">
                <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                    <span class="pl-2">LEASE</span>
                </button>
            </div>
            -->
        </div>
    </div>
</template>

<script>
import numeral from "numeral";
import { mapGetters } from "vuex";

export default {
    props: ["repo"],
    data() {
        return {
            evolveNeeded: false,
            concludeVote: false,
        };
    },
    computed: {
        actionRequiredClass() {
            if (this.evolveNeeded || this.concludeVote) {
                return "text-aftrRed text-xl font-normal line-clamp-1 break-all";
            } else {
                return "text-gray-900 text-xl font-normal line-clamp-1 break-all";
            }
        },
        evolveText() {
            return "Contract Update Needed";
        },
        concludeVoteText() {
            return "Vote Confirmation Needed";
        },
        repoStatusAlert() {
            if (typeof this.repo.status === 'undefined' || this.repo.status === 'stopped' || this.repo.status === '') {
                return "capitalize px-2 sm:px-4 py-3 inline-flex leading-3 text-xs font-medium rounded-full bg-red-100 text-red-800";
            } else if (this.repo.status === 'started') {
                return "capitalize px-2 sm:px-4 py-3 inline-flex leading-3 text-xs font-medium rounded-full bg-green-100 text-green-800";
            } else {
                return "capitalize px-2 sm:px-4 py-3 inline-flex leading-3 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800";
            }
        },
        repoStatusText() {
            if (typeof this.repo.status === 'undefined' || this.repo.status === 'stopped' || this.repo.status === '') {
                return 'not running';
            } else {
                return this.repo.status;
            }
        },
        repoLogo() {
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

            return logoUrl;
        },
        ...mapGetters(["getActiveAddress"]),
    },
    methods: {
        formatNumber(num, dec = false) {
            if (dec) {
                return numeral(num).format("0,0.0000");
            } else {
                return numeral(num).format("0,0");
            }
        },
    },
    created() {
        // Does repo contract need to be evolved? Only show to members of the repo
        if (this.repo.evolveNeeded && (this.repo.owner === this.getActiveAddress || this.getActiveAddress in this.repo.balances)) {
            this.evolveNeeded = true;
        }
        if (this.repo.concludeVoteNeeded) {
            this.concludeVote = true;
        }
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