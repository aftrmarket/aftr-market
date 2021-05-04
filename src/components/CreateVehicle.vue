<template>
  <div>
    <main class="-mt-32">
      <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="px-4 sm:px-0">
              <h3 class="text-xl font-medium leading-6 text-white">
                Create Your Vehicle
              </h3>
              <p class="mt-1 pb-4 text-sm text-aftrYellow">
                You can edit this information later.
              </p>
            </div>
            <form action="#" method="POST">
              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="bg-white sm:p-6">
                  <div class="pt-2">
                    <label
                      for="vehicleName"
                      class="block text-sm font-medium text-gray-700"
                      >Vehicle Name
                    </label>
                    <input
                      type="text"
                      name="vehicleName"
                      id="vehicleName"
                      class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      for="vehicleDesc"
                      class="pt-2 block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div class="mt-1">
                      <textarea
                        id="vehicleDesc"
                        name="vehicleDesc"
                        rows="3"
                        class="shadow-sm focus:ring-aftrBlue focus:border-aftrBlue mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Describe your fund."
                      ></textarea>
                    </div>
                  </div>
                  <div v-if="arConnected" class="pt-6">
                    <label class="block text-sm font-medium text-gray-700">
                      Owner:
                      <span class="font-bold text-aftrRed"
                        >{{ activeWallet }}</span
                      >
                    </label>
                  </div>
                  <div v-else class="pt-6">
                    <button @click="arConnect" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aftrBlue hover:bg-aftrBlue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign-in to ArConnect</button>
                  </div>
<!--
                <div class="pt-6">
                    <select v-model="selectedPst" @change="pstChange" id="selectedPst" name="selectedPst" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option value="" disabled selected>Select PST</option>
                        <option v-for="pst in psts" :key="pst.id" :value="pst.id">{{ pst.name }} ({{ pst.id }})</option>
                    </select>
                </div>
                
                <div v-if="selectedPst !== ''">
                    <input type="number" placeholder="Amount" v-model="inputTokens" @input="calcPstPrice" class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md"/> 
                    <span class="pl-4 pr-6">@ {{ pricePerToken }} AR {{ inputTokens ? ' = ' + pstValue + ' AR' : '' }}</span>
                    <div class="pt-2">
                        <button v-if="inputTokens !== null" @click.prevent="addPst" type="submit" class="inline-flex justify-center py-2 px-4 border border-gray shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-transparent hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                            <img class="-ml-1 mr-2 h-5 w-5 text-current" src="../assets/add_circle-24px.svg"/>
                            Add PST
                        </button>
                    </div>
                </div>
-->
                <!-- Table of PSTs -->
                <div v-if="vehiclePsts.length > 0" class="pt-1">
                    <div class="pt-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Profit Sharing Token
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tokens
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Value (AR)
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="pst in vehiclePsts" :key="pst.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                          <div class="flex-shrink-0 h-10 w-10">
                                              <img class="h-10 w-10 rounded-full" :src="`https://arweave.net/` + pst.logo" alt="">
                                          </div>
                                          <div class="ml-4">
                                              <div class="text-sm font-medium text-gray-900">
                                              {{ pst.name + ' (' + pst.ticker + ')'}}
                                              </div>
                                              <div class="text-sm text-gray-500">
                                              {{ pst.id.substr(1,5) + '...' }}
                                              </div>
                                          </div>
                                        </div>
                                    </td>
                                    <td class="text-right px-6 py-3">
                                        {{ pst.balance }}
                                    </td>
                                    <td class="text-right px-6 py-3">
                                        {{ pst.total }}
                                    </td>
                                    <td class="text-center px-6 py-3">
                                        <button @click.prevent="removePst(pst.id)" type="submit" class="inline-flex items-center p-1 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed">
                                            <img src="../assets/delete-24px.svg"/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            </table>

                        </div>
                        </div>
                    </div>
                </div>
                </div> <!-- End of PST Table -->

                <div class="pl-6 pb-4 text-right">
                    <div class="text-right"><span v-if="totalValue" class="px-6 py-3">Total: <span class="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{ totalValue }} AR</span></span></div>
                </div>


                <div class="px-4 py-3 bg-gray-50 sm:px-6 flex items-center justify-between">
                  <button type="submit" @click.prevent="cancelCreate"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="pl-2">Cancel</span>
                  </button>
                  <button type="submit"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path>
                    </svg>
                      <span class="pl-2">Create Vehicle</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
//import { uuid } from 'vue-uuid';
import Arweave from 'arweave';

