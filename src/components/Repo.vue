<template>
    <div v-if="pageStatus === 'in-progress'">
        <repo-placeholder></repo-placeholder>
    </div>
    <div v-else>
        <repo-evolve v-if="showEvolveModal" @close="closeModal" :repoId="contractId">
        </repo-evolve>
        <main class="-mt-32">
            <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                <!-- Page header -->
                <div
                    class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                    <div class="flex items-center space-x-5">
                        <div class="flex-shrink-0">
                            <div class="relative">
                                <img class="h-16 w-16 rounded-full" :src="repoLogo" alt="">
                                <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
                            </div>
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold text-white">{{ repo.name }}</h1>
                            <p class="text-sm font-medium font-mono text-aftrYellow">
                                {{ contractId }}
                                <button v-clipboard="contractId" @click="showPopup">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="white" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                    </svg>
                                </button>


                                <!-- </div>
                            </div> -->


                            </p>
                        </div>
                    </div>
                    <div aria-live="assertive"
                        class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
                        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                            <transition enter-active-class="transform ease-out duration-300 transition"
                                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                                leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                                leave-to-class="opacity-0">
                                <div v-if="show"
                                    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div class="p-4">
                                        <div class="flex items-start">
                                            <div class="flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor"
                                                    class="w-6 h-6 bg-green-100">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                        class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <div
                        class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                        <label v-if="repo.evolveNeeded && allowEdits && !evolvePressedAlready"
                            class="py-1 pr-2 text-right text-4xl animate-pulse">👉</label>
                        <button v-if="repo.evolveNeeded && allowEdits && !evolvePressedAlready"
                            @click.prevent="evolveContract" type="submit"
                            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="pl-2">Evolve Contract</span>
                        </button>
                        <label v-if="repo.evolveNeeded && allowEdits && evolvePressedAlready"
                            class="pr-2 text-aftrRed flex items-center">Active Evolve Vote</label>
                        <button @click.prevent="viewRepos" type="submit"
                            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                                </path>
                            </svg>
                            <span class="pl-2">Repo List</span>
                        </button>
                    </div>
                </div>

                <div v-if="pageStatus !== 'error'"
                    class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div class="space-y-6 lg:col-start-1 lg:col-span-3">
                        <!-- Tabs -->
                        <section class="lg:col-start-3 lg:col-span-1">
                            <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                <div class="sm:hidden">
                                    <label for="tabs" class="sr-only">Select a tab</label>
                                    <select id="tabs" name="tabs"
                                        class="block w-full focus:ring-aftrBlue focus:border-aftrBlue border-gray-300 rounded-md">
                                        <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{
                                                tab.name
                                        }}</option>
                                    </select>
                                </div>
                                <div class="hidden sm:block">
                                    <div class="border-b border-gray-200">
                                        <nav class="-mb-px flex" aria-label="Tabs">
                                            <a v-for="tab in tabs" :key="tab.name" :href="tab.href"
                                                @click="tabClick(tab.name)" :class="tabText(tab)"
                                                :aria-current="tab.current ? 'page' : undefined">
                                                {{ tab.name }}
                                            </a>
                                        </nav>
                                    </div>
                                </div>
                                <repo-info v-if="activeTab === 'Info'" :repo="repo" :contractId="contractId"
                                    :isMember="allowEdits">
                                </repo-info>
                                <repo-names v-else-if="activeTab === 'Names'" :repo="repo" :isMember="allowEdits">
                                </repo-names>
                                <repo-settings v-else-if="activeTab === 'Custom Settings'" :repo="repo"
                                    :isMember="allowEdits">
                                </repo-settings>
                                <repo-members v-else-if="activeTab === 'Members'" :repo="repo" :isMember="allowEdits">
                                </repo-members>
                                <repo-tokens v-else-if="activeTab === 'Assets'" :repo="repo" :isMember="allowEdits">
                                </repo-tokens>
                                <!--<repo-profits v-else-if="activeTab === 'Profits'"></repo-profits>-->
                                <!--<repo-leases v-else-if="activeTab === 'Leases'" :leases="repo.leases"></repo-leases>-->
                                <!--<repo-leases v-else-if="activeTab === 'Leases'"></repo-leases>-->
                                <!--<repo-fractions v-else-if="activeTab === 'Fractions'"></repo-fractions>-->
                                <repo-votes v-else-if="activeTab === 'Votes'" :repo="repo" :contractId="contractId"
                                    :isMember="allowEdits">
                                </repo-votes>
                                <repo-state v-else-if="activeTab === 'State'" :repo="repo">
                                </repo-state>
                                <repo-activity v-else-if="activeTab === 'Activity'" :arweave="arweave"
                                    :interactions="interactions" :errorMessages="interactionErrorMsgs">
                                </repo-activity>

                                <!--<repo-contract-test v-else-if="activeTab === 'Test Contract' && env === 'DEV'" :repo="repo"></repo-contract-test>-->
                            </div>
                        </section>
                        <!-- Tabs End -->
                    </div>
                </div>
            </div>
        </main>
    </div>

