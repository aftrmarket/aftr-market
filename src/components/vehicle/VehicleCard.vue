<template>

    <div class="w-full justify-between p-6 space-x-6 overflow-hidden">
        <div class="grid grid-rows-3 grid-flow-col gap-x-4 gap-y-1">
            <div class="row-span-3 w-20">
                <img class="w-20 h-20 bg-gray-300 rounded-full" :src="vehicleLogo" alt="">
            </div>
            <div class="col-span-2 min-w-full">
                <h3 :class="actionRequiredClass">{{ vehicle.name }}</h3>
            </div>
            <div class="row-span-2 col-span-1">
                <div v-if="vehicle.desc" class="mt-1 text-gray-500 text-sm line-clamp-3 break-words">{{ vehicle.desc }}</div>
                <div v-else class="border-t border-white w-60"></div>
            </div>
        </div>
    </div>
    <div class="grid grid-cols-3 justify-items-center">
        <p class="pl-2 t-1 text-gray-500 text-sm truncate">Assets</p>
        <p class="pl-2 t-1 text-gray-500 text-sm truncate">Members</p>
        <p class="pl-2 t-1 text-gray-500 text-sm truncate">Active Votes</p>
        <p>{{ vehicle.tokens.length }}</p>
        <p>{{ Object.keys(vehicle.balances).length }}</p>
        <p>{{ formatNumber(vehicle.totalActiveVotes) }}</p>
        <!--
        <div class="pb-3 grid grid-cols-2 items-center text-base">
            <div class="pl-3 justify-self-start">Tips(AR): <span class="font-medium text-green-500">{{ formatNumber(vehicle.tipsAr) }}</span></div>
            <div class="pr-3 justify-self-end">Tips(Misc): <span class="font-medium text-green-500">{{ formatNumber(vehicle.tipsMisc) }}</span></div>
        </div>-->
    </div>
    <div>
        <div class="pt-4 pb-3 grid grid-cols-3 gap=2 items-center text-base">
            <div class="pl-3 justify-self-start">
               <span :class="vehicleStatusAlert">{{ vehicleStatusText }}</span>
            </div>
            <div class="justify-self-center">
                <div v-if="anyWithdrawals" class="tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#FF6C8C">
                        <path fill-rule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clip-rule="evenodd" />
                    </svg>
                    <span class="tooltiptext">Action Required</span>
                </div>
            </div>
            <div class="pr-3 justify-self-end">
                <span class="capitalize px-2 sm:px-4 py-3 inline-flex leading-3 text-xs font-medium rounded-full bg-blue-100 text-blue-800">{{ vehicle.ticker }}</span>
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

export default {
    props: ["vehicle"],
    data() {
        return {
            anyWithdrawals: false
        };
    },
    computed: {
        actionRequiredClass() {
            if (this.anyWithdrawals) {
                return "text-aftrRed text-2xl font-normal line-clamp-1 break-all";
            } else {
                return "text-gray-900 text-2xl font-normal line-clamp-1 break-all";
            }
        },
        vehicleStatusAlert() {
            if (typeof this.vehicle.status === 'undefined' || this.vehicle.status === 'stopped' || this.vehicle.status === '') {
                return "capitalize px-2 sm:px-4 py-3 inline-flex leading-3 text-xs font-medium rounded-full bg-red-100 text-red-800";
            } else if (this.vehicle.status === 'started') {
                return "capitalize px-2 sm:px-4 py-3 inline-flex leading-3 text-xs font-medium rounded-full bg-green-100 text-green-800";
            } else {
                return "capitalize px-2 sm:px-4 py-3 inline-flex leading-3 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800";
            }
        },
        vehicleStatusText() {
            if (typeof this.vehicle.status === 'undefined' || this.vehicle.status === 'stopped' || this.vehicle.status === '') {
                return 'not running';
            } else {
                return this.vehicle.status;
            }
        },
        vehicleLogo(){
            let logoUrl = "";

            if (!this.vehicle.logo || this.vehicle.logo === '') {
                logoUrl = "https://avatars.dicebear.com/api/pixel-art-neutral/:" + this.vehicle.id + ".svg";
            } else {
                // logoUrl = "https://arweave.net/" + this.vehicle.logo;
                if(import.meta.env.VITE_ARWEAVE_PORT){
                    logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/" + this.vehicle.logo}`;
                } else {
                    logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + "/" + this.vehicle.logo}`;
                }
            }
            
            return logoUrl;
        },
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
        // Are there any withdrawals waiting to be processed?
        for (let token of this.vehicle.tokens) {
            if (token.withdrawals && token.withdrawals.length > 0) {
                this.anyWithdrawals = true;
                break;
            }
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
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555555 transparent transparent transparent;
}
</style>