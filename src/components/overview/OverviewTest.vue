<template>
    <main class="-mt-40">
        <vote-simulator v-if="showVoteSimulator" @close="closeModal"></vote-simulator>
        <div class="pt-10 bg-aftrDarkGrey sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div class="mx-auto max-w-7xl lg:px-8">
                <div class="lg:grid lg:grid-cols-2 lg:gap-8">
                    <div
                        class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                        <div class="">
                            <h1 class="text-4xl tracking-tight font-bold text-white sm:mt-5 sm:text-6xl xl:text-5xl">
                                <span class="block">Welcome to</span>
                                <span class="block text-aftrYellow">AFTR Playground</span>
                            </h1>
                            <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                The purpose of the Playground is to show you how to build your AFTR Repos without having
                                to transfer your current Arweave assets.
                                On the Playground, you'll be given Arweave assets in the form of Profit Sharing Tokens
                                as well as AR (testnet AR, not real AR 🤣)
                                so that you can create your own repos and see how to manage and govern them.
                            </p>
                            <div class="mt-10 sm:mt-12">
                                <form action="#" class="sm:max-w-xl sm:mx-auto lg:mx-0">
                                    <div class="sm:flex">
                                        <div class="mt-3 sm:mt-0 sm:ml-3">
                                            <button @click.prevent="initPlayground" type="submit"
                                                class="block w-full py-3 px-4 rounded-md shadow bg-indigo-300 text-white font-medium hover:bg-aftrBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">Launch</button>
                                        </div>
                                        <div class="mt-3 sm:mt-0 sm:ml-3">
                                            <button @click.prevent="init" type="submit"
                                                class="block w-full py-3 px-4 rounded-md shadow bg-indigo-300 text-white font-medium hover:bg-aftrBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">Repo
                                                List</button>
                                        </div>
                                        <div class="mt-3 sm:mt-0 sm:ml-3">
                                            <button @click.prevent="routeUser('PROD')" type="submit"
                                                class="block w-full py-3 px-4 rounded-md shadow bg-indigo-300 text-white font-medium hover:bg-aftrBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">Back
                                                to MAINNET</button>
                                        </div>
                                        <div class="mt-3 sm:mt-0 sm:ml-3">
                                            <!---<button @click.prevent="voteSimulatorTest"  type="submit" class="block w-full py-3 px-4 rounded-md shadow bg-indigo-300 text-white font-medium hover:bg-aftrBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">Voting Simulator</button>-->
                                            <button @click.prevent="mintPlayTokens" type="submit"
                                                class="py-3 px-4 rounded-md shadow bg-indigo-300 text-white font-medium hover:bg-aftrBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">Mint
                                                PLAY</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 sm:-mb-32 lg:relative">
                        <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                            <img class="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                src="../../assets/overview-test-launch.png" alt="" />
                        </div>
                    </div>
                    <div class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                        Please note that the Playground will be refreshed periodically, so you will see your repos
                        disappear when this happens.
                    </div>
                </div>
            </div>
        </div>

        <div class="py-6 bg-gray-50 overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
                <div class="text-base max-w-prose mx-auto lg:max-w-none">
                    <h2 class="text-base text-aftrBlue font-semibold tracking-wide uppercase">Instructions</h2>
                    <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">What the
                        Heck is an AFTR Repo?</p>
                </div>

                <div class="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                    <div class="relative lg:row-start-1 lg:col-start-2">
                        <div class="aspect-w-12 aspect-h-7 lg:aspect-none">
                            <img class="object-cover object-center" src="../../assets/overview-test-whatis.svg" alt=""
                                width="1184" height="1376" />
                        </div>
                    </div>
                    <div class="mt-8 lg:mt-0">
                        <div class="text-base max-w-prose mx-auto lg:max-w-none">
                            <p class="text-lg text-gray-500">
                                AFTR Market allows you to create and group Arweave assets together inside of a
                                “repo.” By grouping these assets together on-chain,
                                you can then put governance around them to manage their profit streams. Furthermore, you
                                are essentially fractionalizing these assets
                                because when you setup DAO members on your AFTR repo, the profit streams will flow
                                into the repo to those members proportionately.
                                This is because when you transfer Arweave assets to an AFTR Repo, the AFTR Repo
                                becomes the balance holder on the asset contract.
                                Stated another way, if you create an AFTR Repo and put one of your Arweave PSTs
                                inside of the repo, you transferred the asset from
                                your wallet to the Permaweb for safe keeping. <br /><br />

                                There are certainly more reasons to use AFTR Repos, every wallet holder containing
                                Arweave assets such as PSTs or NFTs should consider
                                securing their assets in a repo. Also note that when you create an AFTR Repo, you
                                are minting a new asset on the Permaweb which can be traded as well.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="py-4 bg-gray-50 overflow-hidden lg:py-4">
                <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                    <h3 class="text-2xl font-extrabold text-gray-900 text-right tracking-tight sm:text-3xl">What Happens
                        When I Press the Launch Button?</h3>
                    <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                        <div class="lg:col-start-2">
                            <p class="mt-3 text-lg text-gray-500">
                                AFTR Playground uses a test gateway supported by the <a href="https://verto.exchange"
                                    target="_blank" style="color:#6C8CFF">Verto Exchange</a> team. As such, the test
                                instance will be periodically refreshed. When you press the Launch button,
                                AFTR Playground checks to make sure it has what it needs to ensure that you can properly
                                play in the our sandbox. So, note that any repos that you create in the Playground
                                will disappear upon a test gateway refresh.
                            </p>

                            <dl class="mt-10 space-y-10">
                                <div v-for="item in initProcess" :key="item.id" class="relative">
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

                        <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                            <svg class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                                width="784" height="404" fill="none" viewBox="0 0 784 404" aria-hidden="true">
                                <defs>
                                    <pattern id="e80155a9-dfde-425a-b5ea-1f6fadd20131" x="0" y="0" width="20"
                                        height="20" patternUnits="userSpaceOnUse">
                                        <rect x="0" y="0" width="4" height="4" class="text-gray-200"
                                            fill="currentColor" />
                                    </pattern>
                                </defs>
                                <rect width="784" height="404" fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)" />
                            </svg>
                            <img class="relative mx-auto" width="490" src="../../assets/overview-test-process.svg"
                                alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="relative bg-gray-50 pt-16 pb-32 overflow-hidden">
            <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                <h3 class="pb-4 text-2xl font-extrabold text-gray-900 text-left tracking-tight sm:text-3xl">What to do
                    in the AFTR Playground</h3>
                <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                    <div class="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                        <div>
                            <div>
                                <span class="h-12 w-12 rounded-md flex items-center justify-center bg-aftrBlue">
                                    <PencilAltIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                </span>
                            </div>
                            <div class="mt-6">
                                <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">Explore an AFTR Repo
                                </h2>
                                <p class="mt-4 flex flex-nowrap gap-2 text-lg text-gray-500"><img class="w-6"
                                        src="../../assets/overview-bullet-1.svg" /> Click on the Blue Horizon repo
                                </p>
                                <ul>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Make sure you connect
                                        your wallet with ArConnect.</li>
                                </ul>
                                <p class="mt-4 flex flex-nowrap gap-2 text-lg text-gray-500"><img class="w-6"
                                        src="../../assets/overview-bullet-2.svg" /> Enable Editing</p>

                                <ul>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Editing is available
                                        if you're a member of the repo</li>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Single Owner vs. DAO
                                        Owned</li>
                                    <li class="text-sm text-gray-900 pl-16">Changes to a Single Owner repo occur
                                        during the next block after the change. Changes to a DAO Owned repo propose a
                                        vote for the members of the repo to vote on.</li>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Make a change and
                                        notice that a vote is proposed</li>
                                </ul>

                                <p class="mt-4 flex flex-nowrap gap-2 text-lg text-gray-500"><img class="w-6"
                                        src="../../assets/overview-bullet-3.svg" /> Add Some Tokens</p>
                                <ul>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Transfer assets from
                                        your wallet to the repo</li>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Only assets that
                                        support cross contract communication can be added</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div class="mt-12 sm:mt-16 lg:mt-0">
                        <div class="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                            <img class="w-full lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                src="../../assets/overview-test-explore.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-24">
                <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                    <div class="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                        <div>
                            <div>
                                <span class="h-12 w-12 rounded-md flex items-center justify-center bg-aftrBlue">
                                    <TruckIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                </span>
                            </div>
                            <div class="mt-6">
                                <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">Create Your Own Repo
                                </h2>

                                <p class="mt-4 flex flex-nowrap gap-2 text-lg text-gray-500"><img class="w-6"
                                        src="../../assets/overview-bullet-1.svg" /> Make it a Single Owner Repo</p>
                                <ul>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Make sure you connect
                                        your wallet with ArConnect.</li>
                                </ul>
                                <p class="mt-4 flex flex-nowrap gap-2 text-lg text-gray-500"><img class="w-6"
                                        src="../../assets/overview-bullet-2.svg" /> Add Some Tokens</p>
                                <ul>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Transfer assets from
                                        your wallet to the repo</li>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Only assets that
                                        support cross contract communication can be added</li>
                                </ul>
                                <p class="mt-4 flex flex-nowrap gap-2 text-lg text-gray-500"><img class="w-6"
                                        src="../../assets/overview-bullet-3.svg" /> Make a Change and Watch it Change on
                                    the Next Block</p>
                                <ul>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Editing is available
                                        if you're a member of the repo</li>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Single Owner vs. DAO
                                        Owned</li>
                                    <li class="text-sm text-gray-900 pl-16">Changes to a Single Owner repo occur
                                        during the next block after the change. Changes to a DAO Owned repo propose a
                                        vote for the members of the repo to vote on.</li>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Make a change and
                                        notice that a vote is proposed</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                        <div class="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                            <img class="w-full lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                                src="../../assets/overview-test-create.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import {
    ChartPieIcon,
    ClipboardCheckIcon,
    CashIcon,
    TruckIcon,
    PencilAltIcon,
} from "@heroicons/vue/outline";

