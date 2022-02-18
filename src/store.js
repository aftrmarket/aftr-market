import {createStore } from 'vuex';
import { readContract } from 'smartweave';

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
          address: "",
          psts: [],
        };
        try {
          if (import.meta.env.DEV) {
            const promiseResult = await window.arweaveWallet.connect([
              "ACCESS_ADDRESS",
              "ACCESS_ALL_ADDRESSES",
              "SIGN_TRANSACTION",
            ]);
            wallet.address = await window.arweaveWallet.getActiveAddress();
            console.log("wallet.address",wallet.address);
          } else {
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
  
        if (import.meta.env.DEV) {
            let query = {
            query: `
                    query($cursor: String) {
                        transactions(
                            tags: [{ name: "App-Name", values: ["SmartWeaveContract"] }]
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
            };
        
            let arweave = {};
            try {
                arweave = await Arweave.init({
                    host: import.meta.env.VITE_ARWEAVE_HOST,
                    port: import.meta.env.VITE_ARWEAVE_PORT,
                    protocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
                    timeout: 20000,
                    logging: true,
                });
            } catch (error) {
                console.log("ERROR connecting to Arweave: " + error);
                return false;
            }

            const response = await arweave.api.post('graphql', { query: query.query });

            for(let edge of response.data.data.transactions.edges) {
                console.log("CONTRACT: " + edge.node.id);
                try {
                    let vehicle = await readContract(arweave, edge.node.id);
                
                    if (vehicle && Object.keys(vehicle.balances).length != 0 && vehicle.name) {
                        let data = {
                            id: edge.node.id,
                            balance: 0,
                            name: vehicle.name,
                            ticker: vehicle.ticker,
                            logo: ''
                        };

                        Object.keys(vehicle.balances).some(walletId=>{
                            if(walletId == wallet.address){
                                data.balance = vehicle.balances[wallet.address];
                        }});

                        // Logo
                        vehicle.settings.forEach(setting => {
                            if (setting[0] === 'communityLogo') {
                                data.logo = setting[1];
                            }
                        });
                        if (data.balance > 0) {
                            wallet.psts.push(data);
                        }
                    }
                } catch(e) {
                    console.log("ERROR reading contract for " + edge.node.id + ": " + e);
                }
                console.log("PSTS: " + JSON.stringify(wallet.psts));
            }
        } else {
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
        }
  
        // Query Verto to get AR prices for each token
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