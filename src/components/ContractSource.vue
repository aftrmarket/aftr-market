<template>
    <main class="-mt-40">
        <div class="pt-10 bg-aftrDarkGrey lg:pt-8 pb-14 lg:overflow-hidden mx-auto max-w-7xl px-8">
            <div class="flex items-center justify-between">
                <div class="flex space-x-5 items-center">
                    <div>
                        <h1 class="text-2xl font-bold text-white">AFTR Contract Source</h1>
                        <div class="flex items-center space-x-2 text-sm font-medium font-mono text-aftrYellow">
                            <span>{{ this.contractId }}</span>
                            <button v-clipboard="this.contractId" @click="showPopup">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <button @click.prevent="backToRepo" type="submit" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
                    </svg>
                    <span class="pl-2">Back to Repo</span>
                </button>
            </div>
        </div>
        <div class="py-6 bg-gray-50 overflow-hidden">
            <div class="mx-auto px-4 space-y-8 sm:px-6 lg:px-8 text-sm">

                <VueDiff v-if="contractSrc != ''" :mode="diffMode" theme="aftr" language="js" :prev="contractSrc" :current="currentAftrSrc" :input-delay="0" :virtual-scroll="false"
                    style="font-size: 0.875rem" />

                <!-- <highlightjs v-if="contractSrc != '' && contractSrc != undefined" language="js" :code="contractSrc" /> -->
                <p v-if="contractSrc == undefined" class="text-red-500">Contract source missing - no contracts exist with source ID {{ contractId }}</p>
            </div>
        </div>
        <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
            <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <div v-if="show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div class="p-4">
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 bg-green-100">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div class="ml-3 w-0 flex-1 pt-0.5">
                                    <p class="text-sm font-medium text-gray-900">Copied address to
                                        clipboard
                                    </p>
                                </div>
                                <div class="ml-4 flex flex-shrink-0">
                                    <button type="button" @click="show = false"
                                        class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span class="sr-only">Close</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
.vue-diff-theme-aftr {
    @import 'highlight.js/scss/vs2015.scss'; // import theme
    background-color: theme('colors.aftrDarkGrey.DEFAULT');
}
</style>

<script>
import { mapGetters } from "vuex";
import Transaction from "arweave/node/lib/transaction";

import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from "@highlightjs/vue-plugin";
hljs.registerLanguage('javascript', javascript);

export default {
    props: {
        contractId: String
    },
    data() {
        return {
            routeProtocol: "http",
            routeHost: "localhost",
            routePort: "1984",
            logo: '/public/aftr-market-logo.png',
            contractSrc: '',
            currentAftrSrc: '',
            diffMode: '',
            show: false,
            env: import.meta.env.VITE_ENV,
        }
    },
    components: {
        highlightjs: hljsVuePlugin.component
    },
    methods: {
        async getSourceDev() {
            let protocol = import.meta.env.VITE_ARWEAVE_PROTOCOL
            let host = import.meta.env.VITE_ARWEAVE_HOST
            let port = import.meta.env.VITE_ARWEAVE_PORT
            let network = protocol + '://' + host + ':' + port + '/'
            let txId = this.contractId
            let response = await fetch(network + 'tx/' + txId)
            if (response.status != 200) { return }

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
            if (this.env === "DEV") {
                route = this.routeProtocol + "://" + this.routeHost + ":" + this.routePort + "/tx/" + txID;
                response = await fetch(route).then(res => res.json());
                this.tags = this.interactionTagsParser(response);
            } else {
                route = import.meta.env.VITE_TX_GATEWAY + "?txId=" + contractId + (this.env === "TEST" ? "&testnet=true" : "");
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
        showPopup() {
            this.show = true;
            let timer = 2;
            let interval = setInterval(() => {
                if (timer === 0) {
                    clearInterval(interval)
                    this.show = false;
                } else {
                    timer--
                }
            }, 1000)
        },
        async getSource(contractId) {
            if (import.meta.env.VITE_ENV === "PROD" || import.meta.env.VITE_ENV === "TEST") {
                this.$store.commit("setAftrContractSources");
                let route = import.meta.env.VITE_TX_GATEWAY + "-source?id=" + contractId + (this.env === 'TEST' ? '&testnet=true' : '');
                let response = await fetch(route);
                console.log(route);
                let data = await response.json();
                return data.src;
            } else {
                // Check to see if any contract sources exist (getAftrContractSources variable)
                const csArray = this.getAftrContractSources
                if (csArray.length > 0) {
                    this.aftrContractSourceId = csArray[csArray.length - 1]
                    this.getSourceDev()
                } else {
                    // If they don't, add a message stating that the contract source can't be shown until after the user enters the Playground
                    /*** I know, this is clunky, but's it's just for dev/test, so realistically, no one will ever see it */
                    alert("contract source can't be shown until after the user enters the playground!")
                }
            }
        },
        backToRepo() {
            this.$log.info("ContractSource : Back to Repo :: ", "Button Clicked");
            this.$router.go(-1)
        }
    },
    computed: {
        ...mapGetters(["getAftrContractSources"])
    },
    async created() {
        const csArray = this.getAftrContractSources
        let latestAftrContract = csArray[csArray.length - 1]
        this.diffMode = latestAftrContract == this.contractId ? 'unified' : 'split'
        if (latestAftrContract == this.contractId) {
            this.diffMode = 'unified'
            this.currentAftrSrc = this.contractSrc = await this.getSource(this.contractId)
        } else {
            this.diffMode = 'split'
            this.currentAftrSrc = await this.getSource(latestAftrContract)
            this.contractSrc = await this.getSource(this.contractId)
        }
        // const srcId = this.getContractSourceId()
    }
};
</script>
