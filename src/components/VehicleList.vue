<template>
    <div>
        <main class="-mt-32">
            <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                <!-- Heading Row -->
                <div class="pb-5 sm:flex sm:items-center sm:justify-between">
                    <select @change="filterChange" v-model="filter" class="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option value="all">All Vehicles</option>
                        <option value="my" selected>My Vehicles</option>
                    </select>
                    <button type="button" @click.prevent="createVehicle()" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path>
                        </svg>
                        <span class="pl-2">Create Vehicle</span>
                    </button>
                </div>
                <!-- List -->
                <perfect-scrollbar>
                <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                    <ul v-if="!isLoading && vehicles.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <li v-for="vehicle in vehicles" :key="vehicle.id" class="col-span-1 bg-white rounded-lg shadow divide-gray-200">
                            <router-link :to="{ name: 'vehicle', params: { vehicleId: vehicle.id } }">
                                <vehicle-card :vehicle="vehicle"></vehicle-card>
                            </router-link>
                        </li>
                    </ul>
                    <ul v-else-if="!isLoading && vehicles.length == 0" class="">
                        No vehicles found...
                    </ul>
                    <ul v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <li v-for="index in 12" :key="index" class="col-span-1 bg-white rounded-lg shadow divide-gray-200">
                            <vehicle-card-placeholder :key="index"></vehicle-card-placeholder>
                        </li>
                    </ul>
                    <div class="text-center">
                        <button v-if="!isLoading && hasNextPage" @click.prevent="load" type="submit" class="mt-4 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Load More</button>
                    </div>
                </div>
                </perfect-scrollbar>
                <!-- <div v-if="!isLoading && noResult" class="">
                    <p>
                        No more data...
                    </p>
                </div> -->
                <!-- /End replace -->
            </div>
        </main>
    </div>
</template>

<script>
//import { readContract } from "smartweave";
import { executeContract } from "@three-em/js";
import VehicleCard from "./vehicle/VehicleCard.vue";
import VehicleCardPlaceholder from "./vehicle/VehicleCardPlaceholder.vue";
import { mapGetters } from "vuex";

