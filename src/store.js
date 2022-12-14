import { createStore } from 'vuex';
import { fetchBalancesForAddress } from "verto-cache-interface";
import { warpRead, arweaveInit } from './components/utils/warpUtils';

async function getPlayTokenId(arweave, addr) {
    if (import.meta.env.VITE_ENV === "PROD" || import.meta.env.VITE_ENV == 'TEST') {
        return import.meta.env.VITE_PLAY_CONTRACT_ID;
    } else {
        let queryval = {
            query: `
            query($cursor: String) {
                transactions(
                    tags: [ 
                        { name: "Protocol", values: ["PLAY"] },
                ]
                    after: $cursor
                )
                { pageInfo { hasNextPage }
                    edges { cursor node { id } }
                }
            }`
        };

        const responseValue = await arweave.api.post("graphql", { query: queryval.query, });

        if (responseValue.data.data.transactions.edges.length == 0) {
            return "";
        } else {
            return responseValue.data.data.transactions.edges[0].node.id;
            //return responseValue[0].node.id;
        }
    }
};

async function buildWalletPsts(aftrSourcesArray, userAddr) {
    const aftrContractSourcesString = JSON.stringify(aftrSourcesArray);
    let queryval = {
        query: `
            query($cursor: String) {
                transactions(
                    tags: [ 
                        { name: "Contract-Src", values: ${import.meta.env.VITE_AFTR_CONTRACT_SOURCES} }
                    ]
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
            }`
    };

    const arweave = arweaveInit();

    const responseValue = await arweave.api.post("graphql", { query: queryval.query, });
    console.log(responseValue.data.data.transactions.edges);

    let wallet = {
        address: userAddr,
        ar: 0,
        psts: [],
    };

    const balInWinstons = await arweave.wallets.getBalance(userAddr);
    wallet.ar = balInWinstons / 1000000000000;

    for (let edge of responseValue.data.data.transactions.edges) {
        let bundled = await arweave.api.get(edge.node.id)
        let txId = bundled.data.id
        try {
            const cachedValue = await warpRead(txId);
            let repo = cachedValue.state;

            if (repo && Object.keys(repo.balances).length != 0 && repo.name) {
                let data = {
                    contractId: txId,
                    balance: 0,
                    name: repo.name,
                    ticker: repo.ticker
                };

                Object.keys(repo.balances).some((walletId) => {
                    if (walletId == wallet.address) {
                        data.balance = repo.balances[wallet.address];
                    }
                });

                if (data.balance > 0) {
                    wallet.psts.push(data);
                }
            }
        } catch (e) {
            console.log("ERROR reading contract for " + txId + ": " + e);
        }
    }

    // Read PLAY PST
    const playTokenId = await getPlayTokenId(arweave, userAddr);
    if (playTokenId !== "") {
        // let bundled = await arweave.api.get(playTokenId)
        // let playTokenId = bundled.data.id
        console.log("PLAY ID: " + playTokenId)
        let playResp = await warpRead(playTokenId);

        // Add Play token to user's wallet
        let userTokenBal = 0;
        if (playResp.state.balances[wallet.address]) {
            userTokenBal = playResp.state.balances[wallet.address];
        }
        let playIndex = wallet.psts.findIndex(pst => pst.contractId === playTokenId);
        if (playIndex === -1) {
            let playPst = {
                contractId: playTokenId,
                balance: userTokenBal,
                name: playResp.state.name,
                ticker: playResp.state.ticker,
            };
            wallet.psts.push(playPst);
        } else {
            wallet.psts[playIndex].balance = userTokenBal;
        }
    }

    return wallet;
};

