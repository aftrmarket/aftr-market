<template>
    <div>
        <main class="-mt-32">
            <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                <!-- Page header -->
                <div class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                    <div class="flex items-center space-x-5">
                        <div class="flex-shrink-0">
                            <div class="relative">
                                <img class="h-16 w-16 rounded-full" :src="vehicleLogo" alt="">
                                <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
                            </div>
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold text-white">{{ vehicle.name }}</h1>
                            <p class="text-sm font-medium text-aftrYellow">{{ contractId }}</p>
                        </div>
                    </div>
                    <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                        <button @click.prevent="viewVehicles" type="submit" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                            </svg>
                            <span class="pl-2">Vehicle List</span>
                        </button>
                    </div>
                </div>

                <div v-if="pageStatus !== 'error'" class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div class="space-y-6 lg:col-start-1 lg:col-span-3">
                        <!-- Tabs -->
                        <section class="lg:col-start-3 lg:col-span-1">
                            <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                <div class="sm:hidden">
                                    <label for="tabs" class="sr-only">Select a tab</label>
                                    <select id="tabs" name="tabs" class="block w-full focus:ring-aftrBlue focus:border-aftrBlue border-gray-300 rounded-md">
                                        <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
                                    </select>
                                    </div>
                                    <div class="hidden sm:block">
                                    <div class="border-b border-gray-200">
                                        <nav class="-mb-px flex" aria-label="Tabs">
                                        <a v-for="tab in tabs" :key="tab.name" :href="tab.href" @click="tabClick(tab.name)" :class="[tab.current ? 'border-aftrBlue text-aftrBlue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm']" :aria-current="tab.current ? 'page' : undefined">
                                            {{ tab.name }}
                                        </a>
                                        </nav>
                                    </div>
                                </div>
                                <vehicle-info v-if="activeTab === 'Info'" :vehicle="vehicle" :contractId="contractId"></vehicle-info>
                                <vehicle-members v-else-if="activeTab === 'Members'" :vehicle="vehicle"></vehicle-members>
                                <vehicle-tokens v-else-if="activeTab === 'Tokens'" :vehicle="vehicle"></vehicle-tokens>
                                <vehicle-profits v-else-if="activeTab === 'Profits'"></vehicle-profits>
                                <!--<vehicle-leases v-else-if="activeTab === 'Leases'" :leases="vehicles.leases"></vehicle-leases>-->
                                <vehicle-leases v-else-if="activeTab === 'Leases'"></vehicle-leases>
                                <vehicle-votes v-else-if="activeTab === 'Votes'" :vehicle="vehicle"></vehicle-votes>
                                <vehicle-activity v-else-if="activeTab === 'Activity'"></vehicle-activity>

                            </div>
                        </section>
                        <!-- Tabs End -->
                    </div>
                </div>
            </div>
        </main>
    </div>

</template>

<script>
import { readContract } from 'smartweave';
import VehicleInfo from './vehicle/VehicleInfo.vue';
import VehicleMembers from './vehicle/VehicleMembers.vue';
import VehicleTokens from './vehicle/VehicleTokens.vue';
import VehicleProfits from './vehicle/VehicleProfits.vue';
import VehicleLeases from './vehicle/VehicleLeases.vue';
import VehicleVotes from './vehicle/VehicleVotes.vue';
import VehicleActivity from './vehicle/VehicleActivity.vue';

export default {
    components: { VehicleInfo, VehicleMembers, VehicleTokens, VehicleProfits, VehicleLeases, VehicleVotes, VehicleActivity },
    props: ['vehicleId'],
    data() {
        return {
            tabs: [
                { name: 'Info', href: '#', current: true },
                { name: 'Members', href: '#', current: false },
                { name: 'Tokens', href: '#', current: false },
                { name: 'Profits', href: '#', current: false },
                { name: 'Leases', href: '#', current: false },
                { name: 'Votes', href: '#', current: false },
                { name: 'Activity', href: '#', current: false },
            ],
            activeTab: "Info",
            pageStatus: "",
            contractId: this.vehicleId,
            vehicle: {},
        };
    },
    computed: {
        vehicleLogo() {
            if (this.vehicle.logo) {
                return "https://arweave.net/" + this.vehicle.logo;
            } else {
                return "/src/assets/logo-placeholder.png";
            }
        }
    },
    methods: {
        viewVehicles() {
            console.log("View Clicked");
            this.$router.push("../vehicles");
        },
        tabClick(name) {
            let activeTabIndex = this.tabs.findIndex(tab => tab.current == true);
            this.tabs[activeTabIndex].current = false;
            activeTabIndex = this.tabs.findIndex(tab => tab.name === name);
            this.tabs[activeTabIndex].current = true;
            this.activeTab = this.tabs[activeTabIndex].name;
        },
        async loadVehicle() {
            // Logo
            this.vehicle.settings.forEach(setting => {
                if (setting[0] === 'communityLogo') {
                    this.vehicle.logo = setting[1];

                    /*** For DEMO Purposes ONLY */
                    /*** Fixing Chillin's logo */
                    if (this.vehicleId === "PFGb4J3IyeYFcNwtuHs94SDruqQOJ_6R3FywE0-PJkY") {
                        this.vehicle.logo = "aM7YfRnd97mTGLn_3vjLfWp2TgtBKRyDsBnlDhA1e-s";
                    }
                    /*** */
                }
            });
            // Tokens
            // Treasury
            let treasuryTotal = 0;

            for (let token of this.vehicle.tokens) {
                try {
                    const response = await fetch("http://v2.cache.verto.exchange/token/" + token.id + "/price");
                    const responseObj = await response.json();
                    const pricePerToken = responseObj.price;
                    token.name = responseObj.name;
                    token.total = pricePerToken * token.balance;
                    treasuryTotal += token.total;
                } catch(error) {
                    console.log("ERROR calling Verto cache: " + error);
                    return false;
                }
            }
            this.vehicle.treasury = treasuryTotal;
        },
    },
    beforeRouteEnter(to, from, next) {
        // Check to make sure valid Vehicle ID
        if (to.params["vehicleId"] !== "") {
            next();
        } else {
            this.pageStatus = "error";
            next("vehicles");
        }
    },
    async created() {
        this.pageStatus = "in-progress";

        let arweave = {};
        try {
            arweave = await Arweave.init({
                host: "arweave.net",
                port: 443,
                protocol: "https",
                timeout: 20000,
                logging: true,
            });
        } catch (error) {
            console.log("ERROR connecting to Arweave: " + error);
            this.pageStatus = "error";
            return false;
        }

        try {
            this.vehicle = await readContract(arweave, this.contractId);
            await this.loadVehicle();
        } catch (error) {
            console.log("ERROR calling SmartWeave: " + error);
            this.pageStatus = "error";
            return false;
        }

        this.pageStatus = "";
    },
};
</script>