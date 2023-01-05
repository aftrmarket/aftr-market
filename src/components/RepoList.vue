<template>
    <div class="pt-4 w-full">
        <create-repo-simple v-if="showCreateSimple" @close="closeModal">
        </create-repo-simple>
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
                    <div>
                        <button type="button" @click.prevent="createRepo()"
                            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z">
                                </path>
                                <path
                                    d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z">
                                </path>
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

                <div class="bg-white rounded-lg shadow px-5 py-6">
                    <div class="grid grid-cols-3">
                        <div>
                            <span v-show="filterText">SHOW FILTERS HERE</span>
                        </div>
                        <div></div>
                        <div class="text-right text-sm">
                            {{ this.repos.length }} Repos Shown
                        </div>
                    </div>
                    <!-- <perfect-scrollbar> -->
                    <!-- <ul v-if="layoutGrid && !isLoading && repos.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"> -->
                    <ul v-if="layoutGrid && repos.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <!-- <li v-for="repo in repos" :key="repo.id" class="col-span-1 bg-white rounded-lg shadow divide-gray-200"> -->
                        <li v-for="repo in filteredList()" :key="repo.id" class="col-span-1 bg-white rounded-lg shadow divide-gray-200">
                            <router-link :to="{ name: 'repo', params: { repoId: repo.id } }">
                                <repo-card :repo="repo">
                                </repo-card>
                            </router-link>
                        </li>
                        <div v-if="showMessage">No repos found...</div>
                    </ul>
                    <!-- <repo-table v-else-if="!layoutGrid && !isLoading && repos.length > 0" :repos="repos" :searchType="searchType" :searchInput="searchInput"> -->
                    <repo-table v-else-if="!layoutGrid && repos.length > 0" :repos="repos" :searchType="searchType" :searchInput="searchInput">
                    </repo-table>
                    <ul v-else-if="!isLoading && repos.length == 0" class="">
                        No repos found...
                    </ul>
                    <ul v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <li v-for="index in 12" :key="index" class="col-span-1 bg-white rounded-lg shadow divide-gray-200">
                            <repo-card-placeholder :key="index">
                            </repo-card-placeholder>
                        </li>
                    </ul>
                    <div class="text-center">
                        <button v-if="!isLoading && hasNextPage" @click.prevent="load" type="submit"
                            class="mt-4 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Load
                            More</button>
                    </div>
                    <!-- </perfect-scrollbar> -->
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
import Transaction from 'arweave/node/lib/transaction';

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
        };
    },
    // mounted() {
    // this.created()
    // },
    computed: {
        searchTypeText() {
            return "Enter " + this.searchType;
        },
        ...mapGetters(["currentBlock", "getActiveAddress", "getAftrContractSources"]),
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
                const repo = this.repos.filter((repo) =>
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
                const repo = this.repos.filter(element => {
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
                const repo = this.repos.filter((repo) => {
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
                const repo = this.repos.filter((repo) => {
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
                const repo = this.repos.filter(element => {
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
                const repo = this.repos.filter((repo) => { repo.evolveNeeded == true });
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
        async loadAllRepos(contractId) {
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
                    this.$log.error("RepoList : loadAllRepos :: ", "Invalid AFTR Repo found - Contract ID: " + contractId);
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
                        if (latestContractSourceId !== contractSrc) {
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
                        // if (isMember) {
                        //     // Look for votes that need to be concluded
                        //     this.$store.dispatch('loadCurrentBlock');
                        //     let currentBlock = +this.currentBlock.height;
                        //     activeVotes.forEach((vote) => {
                        //         let start = +vote.start;
                        //         let voteLength = +vote.voteLength;
                        //         if (start + voteLength < currentBlock) {
                        //             repo.concludeVoteNeeded = true;
                        //         }
                        //     });
                        // }
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
                    this.repos.push(repo);
                }
            } catch (error) {
                this.$log.error("RepoList : loadAllRepos :: ", "ERROR reading contract: " + error);
            }
        },
        async load() {
            this.getUserPsts();
            this.getUserRepos();
            // Get the AFTR Contract Source ID for Prod
            if (import.meta.env.VITE_ENV === "PROD" || import.meta.env.VITE_ENV === "TEST") {
                this.$store.commit("setAftrContractSources");
            }

            // Get all aftr repo contracts, then load all repos
            let aftrContractIds = await this.getAftrRepos();
            // for (let repoId of aftrContractIds) {
            //     await this.loadAllRepos(repoId)
            // }

            // for (let edge of txs.edges) {
            //     let bundled = await this.arweave.api.get(edge.node.id)
            //     let txId = bundled.data.id
            //     await this.loadAllRepos(txId);
            //     // await this.loadAllRepos(edge.node.id);
            // }

            this.numRepos = this.repos.length;
        },
        async getAftrRepos() {
            if (this.filter === 'my') {
                for (let repoId of this.myRepos) {
                    await this.loadAllRepos(repoId)
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
                        for (let repo of data.contracts) {
                            await this.loadAllRepos(repo.contractId)
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
        },
        getUserPsts() {
            // Loads all of user's PSTs to be used as a filter on the My Repos query
            for (const pst of this.$store.getters.getActiveWallet.psts) {
                this.myPsts.push(pst.contractId);
            }
        },
        getUserRepos() {
            // Loads all of user's Repos to be used as a filter on the My Repos query
            for (const repo of this.$store.getters.getActiveWallet.repos) {
                this.myRepos.push(repo.contractId);
            }
        },
        openModal() {
            this.showCreateSimple = true;
        },
        closeModal() {
            this.showCreateSimple = false;

        },
    },
    async created() {
        this.isLoading = true;

        // check if user has psts

        await this.load();

        if (this.filter === "my" && this.repos.length == 0) {
            this.filter = "all"
            await this.filterChange();
        }
        this.isLoading = false;
    },

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