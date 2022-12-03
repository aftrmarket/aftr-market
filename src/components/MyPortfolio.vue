<template>
    <div>

        <main class="-mt-32">
            <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                <!-- Heading Row -->
                <div class="pb-5 sm:flex sm:items-center sm:justify-between">
                    <select name="selectedRepo" class="text-blue">
                        <option value="" disabled selected>Select Repos</option>
                        <option v-for="repo in repos" :key="repo.id" :value="repo.id">{{ repo.name }}
                        </option>
                    </select>
                    <button type="button" @click.prevent="createRepo()"
                        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z">
                            </path>
                            <path
                                d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z">
                            </path>
                        </svg>
                        <span class="pl-2">Create Repo</span>
                    </button>
                </div>
                <!-- List -->
                <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                    <ul v-if="!isLoading && repos.length > 0"
                        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <li v-for="repo in repos" :key="repo.id"
                            class="col-span-1 bg-white rounded-lg shadow divide-gray-200">
                            <router-link :to="{ name: 'repo', params: { repoId: repo.id } }">
                                <repo-card :repo="repo"></repo-card>
                            </router-link>
                        </li>
                    </ul>
                    <ul v-else-if="!isLoading && repos.length == 0" class="">
                        No repos found...
                    </ul>
                    <ul v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <li v-for="index in 12" :key=index
                            class="col-span-1 bg-white rounded-lg shadow divide-gray-200">
                            <repo-card-placeholder :key="index"></repo-card-placeholder>
                        </li>
                    </ul>
                </div>
                <!-- /End replace -->
            </div>
        </main>
    </div>
</template>

<script>
//import { readContract } from 'smartweave';
import { executeContract } from "@three-em/js";
import RepoCard from './repo/RepoCard.vue';
import RepoCardPlaceholder from './repo/RepoCardPlaceholder.vue';
import { run, all } from 'ar-gql';

export default {
    props: ["walletAddress"],
    components: { RepoCard, RepoCardPlaceholder },
    data() {
        return {
            arweave: {},
            /** Smartweave variables */
            contractSourceId: import.meta.env.VITE_SMARTWEAVE_CONTRACT_SOURCE_ID,
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            /** */

            isLoading: true,
            query: `
            query($cursor: String) {
                transactions(
                    tags: [ { name: "Protocol", values: ["${import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL}"] } ]
                    after: $cursor
                ) {
                    pageInfo {
                        hasNextPage
                    }
                    edges {
                        cursor
                        node { id } 
                    }
                }
        }`,
            repos: [],
        }
    },
    methods: {
        createRepo() {
            this.$router.push('create');
        },
        viewRepo(repoId) {
            this.$router.push({ name: 'repo', params: { repo: 'joe' } });
        },
        async loadAllRepos(contractId) {
            try {
                //let repo = await readContract(this.arweave, contractId);
                const state = await executeContract(contractId, undefined, true, {
                    ARWEAVE_HOST: import.meta.env.VITE_ARWEAVE_HOST,
                    ARWEAVE_PORT: import.meta.env.VITE_ARWEAVE_PORT,
                    ARWEAVE_PROTOCOL: import.meta.env.VITE_ARWEAVE_PROTOCOL
                });
                let repo = state.state;
                repo.id = contractId;

                // Filter for current wallet
                Object.keys(repo.balances).some(walletId => {
                    if (walletId == this.$store.getters.getActiveAddress) {
                        if (repo.balances[walletId] > 0) {
                            this.repos.push(repo);
                        }
                    } else {
                        Object.keys(repo.vault).some(walletId => {
                            if (walletId == this.$store.getters.getActiveAddress) {
                                if (repo.vault[walletId] > 0) {
                                    this.repos.push(repo);
                                }
                            }
                        });
                    }
                });

                if (!repo.tokens) {
                    repo.tokens = [];
                }
                // Logo
                repo.settings.forEach(setting => {
                    if (setting[0] === 'communityLogo') {
                        repo.logo = setting[1];
                    }
                });

                /*** VERTO CACHE NOT FUNCTIONING */
                // Treasury
                // let treasuryTotal = 0;

                // for (let token of repo.tokens) {
                //     try {
                //         const response = await fetch(import.meta.env.VITE_VERTO_CACHE_URL + "token/" + token.tokenId + "/price");
                //         const responseObj = await response.json();
                //         const pricePerToken = responseObj.price;
                //         const tokenValue = pricePerToken * token.balance;
                //         treasuryTotal += tokenValue;
                //     } catch(error) {
                //         this.$log.error("MyPortfolio : loadAllRepos :: ", "ERROR calling Verto cache on " + token.name + ": " + error);
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
                if (typeof repo.votes !== 'undefined' && repo.votes.length !== 0) {
                    const activeVotes = repo.votes.filter(vote => vote.status === 'active');
                    repo.totalActiveVotes = activeVotes.length;
                } else {
                    repo.totalActiveVotes = 0;
                }

            } catch (error) {
                this.$log.error("MyPortfolio : loadAllRepos :: ", "ERROR calling SmartWeave: " + error);
            }
        }
    },
    async created() {
        this.isLoading = true;
        if (!this.$store.getters.arConnected) {
            // alert("Please login to Aftr-Market")
            this.$swal({
                icon: 'error',
                html: "Please login to Aftr-Market",
            })
        }

        // Use GraphQL to find all repo contracts, then load all repos
        //const txs = await run(this.query);

        //for(let edge of txs.data.transactions.edges) {
        //    await this.loadAllRepos(edge.node.id);
        //}

        // for (let index = 1; index < 12; index++) {
        //     /*** FOR NOW JUST LOAD A FAKE SCREEN OF REPOS */
        //     this.repos.push(this.repos[0]);
        // }
        let response = {};
        let totalRepos = 0;
        try {
            this.arweave = await Arweave.init({
                host: this.arweaveHost,
                port: this.arweavePort,
                protocol: this.arweaveProtocol,
                timeout: 20000,
                logging: true,
            });

            response = await this.arweave.api.post('graphql', { query: this.query });

            if (response.status !== 200) {
                throw response.status + " - " + response.statusText;
            }

            totalRepos = response.data.data.transactions.edges.length;
        } catch (error) {
            this.$log.error("MyPortfolio : created :: ", "ERROR while fetching from gateway: " + error);
        }

        // Load each repo
        for (let edge of response.data.data.transactions.edges) {
            await this.loadAllRepos(edge.node.id);
        }
        this.isLoading = false;

    }
}
</script>