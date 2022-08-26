<template>
    <div v-if="pageStatus === 'in-progress'">
        <vehicle-placeholder></vehicle-placeholder>
    </div>
    <div v-else>
        <vehicle-evolve v-if="showEvolveModal" @close="closeModal" :vehicleId="contractId"></vehicle-evolve>
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
                            <p class="text-sm font-medium font-mono text-aftrYellow">{{ contractId }}</p>
                        </div>
                    </div>
                    <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                        <label v-if="vehicle.evolve && allowEdits && !evolvePressedAlready" class="py-1 pr-2 text-right text-4xl animate-pulse">👉</label>
                        <button v-if="vehicle.evolve && allowEdits && !evolvePressedAlready" @click.prevent="evolveContract" type="submit" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                            </svg>
                            <span class="pl-2">Evolve Contract</span>
                        </button>
                        <label v-if="vehicle.evolve && allowEdits && evolvePressedAlready" class="pr-2 text-aftrRed flex items-center">Active Evolve Vote</label>
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
                                        <a v-for="tab in tabs" :key="tab.name" :href="tab.href" @click="tabClick(tab.name)" :class="tabText(tab)" :aria-current="tab.current ? 'page' : undefined">
                                            {{ tab.name }}
                                        </a>
                                        </nav>
                                    </div>
                                </div>
                                <vehicle-info v-if="activeTab === 'Info'" :vehicle="vehicle" :contractId="contractId" :isMember="allowEdits"></vehicle-info>
                                <vehicle-setting v-else-if="activeTab === 'Settings'" :vehicle="vehicle" :isMember="allowEdits"></vehicle-setting>
                                <vehicle-members v-else-if="activeTab === 'Members'" :vehicle="vehicle" :isMember="allowEdits"></vehicle-members>
                                <vehicle-tokens v-else-if="activeTab === 'Tokens'" :vehicle="vehicle" :isMember="allowEdits"></vehicle-tokens>
                                <!--<vehicle-profits v-else-if="activeTab === 'Profits'"></vehicle-profits>-->
                                <!--<vehicle-leases v-else-if="activeTab === 'Leases'" :leases="vehicles.leases"></vehicle-leases>-->
                                <!--<vehicle-leases v-else-if="activeTab === 'Leases'"></vehicle-leases>-->
                                <!--<vehicle-fractions v-else-if="activeTab === 'Fractions'"></vehicle-fractions>-->
                                <vehicle-votes v-else-if="activeTab === 'Votes'" :vehicle="vehicle" :contractId="contractId" :isMember="allowEdits"></vehicle-votes>
                                <vehicle-state v-else-if="activeTab === 'State'" :vehicle="vehicle"></vehicle-state>
                                <vehicle-activity v-else-if="activeTab === 'Activity'" :arweave="arweave" :interactions="interactions"></vehicle-activity>

                                <vehicle-contract-test v-else-if="activeTab === 'Test Contract' && env === 'DEV'" :vehicle="vehicle"></vehicle-contract-test>
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
//import { readContract } from 'smartweave';
import { executeContract } from "@three-em/js";
import VehicleInfo from './vehicle/VehicleInfo.vue';
import VehicleMembers from './vehicle/VehicleMembers.vue';
import VehicleTokens from './vehicle/VehicleTokens.vue';
//import VehicleProfits from './vehicle/VehicleProfits.vue';
//import VehicleLeases from './vehicle/VehicleLeases.vue';
//import VehicleFractions from './vehicle/VehicleFractions.vue';
import VehicleVotes from './vehicle/VehicleVotes.vue';
import VehicleState from './vehicle/VehicleState.vue';
import VehicleContractTest from './contract-tests/VehicleContractTest.vue';
import VehicleActivity from './vehicle/VehicleActivity.vue';
import VehiclePlaceholder from './vehicle/VehiclePlaceholder.vue';
import VehicleSetting from './vehicle/VehicleSetting.vue';
import VehicleEvolve from "./vehicle/VehicleEvolve.vue";
import { mapGetters } from "vuex";
import { isVehicleMember } from './utils/shared.js';

