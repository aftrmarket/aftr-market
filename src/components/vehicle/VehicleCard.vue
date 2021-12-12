<template>
    <div class="w-full flex items-center justify-between p-6 space-x-6">
        <img class="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0" :src="vehicleLogo" alt="">
        <div class="flex-1 truncate">
            <div class="flex items-center space-x-3">
                <h3 class="text-gray-900 text-2xl font-normal truncate">{{ vehicle.name }}</h3>
                <span class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ vehicle.ticker }}</span>
            </div>
            <p class="mt-1 text-gray-500 text-sm truncate">
                Treasury (AR): 
                <span class="text-base text-aftrDarkGrey font-bold">{{ formatNumber(vehicle.treasury) }}</span> 
            </p>
            <p class="mt-1 text-gray-500 text-sm truncate">
                Votes Opened: 
                <span class="text-base text-aftrDarkGrey font-bold">0</span>
            </p>
            <!---
            <p class="mt-1 text-gray-500 text-sm truncate"><span class="text-base text-aftrDarkGrey font-bold">{{ vehicle.leasedSeats }}</span> Leased Seats</p>
            --->
        </div>
    </div>
    <div>
        <p class="pl-2 t-1 text-gray-500 text-sm truncate">Performance</p>
        <div class="pb-3 grid grid-cols-2 items-center text-base">
            <div class="pl-3 justify-self-start">Tips(AR): <span class="font-medium text-green-500">{{ formatNumber(vehicle.tipsAr) }}</span></div>
            <div class="pr-3 justify-self-end">Tips(Misc): <span class="font-medium text-green-500">{{ formatNumber(vehicle.tipsMisc) }}</span></div>
        </div>
    </div>
    <div>
        <div class="pt-4 pb-3 grid grid-cols-3 gap=2 items-center text-base">
            <div class="pl-3 justify-self-start">
                <div>{{ vehicle.tokens.length }} <span class="font-medium text-sm text-aftrDarkGrey">Tokens</span></div>
            </div>
            <div class="justify-self-center">
                <span :class="vehicleStatusAlert">{{ vehicleStatusText }}</span>
            </div>
            <div class="pr-3 justify-self-end">
                <div>{{ Object.keys(vehicle.balances).length }} <span class="font-medium text-sm text-aftrDarkGrey">Members</span></div>
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
        return {};
    },
    computed: {
        vehicleStatusAlert() {
            if (typeof this.vehicle.status === 'undefined' || this.vehicle.status === 'stopped' || this.vehicle.status === '') {
                return "capitalize px-2 sm:px-4 py-3 inline-flex leading-3 text-sm font-semibold rounded-full bg-red-100 text-red-800";
            } else if (this.vehicle.status === 'started') {
                return "capitalize px-2 sm:px-4 py-3 inline-flex leading-3 text-sm font-semibold rounded-full bg-green-100 text-green-800";
            } else {
                return "capitalize px-2 sm:px-4 py-3 inline-flex leading-3 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800";
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
            const logoUrl = "https://arweave.net/" + this.vehicle.logo;
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
    }
};
</script>