<template>
    <perfect-scrollbar>
        <div v-if="activities.length === 0" class="pl-4 pt-4">
            Not yet any activities to show on this repo.
        </div>
        <div v-for="(commentIndex, index) in commentsToShow" :key="activities[index]" class="pt-4 w-full">
            <div v-if="index < activities.length">
                <div class="">
                    <span class="text-aftrBlue text-md font-medium uppercase tracking-wide">{{ activities.length - index
}}. {{ interactionText(activities[index].input.function) }}</span>
                    <span class="font-mono text-xs text-gray-500">({{ activities[index].id }})</span>
                </div>
                <div class="pl-8 pb-4">
                    <span v-html="getAllInputs(activities[index].input)"></span>
                    <span v-if="isError" v-html="getErrorInputs(activities[index])"></span>
                </div>
                <div class="flex flex-row">
                    <div v-if="activities[index].result">
                        <div class="pb-1 border-solid border border-green-500 rounded ">
                            <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-white border-1 border-green text-green">
                                <svg class="-ml-0.5 mr-1.5 h-2 w-2" fill="green" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" />
                                </svg>
                                <span class="font-light text-green-600">Successful</span>
                            </span>
                        </div>
                    </div>
                    <div v-else>
                        <div class="pb-1 border-solid border border-red-500 rounded ">
                            <span class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-white border-1 border-red text-red">
                                <svg class="-ml-0.5 mr-1.5 h-2 w-2" fill="red" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" />
                                </svg>
                                <span class="font-light text-red-600"><button @click="test">Failed</button></span>
                            </span>
                        </div>
                    </div>
                    <div class="pl-10 pt-2 text-xs">Block <span class="font-mono text-gray-500">{{
        activities[index].block
}}</span></div>
                    <div class="pl-10 pt-2 text-xs">
                        Caller
                        <span v-if="activities[index].result" class="font-mono text-green-600">{{
        activities[index].owner
}}</span>
                        <span v-else class="font-mono text-red-600">{{ activities[index].owner }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="commentsToShow < activities.length || activities.length > commentsToShow">
            <button @click="commentsToShow += 10" class="mt-4 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Show More Activities
            </button>
        </div>
    </perfect-scrollbar>
</template>

<script>

export default {
    props: ["arweave", "repoId", "interactions", "errorMessages"],
    data() {
        return {
            isLoading: true,
            edges: [],
            activities: [],
            isError: true,
            commentsToShow: 10,
            totalComments: 0
        };
    },
    mounted() {
        this.totalComments = this.activities.length;
    },
    computed: {
        interactionResult(interaction) {
            if (interaction) {
                return "Successful";
            } else {
                return "Failed";
            }
        },
    },
    methods: {
        test() {
            this.$swal({
                html: JSON.stringify(this.errorMessages),
                width: 800,
                showConfirmButton: false,
            })
        },
        parseActivity(data) {
            console.log(data)
            // Parses the query response and returns an object with the needed variables
            let activity = {};
            activity.id = data.id;
            activity.owner = data.owner.address;
            activity.timestamp = data.block.timestamp;
            activity.block = data.block.height;
            activity.result = this.interactions[activity.id];

            console.log("activity.result ", activity.result);
            // Parse Input tag to get the interaction specifics
            for (let tag of data.tags) {
                if (tag.name === "Input") {
                    activity.input = JSON.parse(tag.value);
                }
            }
            return activity;
        },
        interactionText(func) {
            if (typeof func == "undefined") {
                return "Unable to Display Interaction";
            } else if (func.substr(0, 7) === "plygnd-") {
                return "Playground Initialization ";
            } else if (func === "multiInteraction") {
                return "Multi-Interaction";
            } else {
                return func;
            }
        },
        getAllInputs(obj) {
            let htmlText = "Inputs:<br/>";
            const keys = Object.keys(obj);

            if (typeof obj.function == "undefined") {
                htmlText += "<span class='pl-5'>Unable to show input.</span><br/>";
            } else if (obj.function === "multiInteraction") {
                // Loop thru actions
                const actions = obj.actions;
                let actionText = "";
                let count = 1;
                for (let action of actions) {
                    actionText += "<span class='pl-5'>" + count.toString() + ". " + action.input.function + "<br/>";

                    for (let key in action.input) {
                        if (action.input[key]) {
                            let value = action.input[key];
                            if (typeof value === "object") {
                                value = JSON.stringify(value);
                            }
                            actionText += "<p class='pl-8 text-sm'>- " + key + ": <span class='font-mono text-gray-600'>" + value + "</span></p>";
                        }
                    }
                    count++;
                }
                htmlText += actionText + "</span>";
            } else {
                // Loop through keys
                for (let i = 0; i < keys.length; i++) {
                    if (keys[i] !== "function" && obj[keys[i]] != "") {
                        let value = obj[keys[i]];
                        if (typeof value === "object") {
                            value = JSON.stringify(value);
                        }
                        htmlText += "<p class='pl-4 text-sm'>- " + keys[i] + ": <span class='font-mono text-sm text-gray-600'>" + value + "</span></p>";
                    }
                }
            }
            return htmlText;
        },
        getErrorInputs(obj) {
            let htmlText = "";
            Object.fromEntries(Object.entries(this.errorMessages).filter(([key, value]) => {
                if (key == obj.id) {
                    htmlText += "Error:<br/>"
                    htmlText += "<p class='text-sm text-red-600'>- " + value + "</p>";
                }
            }))
            return htmlText;
        },
        async runQuery(query, errorMsg) {
            try {
                let response = await this.arweave.api.post("graphql", {
                    query: query
                });

                if (response.status !== 200) {
                    response = null;
                }

                return response;
            } catch (e) {
                this.$log.error("RepoActivity : runQuery :: ", errorMsg + e);
            }
        },
        async readInteractions(data) {
            // Get all interaction ids for query
            let query = `
                query($cursor: String) {
                    transactions(
                        ids: ${JSON.stringify(data)}
                        after: $cursor
                        sort: HEIGHT_ASC
                    ) {
                        pageInfo {
                            hasNextPage
                        }
                        edges {
                            cursor
                            node { id, owner {address}, block {height, timestamp}, tags{name, value} } 
                        }
                    }
                }
            `;
            // Return data about each interation
            const responseData = await this.runQuery(query, "Error querying interactions. ");
            this.edges = responseData.data.data.transactions.edges;
        },
        async getInteractions(contractId) {
            console.log(contractId);
            let route = 'https://gateway.redstone.finance/gateway/interactions?contractId=' + contractId + (this.network === 'TEST' ? '&testnet=true' : '');
            let response = await fetch(route)
            let data = await response.json()
            return data.interactions
        }
    },
    async created() {
        this.isLoading = true;
        let interactions = await this.getInteractions(this.repoId)
        for (const i of interactions) {
            let parsed = this.parseActivity(i.interaction)
            this.activities.push(parsed)
        }

        // let txIds = Object.keys(JSON.parse(JSON.stringify(this.interactions)))
        // for (const interaction of txIds) {
        //     await this.readInteraction(interaction)
        // }


        // let interactionStrings = []
        // for (const i in this.interactions) {
        //     interactionStrings.push(i)
        // }

        // const numChunks = Math.ceil(interactionStrings.length / 10);
        // let data = Array.from(
        //     { length: numChunks },
        //     (_, i) => interactionStrings.slice(i * interactionStrings.length / numChunks, (i + 1) * interactionStrings.length / numChunks)
        // );
        // // Read the tags for all contract interactions

        // for (let i = 0; i < data.length; i++) {
        //     await this.readInteractions(data[i]);

        //     for (let edge of this.edges) {
        //         this.activities.push(this.parseActivity(edge));
        //     }
        // }
        this.activities.reverse();
        this.isLoading = false;
        return
    }
}
</script>































































<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>
<style scoped>
.ps {
    height: 750px;
}
</style>