<template>
    <div>
        <main class="-mt-32">
            <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                <!-- Page header -->
                <div class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                    <div class="flex items-center space-x-5">
                        <div class="flex-shrink-0">
                            <div class="relative">
                                <img class="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="">
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
                                        <a v-for="tab in tabs" :key="tab.name" :href="tab.href" :class="[tab.current ? 'border-aftrBlue text-aftrBlue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm']" :aria-current="tab.current ? 'page' : undefined">
                                            {{ tab.name }}
                                        </a>
                                        </nav>
                                    </div>
                                </div>
                                <vehicle-info :vehicle="vehicle" :contractId="contractId"></vehicle-info>
                            </div>
                        </section>
                        <!-- Tabs End -->
                        
                        <!-- Description list-->
                        <section aria-labelledby="applicant-information-title">
                            <div class="bg-white shadow sm:rounded-lg">
                                <div class="flex items-center justify-between">
                                    <div class="px-4 py-5 sm:px-6">
                                        <h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">
                                            {{ vehicles.name }}
                                        </h2>
                                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                                            <span class="text-lg text-black">{{ vehicles[0].leasedSeats }}</span> Leased Seats
                                        </p>
                                    </div>
                                    <div class="pr-6">
                                        <p class="text-gray-900">Current Value: <span class="px-2 py-3 sm:px-6 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">29,308,420.3323 AR</span></p>
                                    </div>
                                </div>
                                <div class="px-4 sm:px-6 max-w-2xl text-sm text-gray-500">Performance</div>
                                <div class="flex items-center justify-between pb-4">
                                    <div class="px-4 sm:px-6 text-semibold">1M: <span :class="vehicles[0].perf1m < 0 ? 'text-aftrRed' : 'text-green-600'">{{ vehicles[0].perf1m }}</span></div>
                                    <div class="px-4 sm:px-6 text-semibold">3M: <span :class="vehicles[0].perf3m < 0 ? 'text-aftrRed' : 'text-green-600'">{{ vehicles[0].perf3m }}</span></div>
                                    <div class="px-4 sm:px-6 text-semibold">Max: <span :class="vehicles[0].perfMax < 0 ? 'text-aftrRed' : 'text-green-600'">{{ vehicles[0].perfMax }}</span></div>
                                </div>
                                <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                                    <!-- PST Table -->
                                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Lessee
                                                    </th>
                                                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Lease Date
                                                    </th>
                                                    <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Seats
                                                    </th>
                                                    <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        PSTs Earned
                                                    </th>
                                                    <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Earnings (AR)
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                <tr v-for="lessee in vehicles[0].lessees" :key="lessee.id" class="text-xs text-gray-500 hover:bg-gray-50">
                                                    <td class="text-left px-4 py-2">
                                                        {{ lessee.id.substr(1,5) + '...' }}
                                                    </td>
                                                    <td class="text-left px-4 py-2">
                                                        {{ lessee.leasedDate }}
                                                    </td>
                                                    <td class="text-right px-4 py-2">
                                                        {{ lessee.seats }}
                                                    </td>
                                                    <td class="text-right px-4 py-2">
                                                        {{ lessee.pstsEarned }}
                                                    </td>
                                                    <td class="text-right px-4 py-2">
                                                        {{ lessee.earnings }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>

                                </div>
                                <div>
                                    <a href="#" class="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg">Load more...</a>
                                </div>
                            </div>
                        </section>
                    </div>
<!--
                    <section aria-labelledby="timeline-title" class="lg:col-start-3 lg:col-span-1">
                        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                            <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Current Tokens</h2>
-->
                            <!-- PSTs in Vehicle -->
<!--
                            <div class="mt-6 flow-root">
                                <ul class="-mb-8">
                                    <li v-for="pst in vehicle.psts" :key="pst.id">
                                        <div class="relative pb-8">
                                            <div class="relative flex space-x-3">
                                                <div class="flex items-center">
                                                    <div class="flex-shrink-0 h-10 w-10">
                                                        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=5Rgz8QuoBn&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
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
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="mt-6 flex flex-col inline-flex">
                                <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                    </svg>
                                    <span class="pl-2">LEASE SEAT</span>
                                </button>
                            </div>
                        </div>
                    </section>
-->
                </div>
            </div>
        </main>
    </div>

</template>

<script>
import { readContract } from 'smartweave';
import VehicleInfo from './VehicleInfo.vue';

const tabs = [
    { name: 'Info', href: '#', current: true },
    { name: 'Members', href: '#', current: false },
    { name: 'Tokens', href: '#', current: false },
    { name: 'Leases', href: '#', current: false },
    { name: 'Votes', href: '#', current: false },
];


export default {
    components: { VehicleInfo },
    props: ["vehicleId"],
    data() {
        return {
            tabs,
            pageStatus: "",
            contractId: this.vehicleId,
            vehicle: {},
            vehicles: [
                {
                    id: "6adfd3a1-cb33-4970-8e88-c2d0defa66ec",
                    name: "Investment Bus",
                    desc: "",
                    profile: "",
                    leasedSeats: 143,
                    perf1m: -2.43,
                    perf3m: 20.4,
                    perfMax: 140.29,
                    rating: "A+",
                    psts: [
                        {
                            id: "46c0bdd1-56a9-4179-8a56-164b702a5cb8",
                            ticker: "AFTR",
                            name: "AFTR Market",
                            price: 0.05,
                            tokens: 1000,
                            total: 50,
                        },
                        {
                            id: "f9fde4f9-89ec-404b-8a0a-1bc674b39676",
                            ticker: "XYZ",
                            name: "CommunityXYZ",
                            price: 0.098,
                            tokens: 2000,
                            total: 196,
                        },
                        {
                            id: "e6125855-8414-4ae1-b611-66aff71160a2",
                            ticker: "VRT",
                            name: "Verto Exchange",
                            price: 0.1,
                            tokens: 2500,
                            total: 250,
                        },
                    ],
                    lessees: [
                        {
                            id: "b1898f1f-e1cd-4cdc-8797-56e4b91b7ed4",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                        {
                            id: "74834e69-a83b-4f82-8a13-17541061d02a",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                        {
                            id: "b026557f-6ecc-4a88-9eb6-3312772e64fe",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                        {
                            id: "29105359-d468-4ddb-bb08-cf13084c5c0f",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                        {
                            id: "53845c0e-73e2-424f-b76d-f32f53671149",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                        {
                            id: "12fc5148-827b-469f-88bf-1436f41a8d6f",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                        {
                            id: "051689e0-f6be-4037-b686-1375d3cb0cfe",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                        {
                            id: "797854a9-ba19-4c2e-bb35-62e0fd84ec7e",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                        {
                            id: "750dd121-e364-4b0c-933d-c787803bde62",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                        {
                            id: "3ecb9428-d7cd-41cb-bce0-0f31935d0000",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                        {
                            id: "eff9d33e-4f26-44d6-ba70-0059abf6516e",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                        {
                            id: "55becbe8-1ee9-4304-bd4a-f435bf8a6513",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                        {
                            id: "00b653b7-cfe1-410c-bdca-43726cfbe3a6",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                        {
                            id: "dbfe040d-bfcc-4879-ae0e-e6bde059a7f0",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                        {
                            id: "7422d01b-8287-4703-8e03-0662913cafbc",
                            leasedDate: "2021-03-28",
                            seats: 3,
                            pstsEarned: 14,
                            earnings: 10022.32,
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        viewVehicles() {
            console.log("View Clicked");
            this.$router.push("../vehicles");
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
        } catch (error) {
            console.log("ERROR calling SmartWeave: " + error);
            this.pageStatus = "error";
            return false;
        }

        this.pageStatus = "";
    },
};
</script>