<template>
    <main class="-mt-32">
        <div class="pt-10 bg-aftrDarkGrey sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div class="mx-auto max-w-7xl lg:px-8">
                <div class="lg:grid lg:grid-cols-2 lg:gap-8">
                    <div
                        class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                        <div class="">
                            <h1
                                class="mt-4 text-4xl tracking-tight font-bold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-5xl">
                                <span class="block">A better way to store</span>
                                <span class="block text-aftrYellow">Arweave assets</span>
                            </h1>
                            <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                AFTR Market provides asset management and governance on-chain for <a
                                    href="https://arweave.org" target="_blank" style="color:#FFFC79;">Arweave</a>
                                assets.
                            </p>
                            <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                Feel free to mint yourself some PLAY tokens so that you can try out the functionality when launching the app.
                            </p>
                            <p class="mt-3 pl-4 text-sm text-aftrRed">
                                * PLAY tokens have not value and are for testing purposes only.
                            </p>
                            <div class="mt-10">
                                <div class="sm:flex">
                                    <div class="mt-3 sm:mt-0 sm:ml-3">
                                        <button @click.prevent="routeUser" type="submit" class="block w-full py-3 px-4 rounded-md shadow bg-indigo-300 text-white font-medium hover:bg-aftrBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">Launch</button>
                                    </div>
                                    <div class="mt-3 sm:mt-0 sm:ml-3">
                                        <button @click.prevent="mintPlayTokens" type="submit" class="py-3 px-4 rounded-md shadow bg-indigo-300 text-white font-medium hover:bg-aftrBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">
                                            Mint PLAY
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sm:-mb-32 lg:relative">
                        <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                            <img class="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                src="../../assets/overview-3d-illustration.svg" alt="" />
                        </div>
                    </div>
                    <div class="mt-3 mb-6 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                        For more information, see below 👇
                    </div>
                </div>
            </div>
        </div>


        <div class="py-4 bg-gray-50 overflow-hidden lg:py-4">
            <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">

                <div class="relative mt- lg:mt-2 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div class="relative">
                        <h2 class="text-base text-aftrBlue font-semibold tracking-wide uppercase">Introducing</h2>
                        <h3 class="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">Arweave Asset Management</h3>
                        <p class="mt-3 text-lg text-gray-500">
                            Securely manage your Arweave assets on-chain.
                        </p>

                        <dl class="mt-10 space-y-10">
                            <div v-for="item in tmFeatures" :key="item.id" class="relative">
                                <dt>
                                    <div
                                        class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-aftrBlue text-white">
                                        <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{{ item.name }}</p>
                                </dt>
                                <dd class="mt-2 ml-16 text-base text-gray-500">
                                    {{ item.description }}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div class="mt-10 -mx-4 pb-20 relative lg:mt-0" aria-hidden="true">
                        <svg class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden" width="784"
                            height="404" fill="none" viewBox="0 0 784 404">
                            <defs>
                                <pattern id="ca9667ae-9f92-4be7-abcb-9e3d727f2941" x="0" y="0" width="20" height="20"
                                    patternUnits="userSpaceOnUse">
                                    <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width="784" height="404" fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
                        </svg>
                        <img class="relative mx-auto" src="../../assets/overview-repo.svg" alt="" width="1184" height="1376" />
                    </div>
                </div>

                <svg class="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12" width="404"
                    height="784" fill="none" viewBox="0 0 404 784" aria-hidden="true">
                    <defs>
                        <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x="0" y="0" width="20" height="20"
                            patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                </svg>
            </div>
        </div>
    </main>
</template>

<script>
import {
    ChartPieIcon,
    LockClosedIcon,
    MegaphoneIcon,
    ChartBarIcon,
    ReceiptRefundIcon,
    UserGroupIcon,
    ClipboardDocumentListIcon,
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    GlobeAltIcon,
    PencilSquareIcon,
} from "@heroicons/vue/24/outline";

import { mapGetters } from "vuex";
import { warpRead, warpWrite, arweaveInit, warpCreateContract } from './../utils/warpUtils.js';

