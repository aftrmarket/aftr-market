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
                      v-model="vehicle.name"
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
                        v-model="vehicle.desc"
                        rows="3"
                        class="shadow-sm focus:ring-aftrBlue focus:border-aftrBlue mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Describe your fund."
                      ></textarea>
                    </div>
                  </div>
                  <div class="pt-2">
                    <label
                      for="seats"
                      class="block text-sm font-medium text-gray-700"
                      >Number of Seats Available
                    </label>
                    <div class="flex justify-start items-center">
                      <input type="number" v-model="seats" class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      <label class="pl-4 block text-sm text-gray-700">~
                        <span class="text-lg text-aftrBlue">{{ displaySeats }}</span> seats will be created
                      </label>
                    </div> 
                  </div>
                  <div class="pt-2">
                    <label
                      for="seats"
                      class="block text-sm font-medium text-gray-700"
                      >Vehicle Lock Period
                    </label>
                    <div class="flex justify-start items-center">
                      <input type="number" v-model="lockPeriod" @change="lockChange" class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      <label class="pl-4 block text-sm text-gray-700">Months (~<span class="text-lg text-aftrBlue">{{ monthsInBlocks(lockPeriod) }}</span> Blocks)</label>
                    </div> 
                  </div>
                  <div class="pt-2">
                    <label
                      for="seats"
                      class="block text-sm font-medium text-gray-700"
                      >Price per Seat
                    </label>
                    <div class="flex justify-start items-center">
                      <input type="number" v-model="vehicle.seatPrice" class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      <label class="pl-4 block text-sm text-gray-700">AR</label>
                    </div> 
                  </div>
                  <div class="pt-2">
                    <label
                      for="leaseLength"
                      class="block text-sm font-medium text-gray-700"
                      >Lease Length
                    </label>
                    <div class="flex justify-start items-center space-x-4">
                      <input type="number" placeholder="Min" v-model="minLease" class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      <input type="number" placeholder="Max" v-model="maxLease" class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                      <label class="pl-4 block text-sm text-gray-700">
                        Months (~<span class="text-lg text-aftrBlue">{{ monthsInBlocks(minLease) }}</span> to 
                        <span class="text-lg text-aftrBlue">{{ monthsInBlocks(maxLease) }}</span> Blocks)
                      </label>
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
                  <div v-else class="pt-6 flex justify-start items-center">
                    <button @click="arConnect" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aftrBlue hover:bg-aftrBlue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login to ArConnect</button>
                    <label class="pl-4 block text-sm text-gray-700">
                      You must provide a wallet in order to create a vehicle
                    </label>
                  </div>
                <div v-if="arConnected" class="pt-6">
                    <select v-model="selectedPstId" @change="pstChange" id="selectedPstId" name="selectedPstId" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option value="" disabled selected>Select PST</option>
                        <option v-for="pst in psts" :key="pst.id" :value="pst.id">{{ pst.name }} ({{ pst.id }})</option>
                    </select>
                </div>
                
                <div v-if="selectedPstId !== ''">
                  <div class="pt-6 pb-4">
                    <label class="block text-sm font-medium text-gray-700">
                      You have 
                      <span class="font-bold text-aftrBlue">{{ pstBalance }} {{ pstTicker }}</span>
                      <span> available to use in your vehicle.</span>
                    </label>
                  </div>
                  <input type="number" placeholder="Amount" v-model="inputTokens" @input="calcPstPrice" :class="inputTokenBox"/> 
                  <span v-if="inputTokens" class="pl-4 pr-6">@ {{ formatNumber(pricePerToken, true) }} AR {{ inputTokens ? ' = ' + formatNumber(pstValue, true) + ' AR' : '' }}</span>
                  <div class="pt-2">
                      <button v-if="inputValid && inputTokens !== ''" @click.prevent="addPst" type="submit" class="inline-flex justify-center py-2 px-4 border border-gray shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-transparent hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                          <img class="-ml-1 mr-2 h-5 w-5 text-current" src="../assets/add_circle-24px.svg"/>
                          Add PST
                      </button>
                  </div>
                </div>
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
                                              {{ pst.id.substr(0,5) + '...' }}
                                              </div>
                                          </div>
                                        </div>
                                    </td>
                                    <td class="text-right px-6 py-3">
                                        {{ formatNumber(pst.tokens) }}
                                    </td>
                                    <td class="text-right px-6 py-3">
                                        {{ formatNumber(pst.total, true) }}
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
                    <div class="text-right"><span v-if="totalValue" class="px-6 py-3">Total: <span class="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{ formatNumber(totalValue, true) }} AR</span></span></div>
                </div>


                <div class="px-4 py-3 bg-gray-50 sm:px-6 flex items-center justify-between">
                  <button type="submit" @click.prevent="cancelCreate"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="pl-2">Cancel</span>
                  </button>
                  <button type="submit" @click.prevent="createVehicle"
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
      {{ vehicle }}
    </main>
  </div>
</template>

<script>
//import { uuid } from 'vue-uuid';
//import Arweave from 'arweave';
//import NumberInput from '/utils/NumberInput.vue';
import numeral from 'numeral';
import numberAbbreviate from 'number-abbreviate';