</template>

<script>
import { warpRead } from './utils/warpUtils.js';
import RepoInfo from './repo/RepoInfo.vue';
import RepoMembers from './repo/RepoMembers.vue';
import RepoTokens from './repo/RepoTokens.vue';
//import RepoProfits from './repo/RepoProfits.vue';
//import RepoLeases from './repo/RepoLeases.vue';
//import RepoFractions from './repo/RepoFractions.vue';
import RepoVotes from './repo/RepoVotes.vue';
import RepoState from './repo/RepoState.vue';
import RepoContractTest from './contract-tests/RepoContractTest.vue';
import RepoActivity from './repo/RepoActivity.vue';
import RepoPlaceholder from './repo/RepoPlaceholder.vue';
import RepoSettings from './repo/RepoSettings.vue';
import RepoNames from './repo/RepoNames.vue';
import RepoEvolve from "./repo/RepoEvolve.vue";
import { mapGetters } from "vuex";
import { isRepoMember } from './utils/shared.js';

export default {
    components: { RepoInfo, RepoMembers, RepoTokens, RepoVotes, RepoState, RepoActivity, RepoPlaceholder, RepoSettings, RepoContractTest, RepoEvolve, RepoNames },
    props: ['repoId'],
    data() {
        return {
            tabs: [
                { name: 'Info', href: '#', current: true },
                { name: 'Names', href: '#', current: false },
                { name: 'Custom Settings', href: '#', current: false },
                { name: 'Members', href: '#', current: false },
                { name: 'Assets', href: '#', current: false },
                //{ name: 'Profits', href: '#', current: false },
                //{ name: 'Fractions', href: '#', current: false },
                //{ name: 'Leases', href: '#', current: false },
                { name: 'Votes', href: '#', current: false },
                { name: 'State', href: '#', current: false },
                { name: 'Activity', href: '#', current: false },
                //                { name: 'Test Contract', href: '#', current: false },
            ],
            arweave: {},
            activeTab: "Info",
            pageStatus: "",
            contractId: this.repoId,
            repo: {},
            interactions: {},
            interactionErrorMsgs: {},
            anyWithdrawals: false,
            concludeVoteNeeded: false,

            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            env: import.meta.env.VITE_ENV,

            showEvolveModal: false,
            evolvePressedAlready: false,
            allowEdits: false,
            show: false
        };
    },
    computed: {
        repoLogo() {
            let logoUrl = ""
            if (this.repo.logo) {
                if (import.meta.env.VITE_ARWEAVE_PORT) {
                    logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/" + this.repo.logo}`;
                } else {
                    logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + "/" + this.repo.logo}`;
                }
                return logoUrl;
            } else {
                logoUrl = "https://avatars.dicebear.com/api/pixel-art-neutral/:" + this.repo.id + ".svg";
                return logoUrl;
            }
        },
        ...mapGetters(["getActiveAddress", "currentBlock", "getAftrContractSources"]),
    },
    methods: {
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
        tabText(tab) {
            let cssText = "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ";
            if (tab.current) {
                return cssText + "border-aftrBlue text-aftrBlue";
            } else if (this.anyWithdrawals && tab.name == "Tokens") {
                return cssText + "border-transparent text-aftrRed hover:text-gray-700 hover:border-gray-300";
            } else if (this.concludeVoteNeeded && tab.name == "Votes") {
                return cssText + "border-transparent text-aftrRed hover:text-gray-700 hover:border-gray-300";
            } else {
                return cssText + "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300";
            }

        },
        viewRepos() {
            this.$log.info("Repo : viewRepos :: ", "View Clicked");
            this.$router.push("../repos");
        },
        getEditStatus() {
            // Is user member of this repo?
            const isMember = isRepoMember(this.repo, this.getActiveAddress);

            if (isMember) {
                this.allowEdits = true;
            } else {
                this.allowEdits = false;
            }
        },
        evolveContract() {
            this.showEvolveModal = true;
        },
        closeModal() {
            this.showEvolveModal = false;
        },
        tabClick(name) {
            let activeTabIndex = this.tabs.findIndex(tab => tab.current == true);
            this.tabs[activeTabIndex].current = false;
            activeTabIndex = this.tabs.findIndex(tab => tab.name === name);
            this.tabs[activeTabIndex].current = true;
            this.activeTab = this.tabs[activeTabIndex].name;
        },
        async returnContractSrc(arweave, contractId) {
            if (this.env === "DEV") {
                let tx = await arweave.transactions.get(contractId);
                let contractSrcId = "";

                tx.get('tags').every(tag => {
                    let key = tag.get('name', { decode: true, string: true });
                    let value = tag.get('value', { decode: true, string: true });
                    if (key === "Contract-Src") {
                        contractSrcId = value;
                        return false;
                    }
                    return true;
                });
                return contractSrcId;
            } else {
                const route = import.meta.env.VITE_TX_GATEWAY + "?txID=" + contractId + this.env === "TEST" ? "&testnet=true" : "";
                const response = await fetch(route);
                if (!response.ok) {
                    this.$log.error("Repo : returnContractSrc :: ", "ERROR fetching transaction from gateway.");
                    return;
                }
                const data = await response.json();
                return data.srcTxId;
            }
        },
        async loadRepo() {
            // Add contractId to repo object
            this.repo.id = this.contractId;

            // Evolve
            const csArray = this.getAftrContractSources;
            const latestContractSourceId = csArray[csArray.length - 1];
            if (this.repo.contractSrc !== latestContractSourceId && this.repo.evolve !== latestContractSourceId) {
                // Contract needs to be evolved
                this.repo.evolveNeeded = true;

                // Check to see if evolve vote was already proposed
                const evolveVote = this.repo.votes.findIndex(vote => vote.status === "active" && vote.type === "evolve");
                if (evolveVote > -1) {
                    this.evolvePressedAlready = true;
                } else {
                    this.evolvePressedAlready = false;
                }
            }

            // Logo and Description
            this.repo.settings.forEach(setting => {
                if (setting[0] === 'communityLogo') {
                    this.repo.logo = setting[1];
                } else if (setting[0] === "communityDescription") {
                    this.repo.desc = setting[1];
                }
            });

            this.getEditStatus();

            // Tokens
            // Treasury
            // let treasuryTotal = 0;
            /*** VERTO CACHE NOT FUNCTIONING AND NO LONGER USING FCP FOR WITHDRAWALS */
            // if (this.repo.tokens) {
            //     for (let token of this.repo.tokens) {
            //         // Are there any withdrawals waiting to be processed?
            //         if (token.withdrawals && token.withdrawals.length > 0) {
            //             this.anyWithdrawals = true;
            //         }

            //         try {
            //             const response = await fetch(import.meta.env.VITE_VERTO_CACHE_URL + "token/" + token.tokenId + "/price");
            //             const responseObj = await response.json();
            //             const pricePerToken = responseObj.price;
            //             token.name = responseObj.name;
            //             token.total = pricePerToken * token.balance;
            //             treasuryTotal += token.total;
            //         } catch(error) {
            //             this.$log.info("Repo : loadRepo :: ", "ERROR calling Verto cache on " + token.name + ": " + error);
            //         }
            //     }
            // } else {
            //     this.repo.tokens = [];
            // }
            // this.repo.treasury = treasuryTotal;

            // Votes
            if (this.repo.votes) {
                this.$store.dispatch('loadCurrentBlock');
                let currentBlock = +this.currentBlock.height;
                let activeVotes = this.repo.votes.filter((vote) => vote.status === "active");
                activeVotes.forEach((vote) => {
                    let start = +vote.start;
                    let voteLength = +vote.voteLength;
                    if (start + voteLength < currentBlock) {
                        this.concludeVoteNeeded = true;
                    }
                });
            }
        },
    },
    beforeRouteEnter(to, from, next) {
        // Check to make sure valid Repo ID
        if (to.params["repoId"] !== "") {
            next();
        } else {
            this.pageStatus = "error";
            next("repos");
        }
    },
    async created() {
        this.pageStatus = "in-progress";
        this.showEvolveModal = false;

        try {
            this.arweave = await Arweave.init({
                host: this.arweaveHost,
                port: this.arweavePort,
                protocol: this.arweaveProtocol,
                timeout: 20000,
                logging: true,
            });
        } catch (error) {
            this.$log.error("Repo : created :: ", "ERROR connecting to Arweave: " + error);
            this.pageStatus = "error";
            this.$swal({
                logo: "error",
                html: "ERROR to load repo. Please click the Launch button again",
            })
            this.$router.push("../overview");
            return false;
        }

        try {
            // Using Warp
            const cachedValue = await warpRead(this.contractId);
            this.repo = cachedValue.state;
            this.interactions = cachedValue.validity;
            this.interactionErrorMsgs = cachedValue.errorMessages;

            // Ensure AFTR Repo
            const contractSrc = await this.returnContractSrc(this.arweave, this.contractId);
            this.repo.contractSrc = contractSrc;
            // if (contractSrc !== this.getAftrContractSrcId) {
            //     throw "Not valid AFTR Repo";
            // }

            await this.loadRepo();
        } catch (error) {
            this.$log.info("Repo : created :: ", "ERROR calling SmartWeave: " + error);
            this.pageStatus = "error";
            this.$swal({
                logo: "error",
                html: "ERROR to load repo. Please click the Launch button again",
            })
            this.$router.push("../overview");
            return false;
        }

        this.pageStatus = "";
    },
};
</script>