<template>
  <div>

    <main class="-mt-32">
      <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <!-- Heading Row -->
        <div class="pb-5 sm:flex sm:items-center sm:justify-between">
            <select name="selectedVehicle" class="text-blue">
                <option value="" disabled selected>Select Vehicles</option>
                <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">{{ vehicle.name }}</option>
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
        <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <ul v-if="!isLoading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="vehicle in vehicles" :key="vehicle.id" class="col-span-1 bg-white rounded-lg shadow divide-gray-200">
                <router-link :to="{ name: 'vehicle', params: { vehicleId: vehicle.id } }">
                    <vehicle-card :vehicle="vehicle"></vehicle-card>
                </router-link>
            </li>
          </ul>
          <ul v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="index in 12" :key=index class="col-span-1 bg-white rounded-lg shadow divide-gray-200">
                <vehicle-card-placeholder :key="index"></vehicle-card-placeholder>
            </li>
          </ul>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script>
import { readContract } from 'smartweave';
import VehicleCard from './vehicle/VehicleCard.vue';
import VehicleCardPlaceholder from './vehicle/VehicleCardPlaceholder.vue';
import { run, all } from 'ar-gql';

export default {
  components: { VehicleCard, VehicleCardPlaceholder },
  data() {
    return {
        /** Smartweave variables */
        arweave: {},
        contractSourceId: import.meta.env.VITE_SMARTWEAVE_CONTRACT_SOURCE_ID,
        arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
        arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
        arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
        initTags: [ { name: "Protocol", value: import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL } ],
        /** */

        isLoading: true,
        query: `
            query($cursor: String) {
                transactions(
                    tags: [ { name: "Protocol", values: ["${import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL}"] } ]
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
        }`,
        vehicles: [],
    //     vehicles: [
    //     {
    //         id: '6adfd3a1-cb33-4970-8e88-c2d0defa66ec',
    //         name: 'Investment Bus',
    //         ticker: 'IBUS',
    //         status: 'stopped',
    //         desc: '',
    //         logo: '',
    //         creator: 'Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I',
    //         ownership: 'single',
    //         leasedSeats: 143,
    //         perf1m: -2.43,
    //         perf3m: 20.40,
    //         perfMax: 140.29,
    //         tips: 'A+',
    //         balances: {
    //                 "abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8": 12300,
    //                 "Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I": 1000
    //         },
    //         tokens: [
    //             {
    //                 "tokenId": "46c0bdd1-56a9-4179-8a56-164b702a5cb8",
    //                 "source": "abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8",
    //                 "txId": "tx154545454",
    //                 "balance": 2500,
    //                 "depositBlock": 123,
    //                 "lockLength": 5
    //             },
    //             {
    //                 "tokenId": "VRT",
    //                 "source": "joe7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8",
    //                 "txId" : "tx2fasdfoijeo8547",
    //                 "balance": 1000,
    //                 "depositBlock": 123,
    //                 "lockLength": 10
    //             },
    //             {
    //                 "tokenId": "XYZ",
    //                 "source": "joe7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8",
    //                 "txId" : "tx3fasdfoijeo8547",
    //                 "balance": 3400,
    //                 "depositBlock": 123,
    //                 "lockLength": 5
    //             }
    //         ]
    //     }
    //   ]
    }
  },
  methods: {
    createVehicle() {
      this.$router.push('create');
    },
    viewVehicle(vehicleId) {
      this.$router.push({ name: 'vehicle', params: { vehicle: 'joe' } });
    },
    async loadAllVehicles(contractId) {
        console.log("Contract: " + contractId);
        try {
            let vehicle = await readContract(this.arweave, contractId);
            vehicle.id = contractId;
            if (!vehicle.tokens) {
                vehicle.tokens = [];
            }
            // Logo
            vehicle.settings.forEach(setting => {
                if (setting[0] === 'communityLogo') {
                    vehicle.logo = setting[1];

                    /*** For DEMO Purposes ONLY */
                    /*** Fixing Chillin's logo */
                    if (vehicle.id === "PFGb4J3IyeYFcNwtuHs94SDruqQOJ_6R3FywE0-PJkY") {
                        vehicle.logo = "aM7YfRnd97mTGLn_3vjLfWp2TgtBKRyDsBnlDhA1e-s";
                    }
                    /*** */
                }
            });

            // Treasury
            let treasuryTotal = 0;

            for (let token of vehicle.tokens) {
                try {
                    const response = await fetch("http://v2.cache.verto.exchange/token/" + token.id + "/price");
                    const responseObj = await response.json();
                    const pricePerToken = responseObj.price;
                    const tokenValue = pricePerToken * token.balance;
                    treasuryTotal += tokenValue;
                } catch(error) {
                    console.log("ERROR calling Verto cache: " + error);
                    return false;
                }
            }
            vehicle.treasury = treasuryTotal;

            // Tips (AR)
            /*** HOW CAN THIS BE DETERMINED? */
            //vehicle.tipsAr = 10000;

            // Tips (Misc)
            /*** HOW CAN THIS BE DETERMINED? */
            //vehicle.tipsMisc = 142545

            // Votes Opened
            vehicle.votes = 0;


            this.vehicles.push(vehicle);
        } catch (error) {
            console.log("ERROR calling SmartWeave: " + error);
            return false;
        }
    }
  },
  async created() {
    this.isLoading = true;
    
    // Use GraphQL to find all vehicle contracts, then load all vehicles
    try {
        this.arweave = await Arweave.init({
            host: this.arweaveHost,
            port: this.arweavePort,
            protocol: this.arweaveProtocol,
            timeout: 20000,
            logging: true,
        });

        const response = await this.arweave.api.post('graphql', { query: this.query });

        if (response.status !== 200) {
            throw response.status + " - " + response.statusText;
        }

        const totalVehicles = response.data.data.transactions.edges.length;

        for(let edge of response.data.data.transactions.edges) {
            await this.loadAllVehicles(edge.node.id);
        }

    } catch (error) {
        console.log("ERROR while fetching from gateway: " + error);
    }

    //const txs = await run(this.query);
    //const totalVehicles = txs.data.transactions.edges.length;

    // for(let edge of txs.data.transactions.edges) {
    //     await this.loadAllVehicles(edge.node.id);
    // }

    this.isLoading = false;

    // for (let index = 1; index < 12; index++) {
    //     /*** FOR NOW JUST LOAD A FAKE SCREEN OF VEHICLES */
    //     this.vehicles.push(this.vehicles[0]);
    // }
  }
}
</script>