export default {
  data() {
    return {
      arConnected: false,       // Is user logged in through ArConnect?
      pstSelected: false,
      activeWallet: '',         // Active wallet address on ArConnect
      selectedPst: '',          // ID of selected PST
      inputTokens: null,        // Number of tokens of PST
      pricePerToken: null,      // Selected PST's price
      pstValue: null,           // pricePerShare * inputShares
      totalValue: null,         // Sum of all PST values in vehicle
      vehiclePsts: [],          // Array of vehicle's PSTs
      checkedPsts: [],
      psts: [
            { id: '46c0bdd1-56a9-4179-8a56-164b702a5cb8', ticker: 'AFTR', name: 'AFTR Market', price: 0.05 },
            { id: '8f1d6790-b885-4078-af9d-4e431ed74cf6', ticker: 'ARDRIVE', name: 'ArDrive', price: 0.078 },
            { id: 'c9f7418c-2587-433e-a355-03d2c5a5c5b3', ticker: 'ARVERIFY', name: 'ArVerify', price: 0.035 },
            { id: 'f9fde4f9-89ec-404b-8a0a-1bc674b39676', ticker: 'XYZ', name: 'CommunityXYZ', price: 0.098 },
            { id: 'af7997c3-36b3-42ea-b923-38c0e69c8802', ticker: 'KOI', name: 'Koi', price: 0.045 },
            { id: '919ce858-2513-424a-9fdb-de146eee1417', ticker: 'OPENBITS', name: 'OpenBits', price: 0.06 },
            { id: 'e6125855-8414-4ae1-b611-66aff71160a2', ticker: 'VRT', name: 'Verto Exchange', price: 0.1 }
      ]
    };
  },
  computed: {
      // Code to handle a checkbox in the table to check/uncheck all rows. 
      /******
      selectAll: {
          get(){
              return this.vehiclePsts ? this.checkedPsts.length == this.vehiclePsts.length : false;
          },
          set(value) {
              let selected = [];

              if (value) {
                  this.vehiclePsts.forEach(vehiclePst => selected.push(vehiclePst.id));
              }
              this.checkedPsts = selected;
          }
      }
      ******/
  },
  methods: {
    async arConnect() {
      try {
        const promiseResult = await window.arweaveWallet.connect(
          ['ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES', 'SIGN_TRANSACTION']
        );
        this.activeWallet = await window.arweaveWallet.getActiveAddress();
        this.arConnected = true;
      } catch (error) {
        console.log('ERROR during ArConnection: ' + error);
      }

      try {
        // Now query Verto to get all PSTs contained in Wallet
        const response = await fetch('http://v2.cache.verto.exchange/balance/' + this.activeWallet);
        this.vehiclePsts = await response.json();
        /**** RESPONSE RETURNS AS AN ARRAY OF KEY/VALUE PAIRS ****
         * [ {
         *  id: '',
         *  balance: '',
         *  name: '',
         *  ticker: '',
         *  logo: ''
         * } ]
        ****/
      } catch (error) {
        console.log('ERROR while fetching Verto balances: ' + error);
      }

      try {
        // Query Verto to get AR prices for each token
        for(let pst of this.vehiclePsts) {
          const response = await fetch('http://v2.cache.verto.exchange/token/' + pst.id + '/price');
          const jsonRes = await response.json();
          const i = this.vehiclePsts.findIndex(item => item.id === pst.id);
          this.vehiclePsts[i]['total'] = jsonRes.price * this.vehiclePsts[i]['balance'];
        }
      } catch(error) {
        console.log('ERROR while fetching AR prices from Verto: ' + error);
      }
    },
    togglePstFields() {
      this.pstSelected = !this.pstSelected;
    },
    pstChange() {
        this.inputTokens = null;
    },
    calcPstPrice() {
        const currentPst = this.psts.find(item => item.id === this.selectedPst);
        this.pricePerToken = currentPst.price;
        this.pstValue = currentPst.price * this.inputTokens;
    },
    updateVehicleTotal() {
        this.totalValue = this.vehiclePsts.reduce((acc, item) => acc + item.total, 0);
    },
    addPst() {
        // Create temp object and add new keys
        let currentPst = this.psts.find(item => item.id === this.selectedPst);
        const existingIndex = this.vehiclePsts.findIndex(item => item.id === this.selectedPst);
        if (existingIndex === -1) {
            // Add new PST to vehicle
            currentPst['tokens'] = parseInt(this.inputTokens);
            currentPst.total = this.pstValue;
            this.vehiclePsts.push(currentPst);
        } else {
            // Updated existing PST in vehicle
            this.vehiclePsts[existingIndex]['tokens'] += parseInt(this.inputTokens);
            this.vehiclePsts[existingIndex]['total'] += this.pstValue;
        }        
        // Recalc the price
        this.updateVehicleTotal();
        console.log(this.vehiclePsts);
    },
    removePst(id) {
        this.vehiclePsts.splice(this.vehiclePsts.findIndex(item => item.id === id), 1);
        this.updateVehicleTotal(); 
    },
    cancelCreate() {
      this.$router.push('vehicles');
    }
  }
}
</script>