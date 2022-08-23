<template>
 <!-- <main class="-mt-32"> -->
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Name 
                    <button type="button" @click.prevent="sortVehicle" >
                      <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ownership</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Assets</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Members</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Active Votes</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Member?</th>
                </tr>
              </thead>
             <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="vehicle in vehicles" :key="vehicle.id">
                   <router-link :to="{ name: 'vehicle', params: { vehicleId: vehicle.id } }">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img class="w-10 h-10 bg-gray-300 rounded-full" :src="vehicleLogo(vehicle)" alt="">
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">{{ vehicle.name }}</div>
                      </div>
                    </div>
                  </td>
                   </router-link>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="text-gray-900">{{vehicle.desc }}</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span v-if="vehicle.ownership == 'single'" class="inline-flex rounded-full px-2 text-xs font-semibold leading-5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <span v-if="vehicle.ownership == 'dao'" class="inline-flex rounded-full px-2 text-xs font-semibold leading-5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ vehicle.tokens.length  }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ Object.keys(vehicle.balances).length }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ vehicle.votes.length }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span v-if="getActiveAddress in vehicle.balances">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
 <!-- </main> -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ['vehicles'],
  data() {
     return {
        logoUrl: "",
        allowEdits: false,
        sortDirection:"ASC",
     }
  },
 computed: {
        
        ...mapGetters(["getActiveAddress"]),
  },
  methods: {
    vehicleLogo(vehicle) {
          console.log("vehicleLogo", vehicle.id)
            let logoUrl = "";
            if (!vehicle.logo || vehicle.logo === '') {
                logoUrl = "https://avatars.dicebear.com/api/pixel-art-neutral/:" + vehicle.id + ".svg";
            } else {
                // logoUrl = "https://arweave.net/" + this.vehicle.logo;
                if(import.meta.env.VITE_ARWEAVE_PORT){
                    logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/" + vehicle.logo}`;
                } else {
                    logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + "/" + vehicle.logo}`;
                }
            }
            
            return logoUrl;
        },
    sortVehicle() {
        this.vehicles.sort( function( a, b ){
        if( this.sortDirection == 'ASC' ){
          return ( ( a.name == b.name ) ? 0 : ( ( a.name.toLowerCase() > b.name.toLowerCase() ) ? 1 : -1 ) );
        }

        if( this.sortDirection == 'DESC' ){
          return ( ( a.name == b.name ) ? 0 : ( ( a.name.toLowerCase() < b.name.toLowerCase() ) ? 1 : -1 ) );
        }
      }.bind(this));

      this.sortDirection == 'ASC' ?  this.sortDirection = 'DESC' : this.sortDirection = 'ASC'
    }
  }
}
</script>