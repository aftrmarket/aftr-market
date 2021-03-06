<template>
    <main class="-mt-32">
        <div class="pt-10 bg-aftrDarkGrey sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div class="mx-auto max-w-7xl lg:px-8">
                <div class="lg:grid lg:grid-cols-2 lg:gap-8">
                    <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                        <div class="">
                            <h1 class="mt-4 text-4xl tracking-tight font-bold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-5xl">
                                <span class="block">Welcome to</span>
                                <span class="block text-aftrYellow">AFTR Playground</span>
                            </h1>
                            <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                The purpose of the Playground is to show you how to build your AFTR Vehicles without having to transfer your current Arweave assets.
                                On the Playground, you'll be given Arweave assets in the form of Profit Sharing Tokens as well as AR (testnet AR, not real AR 🤣)
                                so that you can create your own vehicles and see how to manage and govern them.
                            </p>
                            <div class="mt-10 sm:mt-12">
                                <form action="#" class="sm:max-w-xl sm:mx-auto lg:mx-0">
                                    <div class="sm:flex">
                                        <div class="mt-3 sm:mt-0 sm:ml-3">
                                            <button @click.prevent="init" type="submit" class="block w-full py-3 px-4 rounded-md shadow bg-indigo-300 text-white font-medium hover:bg-aftrBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">Launch</button>
                                        </div>
                                        <div class="mt-3 sm:mt-0 sm:ml-3">
                                            <button @click.prevent="routeUser('PROD')" type="submit" class="block w-full py-3 px-4 rounded-md shadow bg-indigo-300 text-white font-medium hover:bg-aftrBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">Back to MAINNET</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="mt-12 -mb-16 sm:-mb-48 lg:relative">
                        <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                            <img class="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none" src="../../assets/overview-test-launch.png" alt="" />
                        </div>
                    </div>
                    <div class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                        For more information, see below 👇
                    </div>
                </div>
            </div>
        </div>

        <div class="py-6 bg-gray-50 overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
                <div class="text-base max-w-prose mx-auto lg:max-w-none">
                    <h2 class="text-base text-aftrBlue font-semibold tracking-wide uppercase">Instructions</h2>
                    <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">What the Heck is an AFTR Vehicle?</p>
                </div>

                <div class="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                    <div class="relative lg:row-start-1 lg:col-start-2">
                        <div class="aspect-w-12 aspect-h-7 lg:aspect-none">
                            <!--<img class="rounded-lg shadow-lg object-cover object-center" src="../../assets/overview-test-whatis.svg" alt="" width="1184" height="1376" />-->
                            <img class="object-cover object-center" src="../../assets/overview-test-whatis.svg" alt="" width="1184" height="1376" />
                        </div>
                    </div>
                    <div class="mt-8 lg:mt-0">
                        <div class="text-base max-w-prose mx-auto lg:max-w-none">
                            <p class="text-lg text-gray-500">
                                AFTR Market allows you to create and group Arweave assets together inside of a “vehicle.” By grouping these assets together on-chain,
                                you can then put governance around them to manage their profit streams. Furthermore, you are essentially fractionalizing these assets
                                because when you setup DAO members on your AFTR vehicle, the profit streams will flow into the vehicle to those members proportionately.
                                This is because when you transfer Arweave assets to an AFTR Vehicle, the AFTR Vehicle becomes the balance holder on the asset contract.
                                Stated another way, if you create an AFTR Vehicle and put one of your Arweave PSTs inside of the vehicle, you transferred the asset from
                                your wallet to the Permaweb for safe keeping. <br /><br />

                                There are certainly more reasons to use AFTR Vehicles, every wallet holder containing Arweave assets such as PSTs or NFTs should consider
                                securing their assets in a vehicle. Also note that when you create an AFTR Vehicle, you are minting a new asset on the Permaweb which can be traded as well.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="py-4 bg-gray-50 overflow-hidden lg:py-4">
                <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                    <h3 class="text-2xl font-extrabold text-gray-900 text-right tracking-tight sm:text-3xl">What Happens When I Press the Launch Button?</h3>
                    <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">

                        <div class="lg:col-start-2">

                            <p class="mt-3 text-lg text-gray-500">
                                AFTR Playground uses a test gateway supported by the <a href="https://verto.exchange" target="_blank" style="color:#6C8CFF">Verto Exchange</a> team. As such, the test instance will be periodically refreshed. When you press the Launch button,
                                AFTR Playground checks to make sure it has what it needs to ensure that you can properly play in the our sandbox. So, note that any vehicles that you create in the Playground
                                will disappear upon a test gateway refresh.
                            </p>

                            <dl class="mt-10 space-y-10">
                                <div v-for="item in initProcess" :key="item.id" class="relative">
                                    <dt>
                                        <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-aftrBlue text-white">
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
                            <svg class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden" width="784" height="404" fill="none" viewBox="0 0 784 404" aria-hidden="true">
                                <defs>
                                    <pattern id="e80155a9-dfde-425a-b5ea-1f6fadd20131" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                                    </pattern>
                                </defs>
                                <rect width="784" height="404" fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)" />
                            </svg>
                            <img class="relative mx-auto" width="490" src="../../assets/overview-test-process.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="relative bg-gray-50 pt-16 pb-32 overflow-hidden">
            <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                <h3 class="pb-4 text-2xl font-extrabold text-gray-900 text-left tracking-tight sm:text-3xl">What to do in the AFTR Playground</h3>
                <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                    <div class="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                        <div>
                            <div>
                                <span class="h-12 w-12 rounded-md flex items-center justify-center bg-aftrBlue">
                                    <PencilAltIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                </span>
                            </div>
                            <div class="mt-6">
                                <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">Explore an AFTR Vehicle</h2>
                                <p class="mt-4 flex flex-nowrap gap-2 text-lg text-gray-500"><img class="w-6" src="../../assets/overview-bullet-1.svg" /> Click on the Blue Horizon vehicle</p>
                                <ul>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Make sure you connect your wallet with ArConnect.</li>
                                </ul>
                                <p class="mt-4 flex flex-nowrap gap-2 text-lg text-gray-500"><img class="w-6" src="../../assets/overview-bullet-2.svg" /> Enable Editing</p>

                                <ul>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Editing is available if you're a member of the vehicle</li>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Single Owner vs. DAO Owned</li>
                                    <li class="text-sm text-gray-900 pl-16">Changes to a Single Owner vehicle occur during the next block after the change. Changes to a DAO Owned vehicle propose a vote for the members of the vehicle to vote on.</li>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Make a change and notice that a vote is proposed</li>
                                </ul>

                                <p class="mt-4 flex flex-nowrap gap-2 text-lg text-gray-500"><img class="w-6" src="../../assets/overview-bullet-3.svg" /> Add Some Tokens</p>
                                <ul>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Transfer assets from your wallet to the vehicle</li>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Only assets that support cross contract communication can be added</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div class="mt-12 sm:mt-16 lg:mt-0">
                        <div class="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                            <img class="w-full lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none" src="../../assets/overview-test-explore.svg" alt="" />
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
                                <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">Create Your Own Vehicle</h2>

                                <p class="mt-4 flex flex-nowrap gap-2 text-lg text-gray-500"><img class="w-6" src="../../assets/overview-bullet-1.svg" /> Make it a Single Owner Vehicle</p>
                                <ul>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Make sure you connect your wallet with ArConnect.</li>
                                </ul>
                                <p class="mt-4 flex flex-nowrap gap-2 text-lg text-gray-500"><img class="w-6" src="../../assets/overview-bullet-2.svg" /> Add Some Tokens</p>
                                <ul>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Transfer assets from your wallet to the vehicle</li>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Only assets that support cross contract communication can be added</li>
                                </ul>
                                <p class="mt-4 flex flex-nowrap gap-2 text-lg text-gray-500"><img class="w-6" src="../../assets/overview-bullet-3.svg" /> Make a Change and Watch it Change on the Next Block</p>
                                <ul>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Editing is available if you're a member of the vehicle</li>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Single Owner vs. DAO Owned</li>
                                    <li class="text-sm text-gray-900 pl-16">Changes to a Single Owner vehicle occur during the next block after the change. Changes to a DAO Owned vehicle propose a vote for the members of the vehicle to vote on.</li>
                                    <li class="text-base text-gray-500 pl-8 list-disc list-inside">Make a change and notice that a vote is proposed</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                        <div class="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                            <img class="w-full lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none" src="../../assets/overview-test-create.svg" alt="" />
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
import * as vertoSource from "./../../testnet/contracts/vertoSource.js";
import arDriveInitState from "./../../testnet/contracts/arDriveInitState.json";
import * as arDriveSource from "./../../testnet/contracts/arDriveSource.js";
import aftrAlquipaInitState from "./../../testnet/contracts/aftrAlquipaInitState.json";
import aftrBlueHorizonInitState from "./../../testnet/contracts/aftrBlueHorizonInitState.json";
import aftrChillinInitState from "./../../testnet/contracts/aftrChillinInitState.json";
import * as aftrSourcePlayground from "./../../testnet/contracts/aftrSourcePlayground.js";
import aftrInitStatePlayground from "./../../testnet/contracts/aftrInitStatePlayground.json";

