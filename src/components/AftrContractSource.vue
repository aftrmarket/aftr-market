<template>
    <main class="-mt-40">
        <div class="pt-10 bg-aftrDarkGrey sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden mx-auto max-w-7xl lg:px-8">
            <div class="flex items-center space-x-5">
                <div class="flex-shrink-0">
                    <div class="relative">
                        <img class="h-16 w-16 rounded-full" :src="logo" alt="">
                        <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
                    </div>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-white">AFTR Contract Source</h1>
                    <p class="text-sm font-medium font-mono text-aftrYellow">
                        {{ aftrContractSourceId }}
                        <button v-clipboard="aftrContractSourceId" @click="showPopup">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="white" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                            </svg>
                        </button>
                    </p>
                </div>
            </div>
        </div>
        <div class="py-6 bg-gray-50 overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
                <highlightjs language="js" :code="contractSrc" />
            </div>
        </div>
    </main>
</template>

<script>
import { mapGetters } from "vuex";
import Transaction from "arweave/node/lib/transaction";

import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from "@highlightjs/vue-plugin";
hljs.registerLanguage('javascript', javascript);

export default {
    data() {
        return {
            routeProtocol: "http",
            routeHost: "localhost",
            routePort: "1984",
            aftrContractSourceId: '',
            logo: 'src/assets/aftr-market-logo.png',
            contractSrc: ''
        }
    },
    components: {
        highlightjs: hljsVuePlugin.component
    },
    methods: {
        async getSource() {
            let protocol = import.meta.env.VITE_ARWEAVE_PROTOCOL
            let host = import.meta.env.VITE_ARWEAVE_HOST
            let port = import.meta.env.VITE_ARWEAVE_PORT
            let network = protocol + '://' + host + ':' + port + '/'
            let txId = this.aftrContractSourceId
            let response = await fetch(network + 'tx/' + txId)
            if (response.status != 200) { return }
            console.log(response)

            let data = await response.json()
            const tx = new Transaction(data)

            const tags = tx.get("tags")
            for (let i = 0; i < tags.length; i++) {
                let tag = tags[i]
                let name = tag.get("name", { decode: true, string: true });
                let value = tag.get("value", { decode: true, string: true });

                // if (name == 'Contract-Src') {
                //     response = await fetch(network + target.value)
                //     data = await response.text()
                //     this.contractSrc = data
                //     return
                // }

                if (value == 'SmartWeaveContractSource') {
                    response = await fetch(network + txId)
                    data = await response.text()
                    this.contractSrc = data
                    return
                }
            }
        },
        async getContractSourceId(txID) {
            let route = "";
            let response = {};
            if (this.network === "DEV") {
                route = this.routeProtocol + "://" + this.routeHost + ":" + this.routePort + "/tx/" + txID;
                response = await fetch(route).then(res => res.json());
                this.tags = this.interactionTagsParser(response);
            } else {
                route = `https://gateway.redstone.finance/gateway/contract?txId=${txID}${this.network === "TEST" ? "&testnet=true" : ""}`;
                response = await fetch(route);
                if (!response.ok) {
                    alert("Could not fetch contract.");
                    return;
                }
                const data = await response.json();
                return data.srcTxId;
            }
            for (let i = 0; i < this.tags.length; i++) {
                if (this.tags[i].key === "Contract-Src") {
                    return this.tags[i].value;
                }
            }
        },
        interactionTagsParser(tx) {
            const contractTx = new Transaction(tx);
            let tags = [];
            contractTx.get('tags').forEach((tag) => {
                let key = tag.get('name', { decode: true, string: true });
                let value = tag.get('value', { decode: true, string: true });
                tags.push({ key, value });
            });
            return tags;
        },
    },
    computed: {
        ...mapGetters(["getAftrContractSources"])
    },
    async created() {
        if (import.meta.env.VITE_ENV === "PROD") {
            this.$store.commit("setAftrContractSources");
        } else {
            // Check to see if any contract sources exist (getAftrContractSources variable)
            const csArray = this.getAftrContractSources
            if (csArray.length > 0) {
                this.aftrContractSourceId = csArray[csArray.length - 1]
                this.getSource()
            } else {
                // If they don't, add a message stating that the contract source can't be shown until after the user enters the Playground
                /*** I know, this is clunky, but's it's just for dev/test, so realistically, no one will ever see it */
                console.log("contract source can't be shown until after the user enters the playground")
            }
        }

        // const srcId = this.getContractSourceId()
    }
};
</script>
