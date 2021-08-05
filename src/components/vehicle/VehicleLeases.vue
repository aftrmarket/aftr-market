<template>
    <div class="pt-4 w-full">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <!-- PST Table -->
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
                    <tr v-for="lessee in leases" :key="lessee.id" class="text-xs text-gray-500 hover:bg-gray-50">
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
</template>

<script>
import numeral from "numeral";

export default {
    props: ["leases"],
    data() {
        return {

        };
    },
    methods: {
        formatNumber(num, dec = false) {
            if (dec) {
                return numeral(num).format("0,0.0000");
            } else {
                return numeral(num).format("0,0");
            }
        },
    },
};
</script>