import Arweave from "arweave";
import { mapGetters } from "vuex";
import request from 'supertest';
import { createContractFromTx, createContract, interactWrite, readContract } from 'smartweave';

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
            "In order to add tokens to AFTR Vehicles, you'll need some tokens in the Playground.",
        icon: CashIcon,
    },
    {
        id: 3,
        name: "Create AFTR Vehicles",
        description: "Ensure AFTR Vehicles are ready for your session.",
        icon: TruckIcon,
    },
    {
        id: 4,
        name: "Give You Vehicle Membership",
        description:
            "As a vehicle member, you'll be able to experience the governance process.",
        icon: ChartPieIcon,
    },
];

export default {
    components: { PencilAltIcon, TruckIcon },
    data() {
        return {
            /** Smartweave variables */
            tagProtocol: import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL,
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            arweaveMine: import.meta.env.VITE_MINE,
            /** */
            logoVint: "",
            logoArhd: ""
        };
    },
    computed: {
        ...mapGetters(["arConnected", "keyFile", "arConnectConfig", "getTestLaunchFlag"]),
    },
    methods: {
        routeUser(site) {
            if (site === "PROD") {
                window.location.href = import.meta.env.VITE_AFTR_PROD;
            }
        },
        setup() {
            return {
                initProcess,
            };
        },
        async init() {
            // Check to see if system is ready for for Test Launch
            this.$store.dispatch("setTestLaunchConfigState");

            if (!this.$store.getters.getTestLaunchConfigState) {
                alert("Please connect your Arweave wallet with ArConnect.");
                return false;
            }

            // Check for correct ArConnect settings
            if (import.meta.env.VITE_ENV === "DEV") {
                if (this.arConnectConfig.host != "localhost" || this.arConnectConfig.protocol != "http" || this.arConnectConfig.port != 1984) {
                    alert("Your Arweave Config is pointing to the wrong gateway.  Please check your config in ArConnect.");
                    return false;
                }
            } else if (import.meta.env.VITE_ENV === "TEST") {
                if (this.arConnectConfig.host != "www.arweave.run" || this.arConnectConfig.protocol != "https" || this.arConnectConfig.port != 443) {
                    alert("Your Arweave Config is pointing to the wrong gateway.  Please check your config in ArConnect.");
                    return false;
                }
            } else {
                // Situation should never occur :)
                return false;
            }
            
            let arweave = {};
            arweave = await Arweave.init({
                host: this.arweaveHost,
                port: this.arweavePort,
                protocol: this.arweaveProtocol,
                timeout: 20000,
                logging: true,
            });
             const mineUrl =
                    import.meta.env.VITE_ARWEAVE_PROTOCOL +
                    "://" +
                    import.meta.env.VITE_ARWEAVE_HOST +
                    ":" +
                    import.meta.env.VITE_ARWEAVE_PORT +
                    "/mine";

            let use_wallet;
            if (import.meta.env.VITE_ENV === "DEV") {
                if (this.keyFile.length) {
                    use_wallet = JSON.parse(this.keyFile);
                } else {
                    alert("Please attach your keyfile");
                    return false;
                }
            }
            this.$log.info("1. Ensure wallet has some AR to make transactions");

            const addr = await arweave.wallets.jwkToAddress(use_wallet);
            const server = this.arweaveProtocol + "://" + this.arweaveHost + ":" + this.arweavePort;
            const route = "/mint/" + addr + "/10000000000000"; // Amount in Winstons

            this.$log.info(server, route);

            this.$log.info("WALLET: " + addr);
            let balance = await arweave.wallets.getBalance(addr);
            if (balance < 10000000000000) {
                const mintRes = await request(server).get(route);
                balance = await arweave.wallets.getBalance(addr);
            }
            //correct
            this.$log.info("Balance for " + addr + ": " + balance.toString());
            let aftrContractSrcId = "";     
            
            this.$log.info("2. AFTR Base Contract");

            let query = `query($cursor: String) {
                            transactions(
                                tags: [ { name: "Protocol", values: ["${ import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL }"] } ]
                                after: $cursor
                            )
                            { pageInfo { hasNextPage }
                                edges { cursor node { id } }
                            }
                        }`;

            let response = await this.runQuery(arweave, query, "Failure on looking up AFTR Vehicles. ");
            let numAftrVehicles = 0;
            if (response) {
                numAftrVehicles = response.data.data.transactions.edges.length;
            }

            let contractSource;
            let initState;
            let contractTxId = "";
            if (numAftrVehicles > 0) {
                aftrContractSrcId = await this.getContractSourceId(arweave, response.data.data.transactions.edges[0].node.id);
            } else {
                contractTxId = await createContract(arweave, use_wallet,  new Uint8Array(aftrSourcePlayground), new Uint8Array(aftrInitStatePlayground));
                if(Boolean(this.arweaveMine)){                
                   await fetch(mineUrl);
                }
                aftrContractSrcId = await this.getContractSourceId(arweave, contractTxId);
            }
            this.$store.commit("setAftrContractSrcId", aftrContractSrcId);
            this.$log.info("AFTR Source ID: " + aftrContractSrcId);

            this.$log.info("3. Sample PSTs");

            let vintContractId = await this.createSampleAftrVehicle(arweave, use_wallet, aftrContractSrcId, "pst", "Vint", "VINT", new Uint8Array(vertoInitState));
            this.$log.info("VINT: " + vintContractId);

            let arhdContractId = await this.createSampleAftrVehicle(arweave, use_wallet, aftrContractSrcId, "pst", "arHD", "ARHD", new Uint8Array(arDriveSource));
            this.$log.info("ARHD: " + arhdContractId);

            this.$log.info("4. Sample AFTR Vehicles");

            let chillContractId = await this.createSampleAftrVehicle(arweave, use_wallet, aftrContractSrcId, "aftr", "Chillin Treasury", "CHILL", new Uint8Array(aftrChillinInitState));
            await this.updateTokensLogos(arweave, use_wallet, chillContractId, this.logoVint, this.logoArhd);
            this.$log.info("CHILL: " + chillContractId);

            let alqpaContractId = await this.createSampleAftrVehicle(arweave, use_wallet, aftrContractSrcId, "aftr", "Alquipa", "ALQPA", new Uint8Array(aftrAlquipaInitState));
            await this.updateTokensLogos(arweave, use_wallet, alqpaContractId, this.logoVint, this.logoArhd);
            this.$log.info("ALQPA: " + alqpaContractId);

            this.$log.info("this.logoVint, this.logoArhd",this.logoVint, this.logoArhd)
            let blueContractId = await this.createSampleAftrVehicle(arweave, use_wallet, aftrContractSrcId, "aftr", "Blue Horizon", "BLUE", new Uint8Array(aftrBlueHorizonInitState));
            await this.updateTokensLogos(arweave, use_wallet, blueContractId, this.logoVint, this.logoArhd);
            this.$log.info("BLUE: " + blueContractId);

            this.$log.info("5. Add user to Blue Horizon Vehicle");

            let input = {
                function: "plygnd-mint",
                qty: 100000
            };
            // Calls mint function on Blue Horizon contract. If user already has a balance, nothing happens.
            contractTxId = await interactWrite(arweave, use_wallet, blueContractId, input);
            
            if(Boolean(this.arweaveMine)){             
                await fetch(mineUrl);
            }

            this.$log.info("Blue Horizon Contract Write: " + contractTxId);
            
            input = {
                function: "plygnd-mint",
                qty: 100000
            };
            contractTxId = await interactWrite(arweave, use_wallet, vintContractId, input);
            this.$log.info("User Wallet VINT: " + contractTxId);

            contractTxId = await interactWrite(arweave, use_wallet, arhdContractId, input);
            this.$log.info("User Wallet ARHD: " + contractTxId);

            if(Boolean(this.arweaveMine)){                
                await fetch(mineUrl);
            }

            // this.$log.info(JSON.stringify(await readContract(arweave, blueContractId, undefined, true)));
            this.$router.push("vehicles");
        },
        async createAftrVehicle(arweave, wallet, aftrId, initState) {
            let swTags = [{ name: "Protocol", value: this.tagProtocol }];
            let contractTxId = await createContractFromTx(
                arweave,
                wallet,
                aftrId,
                new Uint8Array(initState),
                swTags
            );
            return contractTxId;
        },
        async runQuery(arweave, query, errorMsg) {
            try {
                let response = await arweave.api.post("graphql", {
                    query: query
                });

                if (response.status !== 200) {
                    response = null;
                }

                return response;
            } catch(e) {
                this.$log.error(errorMsg + e);
            }
        },
        /*** BEGIN SCRIPT FUNCTIONS */
        async getContractSourceId(arweave, txId) {
            let tx = await arweave.transactions.get(txId);
            let allTags = [];
            tx.get('tags').forEach(tag => {
                let key = tag.get('name', {decode: true, string: true});
                let value = tag.get('value', {decode: true, string: true});
                allTags.push({
                    key,
                    value
                });
            });
            for (let i = 0; i < allTags.length; i++) {
                this.$log.info("allTags[i].key === 'Contract-Src'", allTags[i].key === 'Contract-Src')
                if (allTags[i].key === 'Contract-Src') {
                    return allTags[i].value;
                }
            }
        },
        async  createSampleAftrVehicle(arweave, wallet, aftrSourceId, type = "aftr", name, ticker, initStatePath) {
        let query = "";
        
        const mineUrl =
                    import.meta.env.VITE_ARWEAVE_PROTOCOL +
                    "://" +
                    import.meta.env.VITE_ARWEAVE_HOST +
                    ":" +
                    import.meta.env.VITE_ARWEAVE_PORT +
                    "/mine";

        if (type === "aftr") {
            query = `query($cursor: String) {
                transactions(
                    tags: [
                        { name: "Protocol", values: ["${ import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL }"] },
                        { name: "Aftr-Playground", values: ["${ ticker }"] }
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
                        { name: "Aftr-Playground", values: ["${ ticker }"] },
                        { name: "Aftr-Playground-Type", values: ["PST"] }
                ]
                    after: $cursor
                )
                { pageInfo { hasNextPage }
                    edges { cursor node { id } }
                }
            }`;
        }
        
        let response = await this.runQuery(arweave, query, "Failure on looking up " + name);
        let numAftrVehicles = 0;
        this.$log.info("query" ,query,response)
        if (response) {
            numAftrVehicles = response.data.data.transactions.edges.length;
        }
        
        if (numAftrVehicles === 0) {
            let contractTxId = await this.createSampleContract(arweave, wallet, aftrSourceId, initStatePath, type, ticker);
            
            if(Boolean(this.arweaveMine)){                
                await fetch(mineUrl);
            }
            // Add the logo
            const logoId = await this.getLogoId(arweave, wallet, name, ticker, type);
            this.$log.info("LOGO for " + name + ": " + logoId);
            // JOE here we didn't get the value of logoId. But in contract repo we get an value 

            let input = {
                function: "plygnd-addLogo",
                logo: logoId
            };
            let res = await interactWrite(arweave, wallet, contractTxId, input);
            if(Boolean(this.arweaveMine)){                
                await fetch(mineUrl);
            }

            this.$log.info("LOGO ADD for " + name + ": " + res);
            
            return contractTxId;
        } else {
            return response.data.data.transactions.edges[0].node.id;
        }
        },
        async updateTokensLogos(arweave,wallet, contractId, logoVint, logoArhd) {
            const mineUrl =
                    import.meta.env.VITE_ARWEAVE_PROTOCOL +
                    "://" +
                    import.meta.env.VITE_ARWEAVE_HOST +
                    ":" +
                    import.meta.env.VITE_ARWEAVE_PORT +
                    "/mine";
            let input = {
                function: "plygnd-updateTokens",
                logoVint: logoVint,
                logoArhd: logoArhd
            };
            let res = await interactWrite(arweave, wallet, contractId, input);
            if(Boolean(this.arweaveMine)){                
                await fetch(mineUrl);
            }
        },
        async createSampleContract(arweave, wallet, aftrId, initState, type = "aftr", name) {
            let swTags = [];
            if (type === "aftr") {
                swTags = [
                    { name: 'Protocol', value:  import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL },
                    { name: 'Aftr-Playground', value:  name }
                ];
            } else {
                swTags = [
                    { name: 'Aftr-Playground', value:  name },
                    { name: 'Aftr-Playground-Type', value:  'PST' }
                ];
            }
            let contractTxId = await createContractFromTx(arweave, wallet, aftrId, initState, swTags);

            return contractTxId;
       },
       async getLogoId(arweave, wallet, name, ticker, type = "aftr") {
           this.$log.info("getLogoId", name)
            // Gets logo for name.  If not found, uploads it.
            let query
            if (type === "aftr") {
                query = `query($cursor: String) {
                transactions(
                    tags: [ { name: "Aftr-Playground", values: ["${name}"] },  { name: "Content-Type", values: ["image/jpeg"] } ]
                    after: $cursor
                )
                { pageInfo { hasNextPage }
                    edges { cursor node { id } }
                }
            }`;
            } else {
                query = `query($cursor: String) {
                transactions(
                    tags: [ { name: "Aftr-Playground", values: ["${name}"] },  { name: "Content-Type", values: ["image/png"] } ]
                    after: $cursor
                )
                { pageInfo { hasNextPage }
                    edges { cursor node { id } }
                }
            }`;
            }
           
            let response = await this.runQuery(arweave, query, "Failure looking for " + name + " logo. ");
            this.$log.info(response)
            let logoId = "";
            if (response) {
                let data = response.data.data.transactions.edges
                logoId =  data.length > 0 ? response.data.data.transactions.edges[0].node.id : response.data.data.transactions.edges;
            } else {
                /*** ON THE WEBSITE, USE THE SAME DEPLOY FILE CODE AS IN CREATE VEHICLE */
                // No logo found, so load logo
                let logoSrc = "";
                if (type === "aftr") {
                    logoSrc = "./../../testnet/assets/" + ticker.toLowerCase() + ".jpeg";  
                    
                    this.$log.info("logoSrc ",logoSrc)
                } else {
                    logoSrc = "./../../testnet/assets/" + ticker.toLowerCase() + ".png";

                    this.$log.info("logoSrc ",logoSrc)
                }
                this.$log.info("logoSrc ",logoSrc)
                const data = logoSrc
                // const data = await fsAsync.readFile(path.join(__dirname, logoSrc));
                const tx = await arweave.createTransaction(
                    { data }, 
                    wallet
                );
                if (type === "aftr") {
                    tx.addTag("Content-Type", "image/jpeg");
                } else {
                    tx.addTag("Content-Type", "image/png");
                }
                tx.addTag("Aftr-Playground", name);
                await arweave.transactions.sign(tx, wallet);
                await arweave.transactions.post(tx);
                logoId = tx.id;
                const mineUrl =
                    import.meta.env.VITE_ARWEAVE_PROTOCOL +
                    "://" +
                    import.meta.env.VITE_ARWEAVE_HOST +
                    ":" +
                    import.meta.env.VITE_ARWEAVE_PORT +
                    "/mine";
                await fetch(mineUrl);
            }
            if (name === "Vint") {
                this.logoVint = logoId;
            } else if (name === "arHD") {
                this.logoArhd = logoId;
            }
            this.$log.info("logoId",logoId)
            return logoId;
        }  
    },
    setup() {
        return {
            initProcess,
        };
    },
};
</script>
