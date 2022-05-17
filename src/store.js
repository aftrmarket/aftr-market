import {createStore } from 'vuex';
import { fetchBalancesForAddress } from "verto-cache-interface";

const store = createStore({
    state() {
        return {
            activeWallet: {},
            arConnect: false,
            testLaunchConfigCorrect: true,
            currentBlock: [],
            keyFile : {},
            /** Smartweave variables */
            smartWeaveConfig: {
                contractSourceId: "", // Changes with every AFTR contract update
                tagProtocol: "AFTR-Demo-a101"   // NOT USED HERE
            },
            /** */
            arConnectConfig: {},
            aftrContractSrcId: ""
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
        getAftrContractSrcId(state) {
            return state.aftrContractSrcId;
        },
        getTestLaunchConfigState(state) {
            return state.testLaunchConfigCorrect;
        }
    },
    mutations: {
        addKeyFile(state, item) {
            state.keyFile = []
            state.keyFile.push(item);
          },
        setCurrentBlock (state, currentBlock) {
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
        setArConnectConfig (state, arConnectConfig) {
            state.arConnectConfig = arConnectConfig
        },
        setAftrContractSrcId(state, item) {
            state.aftrContractSrcId = item
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
    },
    actions: {
        async loadCurrentBlock ({ commit }) {
            const url = import.meta.env.VITE_ARWEAVE_PROTOCOL+"://"+import.meta.env.VITE_ARWEAVE_HOST+":"+import.meta.env.VITE_ARWEAVE_PORT;
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
                psts: [],
            };
            try {
                const promiseResult = await window.arweaveWallet.connect([
                    "ACCESS_ADDRESS",
                    "ACCESS_ALL_ADDRESSES",
                    "SIGN_TRANSACTION",
                    "ACCESS_ARWEAVE_CONFIG",
                ]);
                wallet.address = await window.arweaveWallet.getActiveAddress();
                console.log(wallet.address);

                let config = await window.arweaveWallet.getArweaveConfig();
                context.commit("setArConnectConfig", config);
            } catch (error) {
                console.log("ERROR during ArConnection: " + error);
                alert("Do you have the ArConnect wallet?.  AFTR Market integrates with ArConnect, so you'll need have the ArConnect plugin installed in your browser.  Go to ArConnect.io for more information.");
            }
    
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
                wallet.psts = await response.json();
                /**** RESPONSE RETURNS AS AN ARRAY OF KEY/VALUE PAIRS ****
                 * [ {
                 *  id: '',
                 *  balance: '',
                 *  name: '',
                 *  ticker: '',
                 *  logo: ''
                 * } ]
                 ****/


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
    /*** END ONLY RUNS IN PROD */
            }
        },
            async arDisconnect(context) {
                try {
                    const promiseResult = await window.arweaveWallet.disconnect();
                } catch (error) {
                    console.log("ERROR during ArDisconnection: " + error);
                }
                context.commit('arDisconnect');
            }
        }
});

export default store;