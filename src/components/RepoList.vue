<template>
    <div class="pt-4 w-full">
        <create-repo-simple v-if="showCreateSimple" @close="closeModal"></create-repo-simple>
    </div>
    <div>
        <main class="-mt-32">
            <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                <!-- Heading Row -->
                <div class="pb-5 sm:flex sm:items-center sm:justify-between">
                    <div class="flex items-center">
                        <select @change="filterChange" v-model="filter"
                            class="mt-1 mr-2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="all" selected>All Repos</option>
                            <option value="my">My Repos</option>
                        </select>
                        <button type="button" @click.prevent="toggleLayout" class="mr-2">
                            <svg v-if="!layoutGrid" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFFC79" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFFC79" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </button>
                        <button type="button" @click.prevent="toggleFilter">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFC79" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                            </svg>
                        </button>
                        <select v-if="filtersOn" @change="onChange($event)" v-model="searchType"
                            class="ml-2 mt-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="Name or Ticker Symbol" selected>Name or Ticker</option>
                            <option value="Wallet Address">Wallet Address</option>
                            <option value="Setting Key">Setting Key</option>
                            <option value="Setting Value">Setting Value</option>
                            <option value="Asset ID">Asset ID</option>
                            <option value="Needs Attention">Needs Attention</option>
                        </select>
                        <input v-if="filtersOn && searchType !== 'Needs Attention'" type="text" :placeholder="searchTypeText" v-model="searchInput"
                            class="ml-2 mt-1 pl-2 py-2 w-96 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                        <button v-if="filtersOn" title="Clear search box" class="visible pl-1" @click="clearData" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFC79" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                    <div v-if="arConnected">
                        <button type="button" @click.prevent="createRepo()" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
                            </svg>

                            <span class="pl-2">Create</span>
                        </button>
                        <button type="button" @click.prevent="openModal"
                            class="ml-2  inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="pl-2">Quick Add</span>
                        </button>
                    </div>
                </div>
                <!-- List -->

                <div class="bg-white rounded-lg shadow-md px-5 pb-6">
                    <div class="grid grid-cols-3 py-4">
                        <div>
                            <span v-show="filterText">SHOW FILTERS HERE</span>
                        </div>
                        <div></div>
                        <div class="text-right text-sm">
                            {{ this.renderedRepos.length }} Repos Shown
                        </div>
                    </div>
                    <!-- <perfect-scrollbar> -->
                    <div v-if="renderedRepos.length > 0">
                        <div v-if="layoutGrid">
                            <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <!-- <ul v-if="layoutGrid && repos.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"> -->
                                <!-- <li v-for="repo in repos" :key="repo.id" class="col-span-1 bg-white rounded-lg shadow divide-gray-200"> -->
                                <li v-for="repo in filteredList()" :key="repo.id" class="col-span-1 bg-white rounded-lg shadow divide-gray-200">
                                    <router-link :to="{ name: 'repo', params: { repoId: repo.id } }">
                                        <repo-card :repo="repo">
                                        </repo-card>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <div v-else-if="!layoutGrid && renderedRepos.length > 0">
                            <repo-table :repos="renderedRepos" :searchType="searchType" :searchInput="searchInput">
                                <!-- <repo-table v-else-if="!layoutGrid && repos.length > 0" :repos="repos" :searchType="searchType" :searchInput="searchInput"> -->
                            </repo-table>
                        </div>
                    </div>
                    <!-- </perfect-scrollbar> -->

                    <!-- Loading button and animation -->
                    <div v-if="repos.length != renderedRepos.length" class="text-center pt-6">
                        <button v-show="!isLoading" @click.prevent="loadMore" type="button"
                            class="inline-flex items-center px-4 py-2 border border-gray-200 shadow-md text-lg font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                            Load More
                        </button>
                        <div v-show="isLoading">
                            <div v-if="layoutGrid">
                                <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <li v-for="index in 9" :key="index" class="col-span-1 bg-white rounded-lg shadow divide-gray-200">
                                        <repo-card-placeholder :key="index">
                                        </repo-card-placeholder>
                                    </li>
                                </ul>
                            </div>
                            <div v-else class="inline-flex items-center p-6">
                                <svg aria-hidden="true" class="w-8 h-8 animate-spin text-aftrDarkGrey-light fill-aftrBlue" viewBox="0 0 100 101" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor" />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <ul v-if="!isLoading && repos.length == 0" class="">
                        No repos found...
                    </ul>
                </div>

                <!-- <div v-if="!isLoading && noResult" class="">
                    <p>
                        No more data...
                    </p>
                </div> -->
                <!-- /End replace -->
            </div>
        </main>
    </div>
</template>

