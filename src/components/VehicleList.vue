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
          <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="vehicle in vehicles" :key="vehicle.id" class="col-span-1 bg-white rounded-lg shadow  divide-gray-200">
              <router-link :to="{ name: 'vehicle-info', params: { vehicleId: vehicle.id } }">
                <div class="w-full flex items-center justify-between p-6 space-x-6">
                  <img class="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=5Rgz8QuoBn&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
                  <div class="flex-1 truncate">
                    <div class="flex items-center space-x-3">
                      <h3 class="text-gray-900 text-2xl font-normal truncate">{{ vehicle.name }}</h3>
                      <span class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ vehicle.rating }}</span>
                    </div>
                    <p class="mt-1 text-gray-500 text-sm truncate"><span class="text-base text-aftrDarkGrey font-bold">{{ vehicle.leasedSeats }}</span> Leased Seats</p>
                  </div>
                </div>
                <div>
                  <p class="pl-2 t-1 text-gray-500 text-sm truncate">Performance</p>
                  <div class="pl-3 grid grid-cols-3 gap=2 place-content-center text-base font-bold">
                    <div>1M: <span class="font-medium text-red-500">{{ vehicle.perf1m }}</span></div>
                    <div>3M: <span class="font-medium text-green-500">{{ vehicle.perf3m }}</span></div>
                    <div>Max: <span class="font-medium text-green-500">{{ vehicle.perfMax }}</span></div>
                  </div>
                </div>
                <div>
                  <div class="-mt-px flex divide-gray-200 pt-6 pb-3">
                    <div class="w-0 flex-1 flex items-center pl-3">
                      <div>{{ vehicle.psts.length }} <span class="font-medium text-sm text-aftrDarkGrey">PSTs</span></div>
                    </div>
                    <div class="-ml-px w-0 flex-1 flex justify-end pr-3">
                      <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                        </svg>
                        <span class="pl-2">LEASE</span>
                      </button>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>

        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vehicles: [
        {
          id: '6adfd3a1-cb33-4970-8e88-c2d0defa66ec',
          name: 'Investment Bus',
          desc: '',
          profile: '',
          leasedSeats: 143,
          perf1m: -2.43,
          perf3m: 20.40,
          perfMax: 140.29,
          rating: 'A+',
          psts: [
            {
                "id": "46c0bdd1-56a9-4179-8a56-164b702a5cb8",
                "ticker": "AFTR",
                "name": "AFTR Market",
                "price": 0.05,
                "tokens": 1000,
                "total": 50
            },
            {
                "id": "f9fde4f9-89ec-404b-8a0a-1bc674b39676",
                "ticker": "XYZ",
                "name": "CommunityXYZ",
                "price": 0.098,
                "tokens": 2000,
                "total": 196
            },
            {
                "id": "e6125855-8414-4ae1-b611-66aff71160a2",
                "ticker": "VRT",
                "name": "Verto Exchange",
                "price": 0.1,
                "tokens": 2500,
                "total": 250
            }
          ]
        }
      ]
    }
  },
  methods: {
    createVehicle() {
      this.$router.push('create');
    },
    viewVehicle(vehicleId) {
      this.$router.push({ name: 'vehicle-info', params: { vehicle: 'joe' } });
    }
  },
  created() {
    for (let index = 1; index < 12; index++) {
      this.vehicles.push(this.vehicles[0]);
    }
  }
}
</script>