import vertoInitState from "./../../testnet/contracts/vertoInitState.json";
//import * as vertoSource from "./../../testnet/contracts/vertoSource.js?raw";
import arDriveInitState from "./../../testnet/contracts/arDriveInitState.json";
//import * as arDriveSource from "./../../testnet/contracts/arDriveSource.js?raw";
import aftrAlquipaInitState from "./../../testnet/contracts/aftrAlquipaInitState.json?raw";
import aftrBlueHorizonInitState from "./../../testnet/contracts/aftrBlueHorizonInitState.json?raw";
import aftrChillinInitState from "./../../testnet/contracts/aftrChillinInitState.json?raw";
import aftrSourcePlayground from "./../../testnet/contracts/aftrSourcePlayground.js?raw";
import aftrInitStatePlayground from "./../../testnet/contracts/aftrInitStatePlayground.json?raw";
import playTokenSrc from "./../../testnet/contracts/playTokenSrc.js?raw";
import playTokenInitState from "./../../testnet/contracts/playTokenInitState.json?raw";
import VoteSimulator from "./../repo/VoteSimulator.vue";
import { warpRead, warpWrite, arweaveInit, warpCreateContract, warpCreateFromTx, upload, dispatch, post } from './../utils/warpUtils.js';
import { mapGetters } from "vuex";
import Transaction from 'arweave/node/lib/transaction';