<script>
import { warpRead } from './utils/warpUtils.js';
import RepoCard from "./repo/RepoCard.vue";
import RepoCardPlaceholder from "./repo/RepoCardPlaceholder.vue";
import { mapGetters } from "vuex";
import CreateRepoSimple from "./CreateRepoSimple.vue";
import RepoTable from './RepoTable.vue';
import { isRepoMember } from './utils/shared.js';

export default {
    components: { RepoCard, RepoCardPlaceholder, CreateRepoSimple, RepoTable },
    data() {
        return {
            /** Smartweave variables */
            arweave: {},
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            env: import.meta.env.VITE_ENV,
            initTags: [
                {
                    name: "Protocol",
                    value: import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL,
                },
            ],
            /** */
            myPsts: [],
            myRepos: [],
            isLoading: true,
            repoId: null,
            all_repo: "all_repo",
            my_repo: "my_repo",
            getRepoList: false,
            repos: [],
            filter: "my",
            cursor: "",
            noResult: false,
            message: "",
            showResult: true,
            hasNextPage: false,
            showCreateSimple: false,
            layoutGrid: true,
            filtersOn: false,
            filterText: false,
            searchType: "Name or Ticker Symbol",
            searchInput: "",
            showMessage: false,
            numRepos: 0,
            numContractsRead: 0,
            renderedRepos: [],
            limit: 9
        };
    },
    // mounted() {
    // this.created()
    // },
    computed: {
        searchTypeText() {
            return "Enter " + this.searchType;
        },
        ...mapGetters(["currentBlock", "getActiveAddress", "getAftrContractSources", "arConnected", "getActiveWallet"]),
    },
    methods: {
        clearData() {
            this.searchType = "Name or Ticker Symbol";
            this.searchInput = "";
            this.numRepos = this.repos.length;
        },
        onChange(event) {
            console.log(event.target.value, this.searchType);
            this.searchInput = ""
        },
        filteredList() {
            if (this.searchType == "Name or Ticker Symbol") {
                const repo = this.renderedRepos.filter((repo) =>
                    repo.name.toLowerCase().includes(this.searchInput.toLowerCase()) || repo.ticker.toLowerCase().includes(this.searchInput.toLowerCase())
                );
                if (repo.length == 0) {
                    this.showMessage = true;
                    return repo;
                }
                this.showMessage = false;
                this.numRepos = repo.length;
                return repo;
            }
            if (this.searchType == "Wallet Address") {
                const repo = this.renderedRepos.filter(element => {
                    return Object.keys(element.balances).some(key => key.toLowerCase().includes(this.searchInput.toLowerCase()));
                });

                if (repo.length == 0) {
                    this.showMessage = true;
                    this.numRepos = repo.length;
                    return repo;
                }
                this.showMessage = false;
                this.numRepos = repo.length;
                return repo
            }

            if (this.searchType == "Setting Key") {
                const repo = this.renderedRepos.filter((repo) => {
                    return repo.settings.some((setting) => {
                        return setting[0].toLowerCase().includes(this.searchInput.toLowerCase());
                    });
                });

                if (repo.length == 0) {
                    this.showMessage = true;
                    this.numRepos = repo.length;
                    return repo;
                }
                this.showMessage = false;
                this.numRepos = repo.length;
                return repo;
            }

            if (this.searchType == "Setting Value") {
                const repo = this.renderedRepos.filter((repo) => {
                    return repo.settings.some((setting) => {
                        return String(setting[1]).toLowerCase().includes(this.searchInput.toLowerCase())
                    });
                });

                if (repo.length == 0) {
                    this.showMessage = true;
                    this.numRepos = repo.length;
                    return repo;
                }
                this.showMessage = false;
                this.numRepos = repo.length;
                return repo;
            }

            if (this.searchType == "Asset ID") {
                const repo = this.renderedRepos.filter(element => {
                    return element.tokens.some((el) => {
                        return el.tokenId.toLowerCase().includes(this.searchInput.toLowerCase())
                    });
                })

                if (repo.length == 0) {
                    this.showMessage = true;
                    this.numRepos = repo.length;
                    return repo;
                }
                this.showMessage = false;
                this.numRepos = repo.length;
                return repo;
            }

            if (this.searchType == "Needs Attention") {
                const repo = this.renderedRepos.filter((repo) => { repo.evolveNeeded == true || repo.concludeVoteNeeded == true });
                this.numRepos = repo.length;
                return repo;
            }
        },
        toggleLayout() {
            this.layoutGrid = !this.layoutGrid;
        },
        createRepo() {
            this.$router.push("create");
        },
        viewRepo(repoId) {
            this.$router.push({ name: "repo", params: { repo: "joe" } });
        },
        async returnContractSrc(contractId) {
            if (this.env === "DEV") {
                let tx = await this.arweave.transactions.get(contractId);
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
                const route = import.meta.env.VITE_TX_GATEWAY + "?txId=" + contractId + (this.env === "TEST" ? "&testnet=true" : "");
                const response = await fetch(route);
                if (!response.ok) {
                    this.$log.error("Repo : returnContractSrc :: ", "ERROR fetching transaction from gateway.");
                    return;
                }
                const data = await response.json();
                return data.srcTxId;
            }
        },
        async filterChange() {
            this.isLoading = true;
            this.cursor = "";
            this.repos = [];
            this.renderedRepos = [];
            this.limit = 9
            if (this.arConnected) {
                this.getUserPsts();
                this.getUserRepos();
            }
            await this.getContracts();
            await this.load();
            this.isLoading = false;
        },
        toggleFilter() {
            if (this.filtersOn) {
                this.filtersOn = false;
                this.clearData();
            } else {
                this.filtersOn = true;
            }
        },

        // Loads a repo (warpRead using its contractId) from the permaweb and pushes its data to this.repos for Vue to display
        async buildRepo(contractId) {
            try {
                // Added this b/c of the mount call to loadAllRepos.  Not sure why that was added.
                if (!contractId) {
                    return;
                }
                /*** Using Warp */
                // READ REPO CONTRACT
                const cachedValue = await warpRead(contractId);
                let repo = cachedValue.state;

                /*** COMMENTING OUT CHECKING FOR CONTRACT SOURCE.
                 * WITH THE ADDITION OF EXECUTION MACHINE FUNCTIONS, WE MAY NOT NEED TO CHECK THE CONTRACT SOURCE.
                 * RE-EVALUATE THIS LATER.
                 */
                // Check to make sure contract source matches AFTR Contract Source
                let isAftrRepo = true;
                const contractSrc = await this.returnContractSrc(contractId);
                const csArray = this.getAftrContractSources;
                if (!csArray.find(id => id === contractSrc)) {
                    this.$log.error("RepoList : buildRepo :: ", "Invalid AFTR Repo found - Contract ID: " + contractId);
                    isAftrRepo = false;
                }
                const latestContractSourceId = csArray[csArray.length - 1];

                /*** END OF COMMENTING OUT */

                // Is user member of this repo?
                const isMember = isRepoMember(repo, this.getActiveAddress);
                if (isAftrRepo) {
                    repo.id = contractId;
                    if (!repo.tokens) {
                        repo.tokens = [];
                    }
                    /*** Determine if an Evolve is needed.
                     * Check to see if the latest AFTR Source ID is equal to the Repo Contract Source ID or the Repo's evolve property.
                    */

                    if (isMember) {
                        if (latestContractSourceId !== contractSrc && latestContractSourceId !== repo.evolve) {
                            repo.evolveNeeded = true;
                        }
                        if (repo.evolve !== "") {
                            if (latestContractSourceId !== repo.evolve) {
                                repo.evolveNeeded = true;
                            }
                        }
                    }
                    // Logo and Description
                    repo.settings.forEach((setting) => {
                        if (setting[0] === "communityLogo") {
                            repo.logo = setting[1];
                        } else if (setting[0] === "communityDescription") {
                            repo.desc = setting[1];
                        }
                    });

                    // Treasury
                    //let treasuryTotal = 0;
                    /*** TAKING THIS OUT B/C IT FAILS ON TESTNET */
                    // for (let token of repo.tokens) {
                    //     try {
                    //         const response = await fetch(import.meta.env.VITE_VERTO_CACHE_URL + "token/" + token.tokenId + "/price");
                    //         const responseObj = await response.json();
                    //         const pricePerToken = responseObj.price;
                    //         const tokenValue = pricePerToken * token.balance;
                    //         treasuryTotal += tokenValue;
                    //     } catch (error) {
                    //         this.$log.error("RepoList : loadAllRepos :: ", "ERROR calling Verto cache on " + token.name + ": " + error);
                    //     }
                    // }
                    //repo.treasury = treasuryTotal;

                    // Tips (AR)
                    /*** HOW CAN THIS BE DETERMINED? */
                    //repo.tipsAr = 10000;

                    // Tips (Misc)
                    /*** HOW CAN THIS BE DETERMINED? */
                    //repo.tipsMisc = 142545

                    // Votes Opened
                    if (typeof repo.votes !== "undefined" && repo.votes.length !== 0) {
                        const activeVotes = repo.votes.filter((vote) => vote.status === "active");
                        repo.totalActiveVotes = activeVotes.length;

                        /*** The concludedVoteNeeded proporty was added before using Warp.  Since switching to Warp, we don't need to check this anymore b/c contract functions run during a read of the contract. */
                        // Show repo notices to members
                        if (isMember) {
                            // Look for votes that need to be concluded
                            await this.$store.dispatch('loadCurrentBlock');
                            let currentBlock = +this.currentBlock.height;
                            activeVotes.forEach((vote) => {
                                let start = +vote.start;
                                let voteLength = +vote.voteLength;
                                if (start + voteLength < currentBlock) {
                                    repo.concludeVoteNeeded = true;
                                }
                            });
                        }
                    } else {
                        repo.totalActiveVotes = 0;
                    }

                    /*** The anyWithdrawals property was added during the use of FCP.  Since switching to Internal Writes with Warp, we don't need to check this anymore. */
                    // Are there any withdrawals waiting to be processed?
                    // if (typeof repo.tokens !== "undefined") {
                    //     for (let token of repo.tokens) {
                    //         if (token.withdrawals && token.withdrawals.length > 0) {
                    //             repo.anyWithdrawals = true;
                    //             break;
                    //         }
                    //     }
                    // }
                    this.numContractsRead++;
                    return repo
                }
            } catch (error) {
                this.$log.error("RepoList : buildRepo :: ", "ERROR reading contract: " + error);
            }
        },
        async getContracts() {
            // Get the AFTR Contract Source ID for Prod
            if (import.meta.env.VITE_ENV === "PROD" || import.meta.env.VITE_ENV === "TEST") {
                this.$store.commit("setAftrContractSources");
            }

            if (this.filter === 'my') {
                for (let repoId of this.myRepos) {
                    // let repo = await this.buildRepo(repoId);
                    this.repos.push(repoId);
                }
            }
            else {
                try {
                    let contractsArr = this.getAftrContractSources
                    let route = import.meta.env.VITE_CONTRACTS_BY_SOURCE_ENDPOINT
                    for (let contractSrc of contractsArr) {
                        let limit = 9
                        let page = 1

                        let response = await fetch(route + contractSrc
                            // + (limit ? '&limit=' + limit : '')
                            // + (page ? '&page=' + page : '')
                        )
                        if (response.status !== 200) {
                            throw response.status + " - " + response.statusText;
                        }

                        let data = await response.json()
                        for (let contract of data.contracts) {
                            // let repo = await this.buildRepo(contract.contractId)
                            this.repos.push(contract.contractId);
                        }
                    }
                }
                catch (error) {
                    this.$log.error("RepoList : getAftrRepos :: ", "ERROR while fetching from gateway: " + error);
                    return {};
                }
            }
            //this.isLoading = false;
            // if (response.data.data.transactions.pageInfo.hasNextPage) {
            //     this.hasNextPage = true;
            //     const [lastNumber] = response.data.data.transactions.edges.slice(-1);
            //     this.cursor = lastNumber.cursor;
            // } else {
            //     this.hasNextPage = false;
            // }
            // return response.data.data.transactions;
            /*** */

            this.numRepos = this.repos.length;
        },
        async loadMore() {
            this.limit += 9;
            await this.load();
        },
        async load() {
            this.isLoading = true;
            let repoFactory = [];
            for (let i = this.renderedRepos.length; i < this.limit && i < this.repos.length; i++) {
                repoFactory.push(await this.buildRepo(this.repos[i]))
            }
            this.isLoading = false;
            repoFactory.forEach(repo => this.renderedRepos.push(repo))
        },
        getUserPsts() {
            // Loads all of user's PSTs to be used as a filter on the My Repos query
            // this.myPsts = []
            // for (const pst of this.$store.getters.getActiveWallet.psts) {
            //     this.myPsts.push(pst.contractId);
            // }
            this.myPsts = this.arConnected ? this.$store.getters.getActiveWallet.psts.map(pst => pst.contractId) : []
        },
        getUserRepos() {
            // Loads all of user's Repos to be used as a filter on the My Repos query
            this.myRepos = this.arConnected ? this.$store.getters.getActiveWallet.repos.map(repo => repo.contractId) : []
            // if arConnected, myRepos is now populated (or empty)
        },
        openModal() {
            this.showCreateSimple = true;
        },
        closeModal() {
            this.showCreateSimple = false;
        },
    },
    async mounted() {
        this.isLoading = true;

        this.getUserPsts();
        this.getUserRepos();

        if (this.myRepos.length == 0) {
            this.filter = "all"
            await this.filterChange();
        }
        else {
            await this.getContracts();
            await this.load();
        }
    }
};
</script>



<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css" scoped>
.ps {
    height: 750px;
}

.visible {
    height: 3em;
    width: 10em
}
</style>