const store = createStore({
    state() {
        return {
            activeWallet: {},
            arConnect: false,
            testLaunchConfigCorrect: true,
            currentBlock: [],
            keyFile: {},
            arConnectConfig: {},
            aftrContractSources: [],
            // aftrContractSources: import.meta.env.VITE_AFTR_CONTRACT_SOURCES,
        };
    },
    getters: {
        arConnected(state) {
            return state.arConnect;
        },
        getActiveWallet(state) {
            return state.activeWallet;
        },
        getActiveAddress(state) {
            return state.activeWallet.address;
        },
        getActiveWalletAr(state) {
            return state.activeWallet.ar;
        },
        getSmartWeaveConfig() {
            return state.smartWeaveConfig;
        },
        currentBlock: state => {
            return state.currentBlock;
        },
        keyFile(state) {
            return state.keyFile;
        },
        arConnectConfig(state) {
            return state.arConnectConfig;
        },
        getTestLaunchConfigState(state) {
            return state.testLaunchConfigCorrect;
        },
        getAftrContractSources(state) {
            return state.aftrContractSources;
        },
    },
    mutations: {
        addKeyFile(state, item) {
            state.keyFile = []
            state.keyFile.push(item);
        },
        setCurrentBlock(state, currentBlock) {
            state.currentBlock = currentBlock
        },
        arConnect(state, payload) {
            state.activeWallet = payload;
            state.arConnect = true;
        },
        arDisconnect(state) {
            state.activeWallet = {};
            state.arConnect = false;
        },
        updateWalletPstBalance(state, payload) {
            /*** 
             Expect
                payload = {
                    index : <NUMBER>,
                    balance : <NUMBER>
                }
            ***/
            state.activeWallet.psts[payload.index].balance = payload.balance;
        },
        updateWalletArBalance(state) {

        },
        setArConnectConfig(state, arConnectConfig) {
            state.arConnectConfig = arConnectConfig;
        },
        setTestLaunchConfigState(state) {
            // If user tries to press the Launch button without Arconnecting, then turn flag on.
            if (state.arConnect) {
                state.testLaunchConfigCorrect = true;
            } else {
                state.testLaunchConfigCorrect = false;
            }
        },
        addWalletPst(state, pst) {
            state.activeWallet.psts.push(pst);
        },
        removeWalletPst(state, pstId) {
            let newWalletPsts = state.activeWallet.psts.filter(pst => pst.contractId !== pstId);
            state.activeWallet.psts = newWalletPsts;
        },
        addAftrContractSource(state, sourceId) {
            // Called in Dev to set add the AFTR Contract Source
            state.aftrContractSources.push(sourceId);
        },
        setAftrContractSources(state) {
            // Called in Prod & Test to load all the AFTR Contract Sources
            state.aftrContractSources = JSON.parse(import.meta.env.VITE_AFTR_CONTRACT_SOURCES);
            console.log("sources: " + state.aftrContractSources)
        },
    },
    actions: {
        async loadCurrentBlock({ commit }) {
            const url = import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT;
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log('Arweave network height is: ' + data);
                    commit('setCurrentBlock', data)
                })
                .catch(error => {
                    console.error(error);
                });
        },
        setTestLaunchConfigState({ commit }) {
            commit("setTestLaunchConfigState");
        },
        async arConnect(context) {
            let wallet = {
                address: "",
                ar: 0,
                psts: [],
            };

            // Try to get wallet, if fails, connect so user can assign permissions
            try {
                wallet.address = await window.arweaveWallet.getActiveAddress();
            } catch (e) {
                console.log(e);
                const promiseResult = await window.arweaveWallet.connect([
                    "ACCESS_ADDRESS",
                    "ACCESS_ALL_ADDRESSES",
                    "SIGN_TRANSACTION",
                    "ACCESS_ARWEAVE_CONFIG",
                ]);
                wallet.address = await window.arweaveWallet.getActiveAddress();
            }

            // Set correct config
            // try {
            //     let config = await window.arweaveWallet.getArweaveConfig();
            //     if (config.host != import.meta.env.VITE_ARWEAVE_HOST || config.port != import.meta.env.VITE_ARWEAVE_PORT || config.protocol != import.meta.env.VITE_ARWEAVE_PROTOCOL) {
            //         console.log("Current Config: " + JSON.stringify(config));
            //         config = {
            //             host: import.meta.env.VITE_ARWEAVE_HOST,
            //             port: import.meta.env.VITE_ARWEAVE_PORT,
            //             protocol: import.meta.env.VITE_ARWEAVE_PROTOCOL
            //         };
            //         console.log("New Config: " + JSON.stringify(config));
            //         context.commit("setArConnectConfig", config);
            //     }
            //     wallet.address = await window.arweaveWallet.getActiveAddress();
            // } catch (e) {
            //     alert(e);
            // }

            try {
                let config = await window.arweaveWallet.getArweaveConfig();
                config = {
                    host: import.meta.env.VITE_ARWEAVE_HOST,
                    port: import.meta.env.VITE_ARWEAVE_PORT,
                    protocol: import.meta.env.VITE_ARWEAVE_PROTOCOL
                };
                context.commit("setArConnectConfig", config);
                wallet.address = await window.arweaveWallet.getActiveAddress();
            } catch (e) {
                alert(e);
            }


            // try {
            //     const promiseResult = await window.arweaveWallet.connect([
            //         "ACCESS_ADDRESS",
            //         "ACCESS_ALL_ADDRESSES",
            //         "SIGN_TRANSACTION",
            //         "ACCESS_ARWEAVE_CONFIG",
            //     ]);
            //     wallet.address = await window.arweaveWallet.getActiveAddress();
            //     console.log(wallet.address);

            //     let config = await window.arweaveWallet.getArweaveConfig();
            //     if (config.host != import.meta.env.VITE_ARWEAVE_HOST && config.port != import.meta.env.VITE_ARWEAVE_PORT && config.protocol != import.meta.env.VITE_ARWEAVE_PROTOCOL) {
            //         console.log("Current Config: " + JSON.stringify(config));
            //         config = { 
            //             host: import.meta.env.VITE_ARWEAVE_HOST, 
            //             port: import.meta.env.VITE_ARWEAVE_PORT,
            //             protocol: import.meta.env.VITE_ARWEAVE_PROTOCOL
            //         };
            //         console.log("New Config: " + JSON.stringify(config));
            //         context.commit("setArConnectConfig", config);
            //     }


            // } catch (error) {
            //     console.log("ERROR during ArConnection: " + error);
            //     alert("Do you have the ArConnect wallet?.  AFTR Market integrates with ArConnect, so you'll need have the ArConnect plugin installed in your browser.  Go to ArConnect.io for more information.");
            // }
            if (wallet.address.length === 43) {
                context.commit("arConnect", wallet);
                context.commit("setTestLaunchConfigState");
            }

            if (import.meta.env.VITE_ENV === "TEST" && !import.meta.env.VITE_BUILD_PSTS) {

                const tokens = await fetchBalancesForAddress(wallet.address);
                /*** Returns an array of objects
                 *  [
                        {
                            "name": "<TOKEN>",
                            "ticker": "<TICKER>",
                            "balance": <BALANCE>,
                            "contractId": "<CONTRACT-ID OF TOKEN>",
                            "userAddress": "<WALLET ADDRESS>",
                            "type": "<TYPE OF TOKEN>"
                        }
                    ]
                 */


                /*** DO WE HAVE THE ABILITY TO GET TOKEN PRICES IN TEST? */

            } else if (import.meta.env.VITE_ENV === "PROD") {
                // Now query Verto to get all PSTs contained in Wallet
                const response = await fetch(
                    import.meta.env.VITE_VERTO_CACHE_URL + "balance/" + wallet.address
                );
                const cachePsts = await response.json();
                /**** RESPONSE RETURNS AS AN ARRAY OF KEY/VALUE PAIRS ****
                 * [ {
                 *  id: '',
                 *  balance: '',
                 *  name: '',
                 *  ticker: '',
                 *  logo: ''
                 * } ]
                 ****/
                for (let pst of cachePsts) {
                    wallet.psts.push({
                        contractId: pst.id,
                        balance: pst.balance,
                        name: pst.name,
                        ticker: pst.ticker
                    });
                }

                // Query Verto to get AR prices for each token
                /*** THIS CODE SHOULD ONLY RUN IN PROD AS WELL.
                 * IN DEV AND TEST, WE WON'T HAVE ACCESS TO PRICES, SO WE SHOULD HARD-CODE THESE FOR TESTING.
                 */
                for (let pst of wallet.psts) {
                    try {
                        const response = await fetch(
                            import.meta.env.VITE_VERTO_CACHE_URL + "token/" + pst.id + "/price"
                        );
                        const jsonRes = await response.json();
                        const i = wallet.psts.findIndex((item) => item.id === pst.id);
                        wallet.psts[i]["price"] = jsonRes.price;
                        wallet.psts[i]["total"] = jsonRes.price * wallet.psts[i]["balance"];
                    } catch (error) {
                        console.log("ERROR while fetching AR prices of " + pst.name + " from Verto: " + error);
                    }

                    if (wallet.address.length === 43) {
                        context.commit("arConnect", wallet);
                    }
                }

                /*** DO WE WANT TO RUN buildWalletPsts in PROD?? */

                /*** END ONLY RUNS IN PROD */
            } else {
                if (context.state.aftrContractSources.length !== 0) {
                    wallet = await buildWalletPsts(context.state.aftrContractSources, wallet.address);
                    if (wallet !== {}) {
                        context.commit("arConnect", wallet);
                    }
                }
            }
        },
        async arDisconnect(context) {
            try {
                const promiseResult = await window.arweaveWallet.disconnect();
            } catch (error) {
                console.log("ERROR during ArDisconnection: " + error);
            }
            context.commit('arDisconnect');
        },
        async arRefresh(context, buildWallet = false) {
            if (buildWallet) {
                if (context.state.aftrContractSources.length !== 0) {
                    const wallet = await buildWalletPsts(context.state.aftrContractSources, context.state.activeWallet.address);
                    if (wallet !== {}) {
                        context.commit("arConnect", wallet);
                    }
                }
            } else {
                const arweave = arweaveInit();
                const balInWinstons = await arweave.wallets.getBalance(context.state.activeWallet.address);
                context.state.activeWallet.ar = balInWinstons / 1000000000000;
            }
        },
    }
});

export default store;