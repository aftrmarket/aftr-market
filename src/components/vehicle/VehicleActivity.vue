<template>
        <div v-for="(activity, interaction) in activities" :key="interaction" class="flex flex-col p-2 pt-4 gap-y-2 bg-white shadow overflow-hidden">
            <div class="">
                <span class="text-lg font-medium uppercase tracking-wide">{{ interactionText(getProperty(activity, "function")) }}</span>
                <span class="font-mono text-sm text-gray-500">({{ interaction }})</span>
            </div>
            <div class="pl-4">
                <span v-html="getAllInputs(JSON.parse(activity))"></span>
            </div>
            <div class="flex flex-row">
                <div v-if="interactions[interaction]">
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
                            <span class="font-light text-red-600">Failed</span>
                        </span>
                    </div>
                </div>
                <div></div>
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
        getProperty(textObj, key = null, index = null) {
            const obj = JSON.parse(textObj);
            if (key) {
                return obj[key];
            }
            if (index) {
                return Object.keys(obj)[index] + " : " + Object.values(obj)[index];
            }
        },
        interactionText(func) {
            if (func.substr(0, 7) === "plygnd-") {
                return "Playground Initialization ";
            } else if (func === "multiInteraction") {
                return "Multiple Bundled Changes";
            } else {
                return func;
            }
        },
        getAllInputs(obj) {
            let htmlText = "";
            const keys = Object.keys(obj);

            if (obj.function === "multiInteraction") {
                // Loop thru actions
                const actions = obj.actions;
                let actionText = "<span class='pl-5'>";
                let inputText = ""
                let count = 1;
                for (let action of actions) {
                    actionText += count.toString() + ". " + action.input.function + "<br/>";
                    inputText = this.getAllInputs(action.input);
                    actionText += "<span class='pl-10'>" + inputText + "</span>";
                    count++;
                }
                htmlText += "actions:<br/>" + actionText + "</span>";
            } else {
                // Loop through keys
                for (let i = 0; i < keys.length; i++) {
                    if (keys[i] !== "function" && obj[keys[i]] != "") {
                        htmlText += keys[i] + ": <span class='font-mono text-sm text-gray-600'>" + obj[keys[i]] + "</span><br/>";
                    }
                }
            }
            return htmlText;
        },
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