export default {
    components: { VehicleCard, VehicleCardPlaceholder, },
    data() {
        return {
            /** Smartweave variables */
            arweave: {},
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            initTags: [
                {
                    name: "Protocol",
                    value: import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL,
                },
            ],
            /** */
            myPsts: [],
            isLoading: true,
            vehicleId: null,
            all_vehicle: "all_vehicle",
            my_vehicle: "my_vehicle",
            getVehicleList: false,
            vehicles: [],
            filter: "my",
            cursor: "",
            noResult: false,
            message: "",
            showResult: true,
            hasNextPage: false,
        };
    },
    // mounted() {
        // this.created()
        // },
    computed: {
        ...mapGetters(["getAftrContractSrcId"]),
    },
    methods: {
        createVehicle() {
            this.$router.push("create");
        },
        viewVehicle(vehicleId) {
            this.$router.push({ name: "vehicle", params: { vehicle: "joe" } });
        },
        async returnContractSrc(contractId) {
            let tx = await this.arweave.transactions.get(contractId);
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
        async filterChange() {
            this.isLoading = true;
            this.cursor = "";
            this.vehicles = [];
            await this.load();
            this.isLoading = false;
        },
        async loadAllVehicles(contractId) {
            try {
                // Added this b/c of the mount call to loadAllVehicles.  Not sure why that was added.
                if (!contractId) {
                    return;
                }

                const { state, validity } = await executeContract(contractId, undefined, true, {
                    ARWEAVE_HOST: import.meta.env.VITE_ARWEAVE_HOST,
                    ARWEAVE_PORT: import.meta.env.VITE_ARWEAVE_PORT,
                    ARWEAVE_PROTOCOL: import.meta.env.VITE_ARWEAVE_PROTOCOL
                });
                let vehicle = state;

                // Check to make sure contract source matches AFTR Contract Source
                let isAftrVehicle = true;
                const contractSrc = await this.returnContractSrc(contractId);
                if (contractSrc !== this.getAftrContractSrcId) {
                    console.log("FAILED CONTRACT SRC: " + contractSrc);
                    
                    //throw "Not valid AFTR Vehicle";
                    this.$log.error("VehicleList : loadAllVehicles :: ", "Invalid AFTR Vehicle found - Contract ID: " + contractId);
                    //isAftrVehicle = false;
                    return;
                }
                
                if (isAftrVehicle) {
                    vehicle.id = contractId;
                    if (!vehicle.tokens) {
                        vehicle.tokens = [];
                    }
                    // Logo and Description
                    vehicle.settings.forEach((setting) => {
                        if (setting[0] === "communityLogo") {
                            vehicle.logo = setting[1];
                        } else if (setting[0] === "communityDescription") {
                            vehicle.desc = setting[1];
                        }
                    });

                    // Treasury
                    let treasuryTotal = 0;
                    /*** TAKING THIS OUT B/C IT FAILS ON TESTNET */
                    // for (let token of vehicle.tokens) {
                    //     try {
                    //         const response = await fetch(import.meta.env.VITE_VERTO_CACHE_URL + "token/" + token.tokenId + "/price");
                    //         const responseObj = await response.json();
                    //         const pricePerToken = responseObj.price;
                    //         const tokenValue = pricePerToken * token.balance;
                    //         treasuryTotal += tokenValue;
                    //     } catch (error) {
                    //         this.$log.error("VehicleList : loadAllVehicles :: ", "ERROR calling Verto cache on " + token.name + ": " + error);
                    //     }
                    // }
                    vehicle.treasury = treasuryTotal;

                    // Tips (AR)
                    /*** HOW CAN THIS BE DETERMINED? */
                    //vehicle.tipsAr = 10000;

                    // Tips (Misc)
                    /*** HOW CAN THIS BE DETERMINED? */
                    //vehicle.tipsMisc = 142545

                    // Votes Opened
                    if (typeof vehicle.votes !== "undefined" && vehicle.votes.length !== 0) {
                        const activeVotes = vehicle.votes.filter((vote) => vote.status === "active");
                        vehicle.totalActiveVotes = activeVotes.length;
                    } else {
                        vehicle.totalActiveVotes = 0;
                    }
                    // if (!this.getMyVehicle) {
                    //     await Object.keys(vehicle.balances).some((walletId) => {
                    //         if (walletId == this.$store.getters.getActiveAddress) {
                    //             if (vehicle.balances[walletId] > 0) {
                    //                 this.selectedMyVehicle.push(vehicle);
                    //             }
                    //         } else {
                    //             Object.keys(vehicle.vault).some((walletId) => {
                    //                 if (walletId == this.$store.getters.getActiveAddress) {
                    //                     if (vehicle.vault[walletId] > 0) {
                    //                         this.selectedMyVehicle.push(vehicle);
                    //                     }
                    //                 }
                    //             });
                    //         }
                    //     });
                    // }
                    
                    // if (this.getMyVehicle) {
                    //     this.selectedVehicle.push(vehicle);
                    // } else {
                    //     this.vehicles.push(vehicle); 
                    // }
                    this.vehicles.push(vehicle);
                }
            } catch (error) {
                this.$log.error("VehicleList : loadAllVehicles :: ", "ERROR calling SmartWeave: " + error);
            }
        },
        async load() {
            // Get the AFTR Contract Source ID for Prod
            if (import.meta.env.VITE_ENV === "PROD") {
                this.$store.commit("setAftrContractSrcId", import.meta.env.VITE_SMARTWEAVE_CONTRACT_SOURCE_ID);
            }

            // Use GraphQL to find all vehicle contracts, then load all vehicles

            let response = {};
            let totalVehicles = 0;
            try {
                this.arweave = await Arweave.init({
                    host: this.arweaveHost,
                    port: this.arweavePort,
                    protocol: this.arweaveProtocol,
                    timeout: 20000,
                    logging: true,
                });
                let query = "";
                if (this.filter === "my") {
                    query = `
                        query($cursor: String) {
                            transactions(
                                tags: [ 
                                    { name: "Protocol", values: ["${ import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL }"] },
                                    { name: "Contract-Src", values: ["${ this.getAftrContractSrcId }"] }
                                ]
                                ids: ${ JSON.stringify(this.myPsts) }
                                first: 9
                                after: $cursor
                            ) {
                                pageInfo {
                                    hasNextPage
                                }
                                edges {
                                    cursor
                                    node { id } 
                                }
                            }
                        }`;
                } else {
                    query = `
                        query($cursor: String) {
                            transactions(
                                tags: [ 
                                    { name: "Protocol", values: ["${ import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL }"] },
                                    { name: "Contract-Src", values: ["${ this.getAftrContractSrcId }"] }
                                ]
                                first: 9
                                after: $cursor
                            ) {
                                pageInfo {
                                    hasNextPage
                                }
                                edges {
                                    cursor
                                    node { id } 
                                }
                            }
                        }`;
                }

                response = await this.arweave.api.post("graphql", {
                    query: query,
                    variables: { "cursor": this.cursor }
                });

                if (response.status !== 200) {
                    throw response.status + " - " + response.statusText;
                }

                totalVehicles = response.data.data.transactions.edges.length;
            } catch (error) {
                this.$log.error("VehicleList : created :: ", "ERROR while fetching from gateway: " + error);
            }
            //this.isLoading = false;
            if(response.data.data.transactions.pageInfo.hasNextPage) {
                this.hasNextPage = true;
                const [lastNumber] = response.data.data.transactions.edges.slice(-1);
                this.cursor = lastNumber.cursor;
            } else {
                this.hasNextPage = false;
            }

            for (let edge of response.data.data.transactions.edges) {
                await this.loadAllVehicles(edge.node.id);
            }
            // else {
            //     this.hasNextPage = false;
            //     if(this.showResult){
            //         this.showResult = false;
            //         //this.vehicles = [];
            //         for (let edge of response.data.data.transactions.edges) {
            //             await this.loadAllVehicles(edge.node.id);
            //         }
            //         //this.isLoading = false;
            //     }
                
            //     this.cursor = ""
            //     this.noResult = true;
            //     // this.message = "No result found";
            //     this.isLoading = false;
                
            //     return;
            // }

            // Load each Vehicle
            
            // if(!this.noResult && this.showResult){
            //     //this.vehicles = [];
            //     for (let edge of response.data.data.transactions.edges) {
            //         await this.loadAllVehicles(edge.node.id);
            //     }
            // }
    

            // for (let index = 1; index < 12; index++) {
            //     /*** FOR NOW JUST LOAD A FAKE SCREEN OF VEHICLES */
            //     this.vehicles.push(this.vehicles[0]);
            // }
        },
        getUserPsts() {
            // Loads all of user's PSTs to be used as a filter on the My Vehicles query
            for (const pst of this.$store.getters.getActiveWallet.psts) {
                this.myPsts.push(pst.id);
            }
        },
    },
    async created() {        
        this.isLoading = true;
        this.getUserPsts();
        await this.load();
        this.isLoading = false;
    },
    
};
</script>

<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>
<style scoped>
    .ps {
        height: 750px;
    }   
</style>