<template>
    <div class="pt-4">
        <div class="flex items-center justify-between">
            <div class="px-4 py-5 sm:px-6">
                <h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">
                    {{ vehicle.name }}
                </h2>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    <span class="text-lg text-black">{{ vehicle.ticker }}</span>
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
    </div>
</template>

<script>
export default {
    props: ["vehicle", "contractId"],
    data() {
        return {
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
            ]
        };
    },
    methods: {

    },
};
</script>