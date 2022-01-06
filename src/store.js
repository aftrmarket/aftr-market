import {createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            activeWallet: {},
            arConnect: false,
            currentBlock: [],
            keyFile : {},
            /** Smartweave variables */
            smartWeaveConfig: {
                contractSourceId: "BTxbGwMEyVv94ak2CDeuCAXLWnAhwLb_hK4qw8_a-JU", // Changes with every AFTR contract update
                tagProtocol: "AFTR-Demo-a101"
            }
            /** */
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
        }
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
        async arConnect(context) {
            let wallet = {
                address : '',
                psts : []
            };
            try {
                if (import.meta.env.DEV) {
                    console.log("***Test***")
                    const promiseResult = await window.arweaveWallet.connect([
                        "ACCESS_ADDRESS",
                        "ACCESS_ALL_ADDRESSES",
                        "SIGN_TRANSACTION",
                    ]);
                    wallet.address = await window.arweaveWallet.getActiveAddress();
                    console.log(wallet.address)
                } else{
                    const promiseResult = await window.arweaveWallet.connect([
                        "ACCESS_ADDRESS",
                        "ACCESS_ALL_ADDRESSES",
                        "SIGN_TRANSACTION",
                    ]);
                    wallet.address = await window.arweaveWallet.getActiveAddress();
                }   

            } catch (error) {
                console.log("ERROR during ArConnection: " + error);
            }

            try {
                if ('development') {
                    /***
                        USE GRAPHQL to get all the PST.  To do this use the App-Name tag:
                        tags: [{ name: "App-Name", values: ["SmartWeaveContract"] }]
            
                        Next, loop through all the contract IDs that you find and build the pst object as
                        defined below. You'll need to call the readContract function on each contract ID, 
                        then see if the balance exists in the balances object on that state. If it does,
                        then save its id, balance, name, ticker, and logo in the pst array for the wallet.
                    */
                } else {
                    // Now query Verto to get all PSTs contained in Wallet
                const response = await fetch(
                    "http://v2.cache.verto.exchange/balance/" + wallet.address
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
                }
                
            } catch (error) {
                console.log("ERROR while fetching Verto balances: " + error);
            }

            try {
                // Query Verto to get AR prices for each token
                for (let pst of wallet.psts) {
                    const response = await fetch(
                        "http://v2.cache.verto.exchange/token/" + pst.id + "/price"
                    );
                    const jsonRes = await response.json();
                    const i = wallet.psts.findIndex((item) => item.id === pst.id);
                    wallet.psts[i]["price"] = jsonRes.price;
                    wallet.psts[i]["total"] =
                        jsonRes.price * wallet.psts[i]["balance"];
                }
            } catch (error) {
                console.log(
                    "ERROR while fetching AR prices from Verto: " + error
                );
            }

            if (wallet.address.length === 43) {
                context.commit('arConnect', wallet);
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