const initProcess = [
    {
        id: 1,
        name: "Validate",
        description: "Ensure the test node is ready for playing.",
        icon: ClipboardCheckIcon,
    },
    {
        id: 2,
        name: "Give You Assets",
        description:
            "In order to add tokens to AFTR Repos, you'll need some tokens in the Playground.",
        icon: CashIcon,
    },
    {
        id: 3,
        name: "Create AFTR Repos",
        description: "Ensure AFTR Repos are ready for your session.",
        icon: TruckIcon,
    },
    {
        id: 4,
        name: "Give You Repo Membership",
        description:
            "As a repo member, you'll be able to experience the governance process.",
        icon: ChartPieIcon,
    },
];

export default {
    components: { PencilAltIcon, TruckIcon, VoteSimulator },
    data() {
        return {
            /** Smartweave variables */
            tagProtocol: import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL,
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            arweaveMine: import.meta.env.VITE_MINE,
            gatewayUrl: import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/",
            mineUrl: this.gatewayUrl + "mine",
            env: import.meta.env.VITE_ENV,
            arweave: {},
            /** */

            // Saved logos on Arweave
            logoVint: "https://arweave.net/CpuwI6XuBk2bFMYT7q5N8XuiSKzkOEWJP2n1CPDmNX4",
            logoArhd: "https://arweave.net/hxVzJL2uq41ncSt8PgR-5UDNR8tmLqO9JSisgNq7j10",
            logoBlue: "https://arweave.net/KM66oKFLF60UrrOgSx5mb90gUd2v4i0T9RIcK9mfUiA",
            logoChillin: "https://arweave.net/aM7YfRnd97mTGLn_3vjLfWp2TgtBKRyDsBnlDhA1e-s",
            logoAlquipa: "https://arweave.net/nZr8RcHYY2XXloKcxtgrbssBdpvz6C2ifM92QvkYkgg",

            // Need to save IDs in order to update the repos' tokens
            logoVintId: "",
            logoArhdId: "",
            getMyRepo: false,
            isLoading: "Loading....",
            showVoteSimulator: false,

            addr: "",
        };
    },
    computed: {
        ...mapGetters(["arConnected", "arConnectConfig", "getTestLaunchFlag", "getAftrContractSources", "getActiveAddress", "getActiveWallet"]),
    },
    methods: {
        voteSimulatorTest() {
            this.showVoteSimulator = true;
        },
        closeModal() {
            this.showVoteSimulator = false;
        },
        route2Repos() {
            this.$router.push("../repos");
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

                if (this.arweave && Object.keys(this.arweave).length === 0 && Object.getPrototypeOf(this.arweave) === Object.prototype) {
                    this.arweave = arweaveInit();
                }
                if (this.addr === "") {
                    this.addr = await this.arweave.wallets.jwkToAddress("use_wallet");
                }
                await this.mintAr(this.addr, this.arweave);
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
        routeUser(site) {
            if (site === "PROD") {
                window.location.href = import.meta.env.VITE_AFTR_PROD;
            }
        },
        async mintAr(addr, arweave) {
            const server = this.arweaveProtocol + "://" + this.arweaveHost + ":" + this.arweavePort;
            const route = "/mint/" + addr + "/10000000000000"; // Amount in Winstons

            this.$log.info("OverviewTest : mintAr :: ", server, route);

            this.$log.info("OverviewTest : mintAr :: ", "WALLET: " + addr);
            let balance;
            try {
                balance = await arweave.wallets.getBalance(addr);
                if (balance < 10000000000000) {
                    const mintRes = await fetch(server + route);
                    balance = await arweave.wallets.getBalance(addr);
                }
            } catch (error) {
                this.$swal({
                    icon: "error",
                    html: "Wallet balance having some issues."
                });
            }
            this.$log.info("OverviewTest : mintAr :: ", "Balance for " + addr + ": " + balance.toString());
        },
        async initPlayground() {
            await this.$store.dispatch('arConnect');

            try {
                this.getMyRepo = true;
                // Check to see if system is ready for for Test Launch
                this.$store.dispatch("setTestLaunchConfigState");

                if (!this.$store.getters.getTestLaunchConfigState) {
                    this.$swal({
                        icon: "error",
                        html: "Please connect your Arweave wallet with ArConnect.",
                    });
                    return false;
                }

                // Check for correct ArConnect settings                
                if (this.env === "DEV") {
                    if (
                        this.arConnectConfig.host != this.arweaveHost ||
                        this.arConnectConfig.protocol != this.arweaveProtocol ||
                        this.arConnectConfig.port != this.arweavePort
                    ) {
                        this.$swal({
                            icon: "error",
                            html: "Your ArConnect Gateway Config is pointing to the wrong gateway.  Please change the gateway to localhost.",
                        });
                        this.$store.dispatch("arDisconnect");
                        return false;
                    }
                } else if (this.env === "TEST") {
                    if (
                        this.arConnectConfig.host != this.arweaveHost ||
                        this.arConnectConfig.protocol != this.arweaveProtocol ||
                        this.arConnectConfig.port != this.arweavePort
                    ) {
                        this.$swal({
                            icon: "error",
                            html: "Your ArConnect Gateway Config is pointing to the wrong gateway.  Please change the gateway to www.arweave.run.",
                        });
                        this.$store.dispatch("arDisconnect");
                        return false;
                    }
                } else if (this.env === "DEV1") {
                    // Do nothing
                } else {
                    // Situation should never occur :)
                    this.$log.info("OverviewTest : init :: ", "Situation should never occur");
                    return false;
                }

                // Initializing Arweave
                if (this.arweave && Object.keys(this.arweave).length === 0 && Object.getPrototypeOf(this.arweave) === Object.prototype) {
                    this.arweave = arweaveInit();
                }

                const use_wallet = "use_wallet";
                if (this.addr === "") {
                    this.addr = await this.arweave.wallets.jwkToAddress(use_wallet);
                }

                this.$swal({
                    icon: "info",
                    html: "Checking user wallet.",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        this.$swal.showLoading()
                    },
                });

                this.$log.info("OverviewTest : init :: ", "1. Ensure wallet has some AR to make transactions");

                if (this.env === "DEV") {
                    await this.mintAr(this.addr, this.arweave);
                }

                let aftrContractSrcId = "";
                this.$swal({
                    icon: "info",
                    html: "Finding AFTR contract.",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        this.$swal.showLoading()
                    },
                });
                this.$log.info("OverviewTest : init :: ", "2. AFTR Base Contract");

                let query = `query($cursor: String) {
                            transactions(
                                tags: [ { name: "Protocol", values: ["${import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL}"] } ]
                                after: $cursor
                            )
                            { pageInfo { hasNextPage }
                                edges { cursor node { id } }
                            }
                        }`;

                let response = await this.runQuery(this.arweave, query, "Failure on looking up AFTR Repos. ");
                let numAftrRepos = 0;
                if (response) {
                    numAftrRepos = response.data.data.transactions.edges.length;
                }

                let contractSource;
                let initState;
                let contractTxId = "";
                if (numAftrRepos > 0) {
                    // Want to grab the first AFTR repo b/c we can ensure that won't be an errored repo
                    aftrContractSrcId = await this.getContractSourceId(response.data.data.transactions.edges[numAftrRepos - 1].node.id);
                } else {
                    // contractTxId = await createContract(arweave, use_wallet, aftrSourcePlayground, JSON.stringify(aftrInitStatePlayground));
                    // this.$log.info("OverviewTest : init :: ", "*** CREATED SOURCE CONTRACT: " + contractTxId);
                    // if (Boolean(this.arweaveMine)) {
                    //     await fetch(this.mineUrl);
                    // }
                    // aftrContractSrcId = await this.getContractSourceId(arweave, contractTxId);

                    // Using Warp
                    let txIds = await warpCreateContract(
                        aftrSourcePlayground,
                        aftrInitStatePlayground,
                        [{ name: "Title", value: "AFTR" }],
                        true
                    );
                    contractTxId = txIds.contractTxId;
                    aftrContractSrcId = txIds.srcTxId;
                }

                const csArray = this.getAftrContractSources;
                if (!csArray.find(srcId => srcId === aftrContractSrcId)) {
                    this.$store.commit("addAftrContractSource", aftrContractSrcId);
                }

                this.$log.info("OverviewTest : init :: ", "AFTR Source ID: " + aftrContractSrcId);
                this.$log.info("OverviewTest : init :: ", "3. Sample PSTs");

                this.isLoading = "Initializing PSTs";
                this.$swal({
                    icon: "info",
                    html: "Initializing PSTs",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        this.$swal.showLoading()
                    },
                });

                // Ensure that PST Source State's have balance from user so that they can transfer tokens into the new AFTR repos
                const userAddr = this.$store.getters.getActiveAddress;
                vertoInitState.balances[userAddr] = 100000;
                arDriveInitState.balances[userAddr] = 100000;

                let vintContractId = await this.createSampleAftrRepo(this.arweave, use_wallet, aftrContractSrcId, "pst", "Vint", "VINT", this.logoVint, JSON.stringify(vertoInitState));
                this.$log.info("OverviewTest : init :: ", "VINT: " + vintContractId);

                let arhdContractId = await this.createSampleAftrRepo(this.arweave, use_wallet, aftrContractSrcId, "pst", "arHD", "ARHD", this.logoArhd, JSON.stringify(arDriveInitState));
                this.$log.info("OverviewTest : init :: ", "ARHD: " + arhdContractId);

                this.$log.info("OverviewTest : init :: ", "4. Sample AFTR Repos");

                this.isLoading = "Creating sample AFTR Repos.";
                this.$swal({
                    icon: "info",
                    html: "Creating sample AFTR Repos.",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        this.$swal.showLoading()
                    },
                });

                let chillContractId = await this.createSampleAftrRepo(this.arweave, use_wallet, aftrContractSrcId, "aftr", "Chillin Treasury", "CHILL", this.logoChillin, aftrChillinInitState, vintContractId, arhdContractId);
                this.$log.info("OverviewTest : init :: ", "CHILL: " + chillContractId);

                let alqpaContractId = await this.createSampleAftrRepo(this.arweave, use_wallet, aftrContractSrcId, "aftr", "Alquipa", "ALQPA", this.logoAlquipa, aftrAlquipaInitState, vintContractId, arhdContractId);
                this.$log.info("OverviewTest : init :: ", "ALQPA: " + alqpaContractId);

                let blueContractId = await this.createSampleAftrRepo(this.arweave, use_wallet, aftrContractSrcId, "aftr", "Blue Horizon", "BLUE", this.logoBlue, aftrBlueHorizonInitState, vintContractId, arhdContractId);
                this.$log.info("OverviewTest : init :: ", "BLUE: " + blueContractId);

                this.$log.info("OverviewTest : init :: ", "5. Add user to Blue Horizon Repo");

                let input = {};
                // Only add if user is not already there
                this.isLoading = "Checking balances on Blue Horizon repo.";

                this.$swal({
                    icon: "success",
                    html: "Ensuring Playground is ready for testing.",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        this.$swal.showLoading()
                    },
                });
                this.$log.info("OverviewTest : init :: ", "Reading Blue Horizon contract.");

                // Use Warp to read the contract
                const cachedValue = await warpRead(blueContractId);
                let blueVeh = cachedValue.state;

                if (blueVeh == undefined || !(this.addr in blueVeh.balances)) {
                    input = {
                        function: "plygnd-mint",
                        qty: 100000,
                    };
                    // Calls mint function on Blue Horizon contract. If user already has a balance, nothing happens.
                    this.$log.info("OverviewTest : init :: ", "Blue Horizon Interact Write.");
                    contractTxId = await warpWrite(blueContractId, input);
                    this.$log.info("OverviewTest : init :: ", "Blue Horizon Contract Write: " + contractTxId);
                }

                // Give user's wallet PSTs
                input = {
                    function: "plygnd-mint",
                    qty: 100000,
                };
                this.$log.info("OverviewTest : init :: ", "Give user's wallet PSTs.");
                contractTxId = await warpWrite(vintContractId, input);
                this.$log.info("OverviewTest : init :: ", "User Wallet VINT: " + contractTxId);

                contractTxId = await warpWrite(arhdContractId, input);
                this.$log.info("OverviewTest : init :: ", "User Wallet ARHD: " + contractTxId);

                /***
                 * Look at all PSTs and save the ones where the user has a balance.
                 * This doesn't need to be done in PROD or TEST b/c the Verto Cache is used
                 * and the wallet.psts are built during the Arconnection.
                 */
                if (this.env === "DEV" || import.meta.env.VITE_BUILD_PSTS) {
                    //await this.buildWalletPsts(arweave, aftrContractSrcId, userAddr);
                    await this.$store.dispatch("arRefresh", true);
                }
                this.$swal.close();
                this.$router.push("repos");
            } catch (error) {
                this.$swal({
                    icon: "error",
                    html: error,
                });
            }
        },



        async init() {
            await this.$store.dispatch('arConnect');

            try {
                this.getMyRepo = true;
                // Check to see if system is ready for for Test Launch
                this.$store.dispatch("setTestLaunchConfigState");

                if (!this.$store.getters.getTestLaunchConfigState) {
                    this.$swal({
                        icon: "error",
                        html: "Please connect your Arweave wallet with ArConnect.",
                    });
                    return false;
                }

                // Check for correct ArConnect settings                
                if (this.env === "DEV") {
                    if (
                        this.arConnectConfig.host != this.arweaveHost ||
                        this.arConnectConfig.protocol != this.arweaveProtocol ||
                        this.arConnectConfig.port != this.arweavePort
                    ) {
                        this.$swal({
                            icon: "error",
                            html: "Your ArConnect Gateway Config is pointing to the wrong gateway.  Please change the gateway to localhost.",
                        });
                        this.$store.dispatch("arDisconnect");
                        return false;
                    }
                } else if (this.env === "TEST") {
                    if (
                        this.arConnectConfig.host != this.arweaveHost ||
                        this.arConnectConfig.protocol != this.arweaveProtocol ||
                        this.arConnectConfig.port != this.arweavePort
                    ) {

                        this.$swal({
                            icon: "error",
                            html: "Your ArConnect Gateway Config is pointing to the wrong gateway.  Please change the gateway to www.arweave.run.",
                        });
                        this.$store.dispatch("arDisconnect");
                        return false;
                    }
                } else if (this.env === "DEV1") {
                    // Do nothing
                } else {
                    // Situation should never occur :)
                    this.$log.info("OverviewTest : init :: ", "Situation should never occur");
                    return false;
                }

                // Initializing Arweave
                if (this.arweave && Object.keys(this.arweave).length === 0 && Object.getPrototypeOf(this.arweave) === Object.prototype) {
                    this.arweave = arweaveInit();
                }

                const use_wallet = "use_wallet";
                if (this.addr === "") {
                    this.addr = await this.arweave.wallets.jwkToAddress(use_wallet);
                }

                /***
                 * Look at all PSTs and save the ones where the user has a balance.
                 * This doesn't need to be done in PROD or TEST b/c the Verto Cache is used
                 * and the wallet.psts are built during the Arconnection.
                 */
                if (this.env === "DEV" || import.meta.env.VITE_BUILD_PSTS) {
                    // Get the AFTR Contract Source ID for Prod
                    if (import.meta.env.VITE_ENV === "TEST") {
                        this.$store.commit("setAftrContractSources");
                    }
                    await this.$store.dispatch("arRefresh", true);
                }
                this.$swal.close();
                this.$router.push("repos");
            } catch (error) {
                this.$swal({
                    icon: "error",
                    html: error,
                });
            }
        },




        async runQuery(arweave, query, errorMsg) {
            try {
                let response = await arweave.api.post("graphql", { query: query, });

                if (response.status !== 200) {
                    response = null;
                }

                return response;
            } catch (e) {
                this.$log.error("OverviewTest : runQuery :: ", errorMsg + e);
            }
        },
        /*** BEGIN SCRIPT FUNCTIONS */
        async getContractSourceId(txID) {
            if (this.env === "DEV") {
                const route = this.gatewayUrl + "tx/" + txID;
                const response = await fetch(route).then(res => res.json());
                const tx = new Transaction((await response));

                let allTags = [];
                tx.get("tags").forEach((tag) => {
                    let key = tag.get("name", { decode: true, string: true });
                    let value = tag.get("value", { decode: true, string: true });
                    allTags.push({ key, value });
                });
                for (let i = 0; i < allTags.length; i++) {
                    this.$log.info("OverviewTest : getContractSourceId :: ", "allTags[i].key === 'Contract-Src'", allTags[i].key === "Contract-Src");
                    if (allTags[i].key === "Contract-Src") {
                        return allTags[i].value;
                    }
                }
            } else {
                const route = import.meta.env.VITE_TX_GATEWAY + "?txID=" + contractId + this.env === "TEST" ? "&testnet=true" : "";
                const response = await fetch(route);
                if (!response.ok) {
                    this.$log.error("OverviewTest : getContractSourceId :: ", "ERROR fetching transaction from gateway.");
                    return;
                }
                const data = await response.json();
                return data.srcTxId;
            }
        },
        async createSampleAftrRepo(arweave, wallet, aftrSourceId, type = "aftr", name, ticker, logoUrl, initStatePath, vintContractId = "", arhdContractId = "") {
            try {
                let query = "";

                if (type === "aftr") {
                    query = `query($cursor: String) {
                        transactions(
                            tags: [
                                { name: "Protocol", values: ["${import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL}"] },
                                { name: "Aftr-Playground", values: ["${ticker}"] },
                                { name: "Contract-Src", values: ["${aftrSourceId}"] }                               
                            ]
                            after: $cursor
                        )
                        { pageInfo { hasNextPage }
                            edges { cursor node { id } }
                        }
                    }`;
                } else {
                    query = `query($cursor: String) {
                        transactions(
                            tags: [ 
                                { name: "Aftr-Playground", values: ["${ticker}"] },
                                { name: "Aftr-Playground-Type", values: ["PST"] },
                                { name: "Contract-Src", values: ["${aftrSourceId}"] }
                        ]
                            after: $cursor
                        )
                        { pageInfo { hasNextPage }
                            edges { cursor node { id } }
                        }
                    }`;
                }

                let response = await this.runQuery(arweave, query, "Failure on looking up " + name);
                let numAftrRepos = 0;
                let res = response.data.data.transactions.edges;
                this.$log.info("OverviewTest : createSampleAftrRepo :: ", "query", query, res);
                if (res.length > 0) {
                    numAftrRepos = response.data.data.transactions.edges.length;
                }
                this.$log.info("OverviewTest : createSampleAftrRepo :: ", "numAftrRepos", numAftrRepos);
                if (numAftrRepos === 0) {
                    let contractTxId = await this.createSampleContract(aftrSourceId, initStatePath, type, ticker);

                    console.log(JSON.stringify(await warpRead(contractTxId)));
                    this.$log.info("OverviewTest : createSampleAftrRepo :: ", "contractTxId", contractTxId);
                    // if (Boolean(this.arweaveMine)) {
                    //     await fetch(this.mineUrl);
                    // }
                    // Add the logo
                    const logoId = await this.getLogoId(arweave, wallet, name, ticker, logoUrl, type);
                    this.$log.info("OverviewTest : createSampleAftrRepo :: ", "LOGO for " + name + ": " + logoId);
                    // JOE here we didn't get the value of logoId. But in contract repo we get an value

                    let input = {
                        function: "plygnd-addLogo",
                        logo: logoId,
                    };

                    let res = await warpWrite(contractTxId, input);
                    this.$log.info("OverviewTest : createSampleAftrRepo :: ", "LOGO ADD for " + name + ": " + res);

                    await this.updateTokensLogos(contractTxId, this.logoVintId, this.logoArhdId);

                    // Transfer tokens to AFTR repos
                    if (type === "aftr") {
                        let qtyVint = 0;
                        let qtyArhd = 0;

                        // Just create some varying quantities
                        if (ticker === "ALQPA") {
                            qtyVint = 17000;
                            qtyArhd = 5000;
                        } else if (ticker === "CHILL") {
                            qtyVint = 1000;
                            qtyArhd = 15000;
                        } else {
                            qtyVint = 10000;
                            qtyArhd = 25000;
                        }
                        let transRes = await this.transferTokens(contractTxId, vintContractId, qtyVint);
                        transRes = await this.transferTokens(contractTxId, arhdContractId, qtyArhd);
                    }

                    return contractTxId;
                } else {
                    return response.data.data.transactions.edges[0].node.id;
                }
            } catch (error) {
                this.$swal({
                    icon: "error",
                    html: error,
                });
            }
        },
        async updateTokensLogos(contractId, logoVint, logoArhd) {
            let input = {
                function: "plygnd-updateTokens",
                logoVint: logoVint,
                logoArhd: logoArhd,
            };
            let res = await warpWrite(contractId, input);
        },
        async createSampleContract(aftrId, initState, type = "aftr", name) {
            let swTags = [];
            let aftr = false;
            if (type === "aftr") {
                aftr = true;
                swTags = [
                    { name: "Aftr-Playground", value: name },
                    { name: "Title", value: name }
                ];
            } else {
                swTags = [
                    { name: "Aftr-Playground", value: name },
                    { name: "Aftr-Playground-Type", value: "PST" },
                    { name: "Implements", value: ["ANS-110"] },
                    { name: "Title", value: name },
                    { name: "Type", value: ["token"] }
                ];
            }
            const txIds = await warpCreateFromTx(initState, aftrId, swTags, aftr);
            return txIds.contractTxId;

        },
        async getLogoId(arweave, wallet, name, ticker, logoUrl, type = "aftr") {
            this.$log.info("OverviewTest : getLogoId :: ", name);
            // Gets logo for name.  If not found, uploads it.
            let tags = [];
            if (type === "aftr") {
                tags = `[ { name: "Aftr-Playground", values: ["${name}"] },  { name: "Content-Type", values: ["image/jpeg"] } ]`;
            } else {
                tags = `[ { name: "Aftr-Playground", values: ["${name}"] },  { name: "Content-Type", values: ["image/png"] } ]`;
            }
            let query = `
                query($cursor: String) {
                    transactions(
                        tags: ${tags}
                        after: $cursor
                    )
                    { pageInfo { hasNextPage }
                        edges { cursor node { id } }
                    }
                }
            `;
            let response = await this.runQuery(arweave, query, "Failure looking for " + name + " logo. ");
            let datalogo = response.data.data.transactions.edges;
            this.$log.info("OverviewTest : getLogoId :: ", "datalogo", datalogo);
            let logoId = "";
            if (datalogo.length > 0) {
                // let data = response.data.data.transactions.edges
                logoId = datalogo.length > 0 ? datalogo[0].node.id : datalogo;
            } else {
                // No logo found, so fetch logo from Arweave
                this.$log.info("OverviewTest : getLogoId :: ", "***logoUrl***", logoUrl);
                const response = await fetch(logoUrl);
                this.$log.info("OverviewTest : getLogoId :: ", "response", response);
                const imgBlob = await response.blob();
                this.$log.info("OverviewTest : getLogoId :: ", "imgBlob", imgBlob);
                // const imgByteArray = await this.getAsByteArray(imgBlob);

                // const tx = await arweave.createTransaction({ data: imgByteArray, }, wallet);

                // tx.addTag("Content-Type", imgBlob.type);
                // tx.addTag("User-Agent", "AFTR.Market");
                // tx.addTag("Aftr-Playground", name);

                // await arweave.transactions.sign(tx, wallet);
                // await arweave.transactions.post(tx);
                // logoId = tx.id;

                // if (Boolean(this.arweaveMine)) {
                //     await fetch(this.mineUrl);
                // }

                await upload(imgBlob)
                    .then((tx) => {
                        logoId = tx.assetId;
                        dispatch(tx)
                    })
                    .then((data) => {
                        post(data)
                    })
            }
            if (name === "Vint") {
                this.logoVintId = logoId;
            } else if (name === "arHD") {
                this.logoArhdId = logoId;
            }
            this.$log.info("OverviewTest : getLogoId :: ", "logoId", logoId);
            return logoId;
        },
        async getAsByteArray(file) {
            return new Uint8Array(await this.readFile(file));
        },
        readFile(file) {
            // Thanks to https://dilshankelsen.com/convert-file-to-byte-array/
            return new Promise((resolve, reject) => {
                // Create file reader
                let reader = new FileReader();

                // Register event listeners
                reader.addEventListener("loadend", (e) => {
                    resolve(e.target.result);
                });
                reader.addEventListener("error", reject);

                // Read file
                reader.readAsArrayBuffer(file);
            });
        },
        async transferTokens(vehContractId, pstContractId, qty) {
            const inputAllow = {
                function: "allow",
                target: vehContractId,
                qty: qty,
            };
            const allowTxId = await warpWrite(pstContractId, inputAllow);
            this.$log.info("OverviewTestDepositTokens : warpWrite :: ", "Allow Function Tx = " + allowTxId);


            const inputDeposit = {
                function: "deposit",
                tokenId: pstContractId,
                qty: qty,
                txID: allowTxId,
            };

            const depTxId = await warpWrite(vehContractId, inputDeposit);
            this.$log.info("OverviewTestDepositTokens : warpWrite :: ", "Deposit Function Tx = " + depTxId);
        },
    },
    setup() {
        return {
            initProcess,
        };
    },
};
</script>