const tmFeatures = [
    {
        id: 1,
        name: "Multi-signature",
        description:
            "Store your Arweave assets on-chain using AFTR's multi-signature capabilities. Create multiple or individually owned repos to protect your assets.",
        icon: UserGroupIcon,
    },
    {
        id: 2,
        name: "Composable",
        description:
            "Build repos to meet your needs, define voting systems, set parameters such as quorum and support, add new settings, set member voting power, and more!",
        icon: PencilSquareIcon,
    },    
    {
        id: 3,
        name: "Built-in Governance",
        description:
            "Make changes to your repo and let the smart contract determine if votes need to be cast.",
        icon: ClipboardDocumentListIcon,
    },
    {
        id: 4,
        name: "Governance Notifications (COMING SOON)",
        description:
            "Automatically notify members of proposed changes to your repo through the ArConnect wallet.",
        icon: MegaphoneIcon,
    },
];

export default {
    data() {
        return {
            env: import.meta.env.VITE_ENV,
        };
    },
    computed: {
        ...mapGetters(["getActiveWallet"]),
    },
    methods: {
        async routeUser() {
            this.$swal({
                icon: "info",
                html: "Finding AFTR Repos...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.$swal.showLoading()
                },
            });
            await this.init();
            this.$router.push("../repos");
            this.$swal.close();
        },

        async init() {
            // Get the AFTR Contract Source ID for Prod and Test
            if (import.meta.env.VITE_ENV === "TEST" || import.meta.env.VITE_ENV === "PROD") {
                this.$store.commit("setAftrContractSources");
            }

            await this.$store.dispatch('arConnect');
        },

        async mintPlayTokens() {
            await this.$store.dispatch('arConnect');

            // Not using bundled 
            let playTokenId = import.meta.env.VITE_PLAY_CONTRACT_ID;

            // Get contract ID if in dev
            if (this.env === "DEV") {
                const query = `query($cursor: String) {
                        transactions(
                            tags: [ 
                                { name: "Protocol", values: ["PLAY"] },
                        ]
                            after: $cursor
                        )
                        { pageInfo { hasNextPage }
                            edges { cursor node { id } }
                        }
                    }`;

                const arweave = arweaveInit();
    
                const addr = await arweave.wallets.jwkToAddress("use_wallet");
                await this.mintAr(addr, arweave);
                let response = await this.runQuery(this.arweave, query, "Failed when looking for PLAY Token.");
                let res = response.data.data.transactions.edges;

                if (res.length == 0) {
                    // Create PLAY
                    let txIds = await warpCreateContract(playTokenSrc, playTokenInitState, [{ name: "Protocol", value: "PLAY" }], false);
                    playTokenId = txIds.contractTxId;
                } else {
                    playTokenId = res[0].node.id;
                }
                alert(playTokenId)
            }
            /*** FAUCET  */
            let input = {
                function: "mint",
                qty: 1000
            };
            let tx = await warpWrite(playTokenId, input, true);

            let activeWallet = this.getActiveWallet;
            let walletAddr = activeWallet.address;

            // Read Play contract
            let response = await warpRead(playTokenId);

            // Add or update Play token in user's wallet
            let userTokenBal = response.state.balances[walletAddr];

            if (response.state.balances[walletAddr]) {
                userTokenBal = response.state.balances[walletAddr];
            }
            let playIndex = activeWallet.psts.findIndex(pst => pst.contractId === playTokenId);
            let playPst = {
                contractId: playTokenId,
                balance: userTokenBal,
                name: response.state.name,
                ticker: response.state.ticker,
            };
            if (playIndex !== -1) {
                this.$store.commit("removeWalletPst", playTokenId);
            }
            this.$store.commit("addWalletPst", playPst);
            // swal for loading?
            this.$swal({
                icon: "success",
                html: walletAddr + "<br /><br />Successfully minted 1000 PLAY"
            });
        },
    },
    setup() {
        return {
            tmFeatures,
        };
    },
};
</script>