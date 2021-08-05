<template>
    <div class="pt-4 w-3/4">
        <!-- Member Table -->
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Member
                        </th>
                        <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tokens
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(tokens, addr) in members" :key="addr" class="text-xs text-gray-500 hover:bg-gray-50">
                        <td class="text-left px-4 py-2">
                            {{ addr }}
                        </td>
                        <td class="text-right px-4 py-2">
                            {{ formatNumber(tokens) }}
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
    props: ["members"],
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