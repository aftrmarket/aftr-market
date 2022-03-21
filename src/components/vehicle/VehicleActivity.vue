<template>
    <div class="pt-4 px-4 py-5 sm:px-6">
        <h3 class="text-xl font-light leading-6"></h3>
        <div v-for="(activity, interaction) in activities" :key="interaction">
            {{ interaction }} : {{ activity }} <br />
            {{ interactions[interaction] }}
        </div>

        <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" class="divide-y divide-gray-200">
                <li v-for="(activity, interaction) in activities" :key="interaction">
                    <div class="flex items-center px-4 py-4 sm:px-6">
                        <div class="min-w-0 flex-1 flex items-center">
                            <div class="border-2 border-green-500">
                                <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-white border-1 border-green text-green">
                                    <svg class="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="green" viewBox="0 0 8 8">
                                        <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    <span class="font-light text-green-500">Successful</span>
                                </span>
                            </div>
                            <div class="flex-shrink-0">
                                {{ interaction }}
                            </div>
                            <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                {{ activity }}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: ["arweave", "interactions"],
    data() {
        return {
            isLoading: true,
            activities: {},
        };
    },
    methods: {
        async readTags(interactionId) {
            let tx = await this.arweave.transactions.get(interactionId);
            let input = "";
            tx.get("tags").every((tag) => {
                let key = tag.get("name", { decode: true, string: true });
                let value = tag.get("value", { decode: true, string: true });
                if (key === "Input") {
                    input = value;
                    return false;
                }
                return true;
            });
            return input;
        },
    },
    async created() {
        // Read the tags for all contract interactions
        this.isLoading = true;

        try {
            for (const i in this.interactions) {
                this.activities[i] = await this.readTags(i);
            }
        } catch (error) {
            console.log("ERROR connecting to Arweave: " + error);
        }

        this.isLoading = false;
    },
};
</script>