export default {
  data() {
    return {
      arConnected: false,       // Is user logged in through ArConnect?
      pstSelected: false,       // Boolean that shows when a PST is selected
      activeWallet: '',         // Active wallet address on ArConnect
      selectedPstId: '',        // ID of selected PST
      inputTokens: null,        // Number of tokens of PST
      lockPeriod: 12,            // Period of time that the vehicle must exist
      seats: 0,                 // Number of seats available on vehicle
      minLease: 2,              // Minimum seat lease length in months
      maxLease: 24,             // Maximum seat lease length in months
      inputValid: false,        // Boolean to show when amount goes over tokens held
      pricePerToken: null,      // Selected PST's price
      pstValue: null,           // pricePerShare * inputShares
      totalValue: null,         // Sum of all PST values in vehicle
      vehiclePsts: [],          // Array of vehicle's PSTs
      vehicle: {},              // Created vehicle object
      psts: []
      /****  TEST object
      psts: [
            { id: '46c0bdd1-56a9-4179-8a56-164b702a5cb8', ticker: 'AFTR', name: 'AFTR Market', price: 0.05 },
            { id: '8f1d6790-b885-4078-af9d-4e431ed74cf6', ticker: 'ARDRIVE', name: 'ArDrive', price: 0.078 },
            { id: 'c9f7418c-2587-433e-a355-03d2c5a5c5b3', ticker: 'ARVERIFY', name: 'ArVerify', price: 0.035 },
            { id: 'f9fde4f9-89ec-404b-8a0a-1bc674b39676', ticker: 'XYZ', name: 'CommunityXYZ', price: 0.098 },
            { id: 'af7997c3-36b3-42ea-b923-38c0e69c8802', ticker: 'KOI', name: 'Koi', price: 0.045 },
            { id: '919ce858-2513-424a-9fdb-de146eee1417', ticker: 'OPENBITS', name: 'OpenBits', price: 0.06 },
            { id: 'e6125855-8414-4ae1-b611-66aff71160a2', ticker: 'VRT', name: 'Verto Exchange', price: 0.1 }
      ]
      ****/
    };
  },
  computed: {
    displaySeats() {
      return numberAbbreviate(this.seats, 2);
    },
    convertToInt(value) {
      return parseInt(value);
    },
    pstBalance() {
      const currentPst = this.psts.find(item => item.id === this.selectedPstId);
      return this.formatNumber(currentPst.balance);
    },
    pstTicker() {
      const currentPst = this.psts.find(item => item.id === this.selectedPstId);
      return currentPst.ticker;
    },
    inputTokenBox() {
      if (this.inputValid){
        return "mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md";
      } else {
        return "mt-1 focus:ring-aftrRed focus:border-aftrRed shadow-sm sm:text-sm border-gray-300 rounded-md";
      }
    }
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
    formatNumber(num, dec = false) {
      if (dec) {
        return numeral(num).format('0,0.0000');
      } else {
        return numeral(num).format('0,0');
      }
    },
    monthsInBlocks(value) {
      // 1 block ~ 2 mins
      if (value) {
        const numBlocks = parseFloat(value) * (43800 / 2);
        return numberAbbreviate(numBlocks, 2);
      } else {
        return '0';
      }
    },
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
        this.psts = await response.json();
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
        for(let pst of this.psts) {
          const response = await fetch('http://v2.cache.verto.exchange/token/' + pst.id + '/price');
          const jsonRes = await response.json();
          const i = this.psts.findIndex(item => item.id === pst.id);
          this.psts[i]['price'] = jsonRes.price;
          this.psts[i]['total'] = jsonRes.price * this.psts[i]['balance'];
        }
      } catch(error) {
        console.log('ERROR while fetching AR prices from Verto: ' + error);
      }
    },
    togglePstFields() {
      this.pstSelected = !this.pstSelected;
    },
    lockChange() {
      if (this.minLease > this.lockPeriod) {
        this.minLease = this.lockPeriod;
      }
      if (this.maxLease < this.lockPeriod) {
        this.maxLease = this.lockPeriod;
      }
    },
    pstChange() {
        this.inputTokens = null;
        this.pricePerToken = null;
    },
    calcPstPrice() {
        const currentPst = this.psts.find(item => item.id === this.selectedPstId);
        this.pricePerToken = currentPst.price;
        this.pstValue = currentPst.price * this.inputTokens;
        this.updateInputValid(currentPst.balance);
    },
    updateInputValid(balance) {
        if (Number(this.inputTokens) <= balance) {
          this.inputValid = true;
        } else {
          this.inputValid = false;
        }
    },
    updateVehicleTotal() {
        this.totalValue = this.vehiclePsts.reduce((acc, item) => acc + item.total, 0);
    },
    addPst() {
        // Create temp object and add new keys
        let currentPst = this.psts.find(item => item.id === this.selectedPstId);
        let existingIndex = this.vehiclePsts.findIndex(item => item.id === this.selectedPstId);
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
        // Subtract tokens from wallet pst
        existingIndex = this.psts.findIndex(item => item.id === this.selectedPstId);
        this.psts[existingIndex]['balance'] -= parseInt(this.inputTokens);
        this.updateInputValid(this.psts[existingIndex]['balance']);
        
        /*** TODO:  SAVE WALLET UPDATES ON CREATE VEHICLE */
        
        // Recalc the price
        this.updateVehicleTotal();
    },
    removePst(id) {
        this.vehiclePsts.splice(this.vehiclePsts.findIndex(item => item.id === id), 1);
        this.updateVehicleTotal(); 
    },
    createVehicle() {
        const id = "10000000000001"; // Temp ID
        this.vehicle['id'] = id;
        this.vehicle.wallet = this.activeWallet;
        this.vehicle.seats = this.seats;
        this.vehicle.lockPeriod = this.lockPeriod;
        this.vehicle.minLease = this.minLease;
        this.vehicle.maxLease = this.maxLease;
        
        const tmpPsts = this.vehiclePsts.map(item => {
          return {
            id: item.id,
            name: item.name,
            ticker: item.ticker,
            logo: item.logo,
            tokens: item.tokens,
          };
        });
        this.vehicle.psts = tmpPsts;
    },
    cancelCreate() {
      this.$router.push('vehicles');
    }
  }
}
</script>