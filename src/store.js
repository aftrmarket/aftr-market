import {createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            activeWallet: {},
            arConnect: false
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
        }
    },
    mutations: {
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
        async arConnect(context) {
            let wallet = {
                address : '',
                psts : []
            };
            try {
                const promiseResult = await window.arweaveWallet.connect([
                    "ACCESS_ADDRESS",
                    "ACCESS_ALL_ADDRESSES",
                    "SIGN_TRANSACTION",
                ]);
                wallet.address = await window.arweaveWallet.getActiveAddress();

            } catch (error) {
                console.log("ERROR during ArConnection: " + error);
            }

            try {
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