export default {
    components: { VehicleInfo, VehicleMembers, VehicleTokens, VehicleVotes, VehicleState, VehicleActivity, VehiclePlaceholder,VehicleSetting, VehicleContractTest, VehicleEvolve },
    props: ['vehicleId'],
    data() {
        return {
            tabs: [
                { name: 'Info', href: '#', current: true },
                { name: 'Settings', href: '#', current: false },
                { name: 'Members', href: '#', current: false },
                { name: 'Tokens', href: '#', current: false },
                //{ name: 'Profits', href: '#', current: false },
                //{ name: 'Fractions', href: '#', current: false },
                //{ name: 'Leases', href: '#', current: false },
                { name: 'Votes', href: '#', current: false },
                { name: 'State', href: '#', current: false },
                { name: 'Activity', href: '#', current: false },
                { name: 'Test Contract', href: '#', current: false },
            ],
            arweave: {},
            activeTab: "Info",
            pageStatus: "",
            contractId: this.vehicleId,
            vehicle: {},
            interations: {},
            anyWithdrawals: false,
            concludeVoteNeeded: false,

            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            env: import.meta.env.VITE_ENV,

            showEvolveModal: false,
            evolvePressedAlready: false,
            allowEdits: false,
        };
    },
    computed: {
        vehicleLogo() {
            let logoUrl =""
            if (this.vehicle.logo) {
                if(import.meta.env.VITE_ARWEAVE_PORT){
                    logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/" + this.vehicle.logo}`;
                } else {
                    logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + "/" + this.vehicle.logo}`;
                }
                return logoUrl;
            } else {
                logoUrl = "https://avatars.dicebear.com/api/pixel-art-neutral/:" + this.vehicle.id + ".svg";
                return logoUrl;
            }
        },
        ...mapGetters(["getActiveAddress", "getAftrContractSrcId", "getEvolvedContractSrcId", "currentBlock"]),
    },
    methods: {
        tabText(tab) {
            let cssText = "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ";
            if (tab.current) {
                return cssText + "border-aftrBlue text-aftrBlue";
            } else if (this.anyWithdrawals && tab.name == "Tokens") {
                return cssText + "border-transparent text-aftrRed hover:text-gray-700 hover:border-gray-300";
            } else if (this.concludeVoteNeeded && tab.name == "Votes") {
                return cssText + "border-transparent text-aftrRed hover:text-gray-700 hover:border-gray-300";
            } else {
                return cssText + "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300";
            }
            
        },
        viewVehicles() {
            this.$log.info("Vehicle : viewVehicles :: " ,"View Clicked");
            this.$router.push("../vehicles");
        },
        isVehicleMember(vehicle) {
            const addr = this.getActiveAddress
            let found = false;
            
            // Check balances
            if (vehicle.balances) {
                if (addr in vehicle.balances && vehicle.balances[addr] > 0) {
                    return true;
                }
            }

            // Check vault
            if (vehicle.vault) {
                for (let vaultAddr in vehicle.vault) {
                	if (vaultAddr === addr) {
                        for (let bal of vehicle.vault[vaultAddr]) {
                            if (bal.balance > 0) {
                                found = true; 
                                break;
                            }
                        }
                    }
                }
            }

            return found;
        },
        getEditStatus() {
            // Is user member of this vehicle?
            const isMember = isVehicleMember(this.vehicle, this.getActiveAddress);

            if (isMember) {
                this.allowEdits = true;
            } else {
                this.allowEdits = false;
            }
        },
        evolveContract() {
            this.showEvolveModal = true;
        },
        closeModal() {
            this.showEvolveModal = false;
        },
        tabClick(name) {
            let activeTabIndex = this.tabs.findIndex(tab => tab.current == true);
            this.tabs[activeTabIndex].current = false;
            activeTabIndex = this.tabs.findIndex(tab => tab.name === name);
            this.tabs[activeTabIndex].current = true;
            this.activeTab = this.tabs[activeTabIndex].name;
        },
        async returnContractSrc(arweave, contractId) {
            let tx = await arweave.transactions.get(contractId);
            let contractSrcId = "";

            tx.get('tags').every(tag => {
                let key = tag.get('name', {decode: true, string: true});
                let value = tag.get('value', {decode: true, string: true});
                if (key === "Contract-Src") {
                    contractSrcId = value;
                    return false;
                }
                return true;
            });
            return contractSrcId;
        },
        async loadVehicle() {
            // Add contractId to vehicle object
            this.vehicle.id = this.contractId;

            // Logo, Description, and Evolve
            this.vehicle.settings.forEach(setting => {
                if (setting[0] === 'communityLogo') {
                    this.vehicle.logo = setting[1];
                } else if (setting[0] === "communityDescription") {
                    this.vehicle.desc = setting[1];
                } else if (setting[0] === "evolve") {
                    const evolvedValue = setting[1];
                    if ((this.getAftrContractSrcId !== this.getEvolvedContractSrcId) && (evolvedValue !== this.getEvolvedContractSrcId)) {
                        // Contract needs to be evolved
                        this.vehicle.evolve = true;

                        // Check to see if evolve vote was already proposed
                        const evolveVote = this.vehicle.votes.findIndex( vote => vote.status === "active" && vote.key === "settings.evolve" );
                        if (evolveVote > -1) {
                            this.evolvePressedAlready = true;
                        } else {
                            this.evolvePressedAlready = false;
                        }
                    }
                }
            });

            this.getEditStatus();

            // Tokens
            // Treasury
            let treasuryTotal = 0;
            if (this.vehicle.tokens) {
                for (let token of this.vehicle.tokens) {
                    // Are there any withdrawals waiting to be processed?
                    if (token.withdrawals && token.withdrawals.length > 0) {
                        this.anyWithdrawals = true;
                    }

                    try {
                        const response = await fetch(import.meta.env.VITE_VERTO_CACHE_URL + "token/" + token.tokenId + "/price");
                        const responseObj = await response.json();
                        const pricePerToken = responseObj.price;
                        token.name = responseObj.name;
                        token.total = pricePerToken * token.balance;
                        treasuryTotal += token.total;
                    } catch(error) {
                        this.$log.info("Vehicle : loadVehicle :: ", "ERROR calling Verto cache on " + token.name + ": " + error);
                    }
                }
            } else {
                this.vehicle.tokens = [];
            }
            this.vehicle.treasury = treasuryTotal;

            // Votes
            if (this.vehicle.votes) {
                this.$store.dispatch('loadCurrentBlock');
                let currentBlock = +this.currentBlock.height;
                let activeVotes = this.vehicle.votes.filter( (vote) => vote.status === "active" );
                activeVotes.forEach((vote) => {
                    let start = +vote.start;
                    let voteLength = +vote.voteLength;
                    if (start + voteLength <= currentBlock) {
                        this.concludeVoteNeeded = true;
                    }
                });
            }
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
        this.showEvolveModal = false;

        //let arweave = {};
        try {
            this.arweave = await Arweave.init({
                host: this.arweaveHost,
                port: this.arweavePort,
                protocol: this.arweaveProtocol,
                timeout: 20000,
                logging: true,
            });
        } catch (error) {
            this.$log.error("Vehicle : created :: ", "ERROR connecting to Arweave: " + error);
            this.pageStatus = "error";
            this.$swal({
                logo: "error",
                html: "ERROR to load vehicle. Please click the Launch button again",
            })
            this.$router.push("../overview");
            return false;
        }

        try {
            //this.vehicle = await readContract(arweave, this.contractId);
            //const stateInteractions = await readContract(this.arweave, this.contractId, undefined, true);

            //const { state, validity } = await executeContract(this.contractId, undefined, true, this.gatewayConfig);
            const stateInteractions = await executeContract(this.contractId, undefined, true, {
                ARWEAVE_HOST: import.meta.env.VITE_ARWEAVE_HOST,
                ARWEAVE_PORT: import.meta.env.VITE_ARWEAVE_PORT,
                ARWEAVE_PROTOCOL: import.meta.env.VITE_ARWEAVE_PROTOCOL
            });
            //console.log(JSON.stringify(state));
            // console.log(JSON.stringify(state));
            // console.log(JSON.stringify(validity));

            this.vehicle = stateInteractions.state;
            this.interactions = stateInteractions.validity;
            

            //this.vehicle = stateInteractions.state;
            //this.interactions = stateInteractions.validity;
            //console.log(JSON.stringify(this.interactions));

            
            // Ensure AFTR Vehicle
            const contractSrc = await this.returnContractSrc(this.arweave, this.contractId);
            if (contractSrc !== this.getAftrContractSrcId) {
                throw "Not valid AFTR Vehicle";
            }

            await this.loadVehicle();
        } catch (error) {
            this.$log.info("Vehicle : created :: ", "ERROR calling SmartWeave: " + error);
            this.pageStatus = "error";
            this.$swal({
                logo: "error",
                html: "ERROR to load vehicle. Please click the Launch button again",
            })
            this.$router.push("../overview");
            return false;
        }

        this.pageStatus = "";
    },
};
</script>