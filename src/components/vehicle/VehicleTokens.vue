<template>
    <div class="pt-4 w-full">
        <vehicle-tokens-add v-if="showAddTokens" :vehicle="vehicle" @close="closeModal"></vehicle-tokens-add>


    <!--- Finalize Withdrawals Start --->
    <div v-if="allowTransfer && wds.length > 0" class="pt-4 w-full grid grid-cols-4 gap-4">
        <div class="col-span-3 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th colspan="2" scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Approved Withdrawals
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(wd, index) in wds" :key="wd.voteId" class="text-xs text-gray-500 hover:bg-gray-50">
                        <td class="px-4 py-2">
                            {{ index + 1 }}
                        </td>
                        <td class="px-4 py-2">
                            <span v-html="wdText(wd)"></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-col justify-center px-2 py-4 text-left text-xs text-gray-500 tracking-wider">
            <p class="text-aftrRed uppercase">TO DO: Process Withdrawals</p>
            The withdrawals have been approved.  To initiate the transfer, click the Finalize button.
        </div>
        <div class="col-span-3"></div>
        <div>
            <button @click.prevent="processWithdrawalClick" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrDarkGreen bg-white hover:bg-aftrDarkGreen hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrDarkGreen">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span class="pl-2">FINALIZE</span>
            </button>
        </div>
    </div>
    
                
    
    <!--- Finalize Withdrawals End --->


        <!-- PSTs in Vehicle -->
        <div v-if="vehicle.tokens.length > 0" class="pt-4">
            <div class="pt-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div :class="editClass">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="w-full text-xs divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <!--
                                    <th v-if="allowTransfer" scope="col" class="pl-3 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                                        <input type="checkbox" v-model="selectAll" :class="checkboxClass" />
                                    </th>-->
                                    <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Arweave Assets ({{ vehicle.tokens.length }})</th>
                                    <th scope="col" class="px-1 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Contributor</th>
                                    <th scope="col" class="px-1 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Tokens</th>
                                    <th scope="col" class="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Value (AR)</th>
                                    <th v-if="allowTransfer" scope="col" class="py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Transfer Amount</th>
                                    <th v-if="allowTransfer" scope="col" class="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Transfer To Address</th>
                                    <th v-if="allowTransfer" scope="col" class="py-3 text-left font-medium text-gray-500 uppercase tracking-wider"> W/D</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="(pst, index) in vehicle.tokens" :key="pst.txID" class="hover:bg-gray-50" >
                                    <!--
                                    <td v-if="allowTransfer" class="text-center py-2 pl-3">
                                        <input type="checkbox" :value="pst.txID" v-model="tokenSelected" :class="checkboxClass" />
                                    </td>-->
                                    <td class="px-6 py-4 whitespace-nowrap cursor-pointer">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10" @click.prevent="showTokenState( pst.tokenId, pstLogo(pst.tokenId, pst.logo) )">
                                                <img class="h-10 w-10 rounded-full" :src="pstLogo(pst.tokenId, pst.logo)" alt="" />
                                            </div>
                                            <div class="ml-4">
                                                <div class="font-medium text-gray-900"> {{ pst.name + " (" + pst.ticker + ")" }} </div>
                                                <div class="text-gray-500 font-mono" @click.prevent="showWalletAddress(pst.tokenId)"> {{ idSubstr(pst.tokenId) }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-1 py-3 text-gray-500 font-mono cursor-pointer" @click.prevent="showWalletAddress(pst.source)">{{ idSubstr(pst.source) }}</td>
                                    <td class="text-right px-1 py-3 text-gray-500">{{ formatNumber(pst.balance) }}</td>
                                    <td class="text-right px-6 py-3 text-gray-500">{{ formatNumber(pst.total, true) }}</td>
                                    <td v-if="allowTransfer" class="pt-1">
                                        <input type="number" v-model="transferAmounts[index]" :class="transferAmtInput" />
                                    </td>
                                    <td v-if="allowTransfer" class="pt-4 flex items-center space-x-2">
                                        <input type="text" v-model="transferAddrs[index]" :class="transferAddrInput" />
                                        <button v-if="index == 0" @click.prevent="onFillDownClick" type="button" class="p-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td v-if="allowTransfer" class="pt-1">
                                        <button @click.prevent="onTransferPstClick(pst.txID, index, pst.tokenId)" type="button" class="p-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h3 class="text-xl font-light leading-6">No current tokens in vehicle</h3>
        </div>
        <div class="mt-6 flex flex-col inline-flex">
            <button v-if="allowAdd" @click.prevent="addPst" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                </svg>
                <span class="pl-2">ADD TOKENS</span>
            </button>
            <div v-else class="pt-6 flex justify-start items-center">
                <button @click="arConnect" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aftrBlue hover:bg-aftrBlue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Login to ArConnect
                </button>
                <label class="pl-4 block text-sm text-gray-700">
                    You must provide a wallet in order to add tokens to a vehicle
                </label>
            </div>
        </div>
    </div>

    <!--- Verify Proposal Start --->
    <div v-if="allowTransfer && numChanges > 0" class="pt-4 w-full grid grid-cols-4 gap-4">
        <div class="col-span-3 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th colspan="2" scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Proposed Changes ({{ numChanges }})
                        </th>
                        <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cancel
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(wd, index) in proposedChanges" :key="wd.txID" class="text-xs text-gray-500 hover:bg-gray-50">
                        <td class="px-4 py-2">
                            {{ index + 1 }}
                        </td>
                        <td class="px-4 py-2">
                            <span v-html="proposedText(wd)"></span>
                        </td>
                        <td class="px-4 py-2 text-center">
                            <button @click.prevent="onRemoveProposalClick(index)" type="button" class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-col justify-center px-2 py-4 text-left text-xs text-gray-500 tracking-wider">
            <p class="text-aftrRed uppercase">Review the proposed changes</p>
            {{ statusMessage }}
        </div>
    </div>
    
    <!--- Verify Proposal End --->
    <div class="col-span-3 text-right">
        <div v-if="allowTransfer && numChanges > 0" class="inline-flex">
            <div class="text-right">
                <button @click.prevent="updateVehicle" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                        <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="pl-2">Update Vehicle</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import numeral from "numeral";
import { mapGetters } from 'vuex';
import VehicleTokensAdd from './VehicleTokensAdd.vue';
import Arweave from "arweave";
import { interactWrite } from "smartweave";
import { executeContract } from "@three-em/js";


export default {
    props: ['vehicle'],
    components: { VehicleTokensAdd },
    data() {
        return {
            /** Smartweave variables */
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            arweaveMine: import.meta.env.VITE_MINE,
            /** */

            allowAdd: false,
            allowTransfer: false,
            showAddTokens: false,
            wds: [],
            //tokenSelected: [],
            transferAddrs: [],
            transferAmounts: [],
            proposedChanges: [],
            transferAmtValid: true,
            transferAddrValid: true,
            state: {}

/*** TODO: HANDLE TOKENS THAT ARE LOCKED! */
/**************************************** */
        };
    },
    computed: {
        // selectAll: {
        //     get() {
        //         return this.vehicle.tokens ? this.tokenSelected.length == Object.keys(this.vehicle.tokens).length : false;
        //     },
        //     set(value) {
        //         let selected = [];
        //         if(value) {
        //             for(let token of this.vehicle.tokens) {
        //                 selected.push(token.txID);
        //             }
        //         }
        //         this.tokenSelected = selected;
        //     }
        // },
        checkboxClass() {
            return "focus:ring-aftrBlue h-4 w-4 text-aftrBlue border-gray-300 rounded";
        },
        numChanges() {
            return this.proposedChanges.length;
        },
        transferAddrInput() {
            if (this.transferAddrValid) {
                return "mt-1 mb-1 w-80 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md";
            } else {
                return "mt-1 mb-1 w-80 text-xs text-right focus:ring-aftrRed focus:border-aftrRed shadow-sm border-gray-300 rounded-md";
            }
        },
        transferAmtInput() {
            if (this.transferAmtValid) {
                return "mt-1 mb-1 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md";
            } else {
                return "mt-1 mb-1 w-36 text-xs text-right focus:ring-aftrRed focus:border-aftrRed shadow-sm border-gray-300 rounded-md";
            }
        },
        editClass() {
            if (this.allowTransfer) {
                return "py-2 align-middle inline-block w-full sm:px-3 lg:px-6";
            } else {
                return "py-2 align-middle inline-block w-3/4 sm:px-3 lg:px-6";
            }
        },
        statusMessage() {
            if (this.getActiveAddress === this.creatorAddress && this.vehicle.ownership === 'single') {
                return "Token transfers out of the vehicle will process immediately because you are the owner of the vehicle";
            } else {
                return "Token transfers out of the vehicle will be proposed as votes because this is a DAO owned vehicle";
            }
        },
        creatorAddress() {
            if (typeof this.vehicle.creator === 'undefined' || this.vehicle.creator === null || this.vehicle.creator === '') {
                return '~NO ONE~';
            } else {
                return this.vehicle.creator;
            }
        },
        ...mapGetters(['arConnected', 'getActiveAddress', 'keyFile']),
    },
    watch: {
        arConnected(value) {
            this.setFlags();
        }
    },
    methods: {
        async showWalletAddress(walletAddress){
            this.$swal({
                html: walletAddress,
                showConfirmButton: false,
            })  
        },
        async showTokenState(id, logo){
            let arweave = {};
            arweave = await Arweave.init({
                host: this.arweaveHost,
                port: this.arweavePort,
                protocol: this.arweaveProtocol,
                timeout: 20000,
                logging: true,
            });


            const { state, validity } = await executeContract(id, undefined, true, {
                ARWEAVE_HOST: import.meta.env.VITE_ARWEAVE_HOST,
                ARWEAVE_PORT: import.meta.env.VITE_ARWEAVE_PORT,
                ARWEAVE_PROTOCOL: import.meta.env.VITE_ARWEAVE_PROTOCOL
            });

            //let vehicle = await readContract(arweave, id);
            this.state = state;
            let title = JSON.stringify(this.state.name)
            
            this.$swal({
                title: '<span style="vertical-align:middle" >' + title.replace(/^"(.*)"$/, '$1') + '</span><hr size="8">',
                html: "<pre style= 'text-align:left'> <code>" + "<p style='color:green'> Balances : </p>" + JSON.stringify(this.state.balances,null, 3) + "</code> </pre>",
                width: 800,
                customClass: 'swal-height'
            })            
        },
        setFlags() {
            if (this.arConnected) {
                this.allowAdd = true;
            } else {
                this.allowAdd = false;
            }
            // For transfers, you must be the creator and the vehicle must have single owenership
            if ((this.getActiveAddress === this.creatorAddress && this.vehicle.ownership === 'single') || (this.getActiveAddress in this.vehicle.balances && this.vehicle.ownership === 'dao')) {
                this.allowTransfer = true;
            } else {
                this.allowTransfer = false;
            }
            // Are there any withdrawals waiting to be processed?
            this.vehicle.tokens.forEach ( token => {
                if (token.withdrawals) {
                    token.withdrawals.forEach( wd => {
                        if (!wd.processed) {
                            wd["name"] = token.name;
                            this.wds.push(wd);
                        }
                    });
                }
            });
        },
        pstLogo(id, logo) {
            let logoUrl = "";
            if (logo || logo != "") {
                if(import.meta.env.VITE_ARWEAVE_PORT){
                    logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/"}`;
                } else {
                    logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST}`;
                }
                return logoUrl + logo;
            } else {
                logoUrl = "https://avatars.dicebear.com/api/pixel-art-neutral/:" + id + ".svg";
                return logoUrl;
            }
        },
        arConnect() {
            this.$store.dispatch('arConnect');
        },
        formatNumber(num, dec = false) {
            if (dec) {
                return numeral(num).format("0,0.0000");
            } else {
                return numeral(num).format("0,0");
            }
        },
        isAddrValid(addr) {
            if (typeof addr == 'string' && addr.length == 43 && addr !== this.vehicle.id) {
                this.transferAddrValid = true;
                return true;
            } else {
                this.transferAddrValid = false;
                return false;
            }
        },
        addPst(){
            this.showAddTokens = true;
        },
        closeModal() {
            this.showAddTokens = false;
        },
        idSubstr(addr, chars = 10) {
            if (typeof addr === 'string') {
                let len = parseInt(chars/2);
                return addr.substr(0, len) + '...' + addr.substr(-len);
            } else {
                return '';
            }
        },
        onTransferPstClick(txID, index, tokenId) {
            const pst = this.vehicle.tokens.find( token => token.txID === txID);

            // Validate the amount
            if (this.transferAmounts[index] > 0 && this.transferAmounts[index] <= pst.balance) {
                this.transferAmtValid = true;
            } else {
                this.transferAmtValid = false;
            }

            if (this.transferAmtValid && this.isAddrValid(this.transferAddrs[index])) {
                const foundIndex = this.proposedChanges.findIndex( tx => tx.txID === txID);
                if (foundIndex === -1) {
                    this.proposedChanges.push(
                        {
                            txID: txID,
                            tokenId: tokenId,
                            target: this.transferAddrs[index],
                            qty: this.transferAmounts[index]
                        }
                    );
                    // if (this.tokenSelected.includes(txID)) {
                    //     this.tokenSelected = this.tokenSelected.filter( (id) => id !== txID);
                    // } else {
                    //     this.tokenSelected.push(txID);
                    // }

                } else {
                    this.proposedChanges[foundIndex].qty = this.transferAmounts[index];
                    this.proposedChanges[foundIndex].target = this.transferAddrs[index];
                }
            }
        },
        onRemoveProposalClick(index) {
            this.proposedChanges.splice(index, 1);
        },
        proposedText(withdrawal) {
            const transObj = this.vehicle.tokens.find( trans =>  trans.txID === withdrawal.txID );
            let rowText = "<span style='color:#FF6C8C'><b>Withdrawal</b></span> <b>" + this.formatNumber(withdrawal.qty) + "</b> " + transObj.name + " tokens and transfer to <b><span class='font-mono'>" + withdrawal.target + "</span></b><br/>";
            rowText += "Leaving a new balance of <b>" + this.formatNumber(transObj.balance - withdrawal.qty) + "</b> " + transObj.name + " tokens in the vehicle";
            return rowText
        },
        wdText(wd) {
            let rowText = "<span style='color:#FF6C8C'><b>Withdrawal</b></span> <b>" + this.formatNumber(wd.invocation.qty) + "</b> " + wd.name + " tokens and transfer to <b><span class='font-mono'>" + wd.invocation.target + "</span></b><br/>";
            return rowText
        },
        onFillDownClick() {
            if (this.isAddrValid(this.transferAddrs[0])) {
                this.transferAddrs.splice(1, this.transferAddrs.length);
                for (let i = 1; i < this.vehicle.tokens.length; i++) {
                    if (this.transferAddrs[i]) {
                        this.transferAddrs[i] = this.transferAddrs[0];
                    } else {
                        this.transferAddrs.push(this.transferAddrs[0]);
                    }
                }
            }
        },
        buildInput(proposedChange) {
            let input = {};
            input.function = 'propose';
            input.type = 'withdrawal';
            input.txID = proposedChange.txID;
            input.target = proposedChange.target;
            input.qty = proposedChange.qty;

            const transObj = this.vehicle.tokens.find( trans =>  trans.txID === proposedChange.txID );
            input.note = 'Withdrawal ' + this.formatNumber(proposedChange.qty) + ' ' + transObj.name + ' tokens and transfer to ' + proposedChange.target + ' leaving a new balance of ' + this.formatNumber(transObj.balance - proposedChange.qty) + ' ' + transObj.name + ' tokens in the vehicle';

            return input;
        },
        async processWithdrawalClick() {
            const htmlText = "The following withdrawal has been approved.  Press Ok to complete the transfer.";
            const result = await this.$swal.fire({
                title: "Process Withdrawal",
                html: htmlText,
                showConfirmButton: true,
                confirmButtonText: "Ok",
                confirmButtonColor: "#6C8CFF",
                showCancelButton: true,
                cancelButtonColor: "#FF6C8C",
            });

            if (result.isConfirmed) {
                // Create inputs
                let action = {
                    input: {}
                };

                // Array of readOutbox inputs
                let action2 = [{
                    foreignContract: "",
                    input: {}
                }];

                // Determine if multi-interaction is needed based on number of withdrawals
                if (this.wds.length === 1) {
                    action.input.function = "withdrawal";
                    action.input.txID = this.wds[0].txID;
                    action.input.voteId = this.wds[0].voteId;

                    action2[0].input.function = "readOutbox";
                    action2[0].input.contract = this.vehicle.id;
                    action2[0].foreignContract = this.wds[0].foreignContract;
                } else if (this.wds.length > 1) {
                    action.input.function = 'multiInteraction';
                    action.input.key = 'multi';
                    action.input.note = 'Multi-Interaction';
                    action.input.actions = [];

                    for (let wd of this.wds) {
                        let multiAction = {
                            input: {}
                        };

                        multiAction.input.function = "withdrawal";
                        multiAction.input.txID = wd.txID;
                        multiAction.input.voteId = wd.voteId;
                        action.input.actions.push(multiAction);

                        let roAction = {
                            foreignContract: wd.foreignContract,
                            input: {
                                function: "readOutbox",
                                contract: this.vehicle.id
                            }
                        };
                        action2.push(roAction);
                    }
                }

                /*** CALL SMARTWEAVE */
                this.$log.info("VehicleTokens : processWithdrawal :: ", JSON.stringify(action));

                let arweave = {};

                try {
                    arweave = await Arweave.init({
                        host: this.arweaveHost,
                        port: this.arweavePort,
                        protocol: this.arweaveProtocol,
                        timeout: 20000,
                        logging: true,
                    });
                } catch(e) {
                    this.$swal({
                        icon: "error",
                        html: "Failed to connect to Arweave Gateway.",
                        showConfirmButton: true,
                        allowOutsideClick: false
                    });
                    return;
                }

                let wallet;
                if (import.meta.env.VITE_ENV === "DEV") {
                    if(this.keyFile.length){
                        wallet =  JSON.parse(this.keyFile);
                    } else {
                        this.$swal({
                            icon: 'warning',
                            html: "Please attach your keyfile",
                        })
                    }        
                } else {
                    wallet = "use_wallet";
                }
                
                // FCP Part 1 - Invocation
                // 1 call to the vehicle contract (will either be single or multi-interaction)
                this.$swal({
                    icon: "info",
                    html: "Please wait while the withdrawal is sent to the contract...",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        this.$swal.showLoading()
                    },
                });
                let txid = await interactWrite(arweave, wallet, this.vehicle.id, action.input);

                /**** SWEETALERT INFO POPUP - Reading Outbox...  */
                // FCP Part 2 - Read Outbox
                // Will need a call for every token that is being transferred.
                for (let roAction of action2) {
                    this.$log.info("VehicleTokens : readContract :: ", JSON.stringify(roAction));
                    txid = await interactWrite(arweave, wallet, roAction.foreignContract, roAction.input);
                    this.$log.info("VehicleTokens : readContract :: ", txid);
                }
                
                if(Boolean(this.arweaveMine)){
                    const mineUrl = import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/mine";
                    const response = await fetch(mineUrl);
                }
                this.$log.info("VehicleTokens : sumbit :: ", "TX: " + txid);
                this.$swal.close();

                this.$router.push("/vehicles");
                }

        },
        async updateVehicle() {
            let action = {
                input: {}
            };

            let msg = "Your token withdrawals have been submitted to the Permaweb.  Your changes will be reflected in the next block.";
            if (this.vehicle.ownership === "dao") {
                msg = "Your token withdrawals have been proposed.  You'll be able to see the vote in the next block.";
            }
            this.$swal({
                icon: 'info',
                html: msg,
                showConfirmButton: true,
                allowOutsideClick: false
            });

            // Determine if multi-interaction is needed based on number of changes
            if (this.numChanges === 1) {
                // Single contract interaction
                action.input = this.buildInput(this.proposedChanges[0]);
            } else if (this.numChanges > 1) {
                // Multi-interaction
                action.input.function = 'multiInteraction';
                action.input.key = 'multi';
                action.input.note = 'Multi-Interaction';
                action.input.actions = [];

                for (let proposedChange of this.proposedChanges) {
                    let multiAction = {
                        input: {}
                    };
                    multiAction.input = this.buildInput(proposedChange);
                    action.input.actions.push(multiAction);
                }
            }

            await this.submit(action);
        },
        async submit(action) {
            /*** CALL SMARTWEAVE */
            this.$log.info("VehicleTokens : submit :: ", JSON.stringify(action));

            let arweave = {};
            try {
                arweave = await Arweave.init({
                    host: this.arweaveHost,
                    port: this.arweavePort,
                    protocol: this.arweaveProtocol,
                    timeout: 20000,
                    logging: true,
                });
            } catch(e) {
                this.$swal({
                    icon: "error",
                    html: "Failed to connect to Arweave Gateway.",
                    showConfirmButton: true,
                    allowOutsideClick: false
                });
                return;
            }
            let wallet;
            if (import.meta.env.VITE_ENV === "DEV") {
                if(this.keyFile.length){
                    wallet =  JSON.parse(this.keyFile);
                } else {
                    this.$swal({
                        icon: 'warning',
                        html: "Please attach your keyfile",
                    })
                }        
            } else {
                wallet = "use_wallet";
            }

            this.$swal({
                icon: "info",
                html: "Please wait while the token changes are sent to the contract...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.$swal.showLoading()
                },
            });

            let txid = "";
            txid = await interactWrite(arweave, wallet, this.vehicle.id, action.input);
            this.$log.info("VehicleTokens : submit :: ", "TX: " + txid);

            if (this.vehicle.ownership === "single") {
                // If the vehicle is a single owned vehicle, the Part 2 of the FCP (i.e. readOutbox) needs to be called right away.
                let input = {
                    function: "readOutbox",
                    contract: this.vehicle.id
                };

                for (let proposedChange of this.proposedChanges) {                
                    txid = await interactWrite(arweave, wallet, proposedChange.tokenId, input);
                    this.$log.info("VehicleTokens : readOutbox :: ", "TX: " + txid + " for contract: " + proposedChange.tokenId);
                }
            }

            if(Boolean(this.arweaveMine)){
                const mineUrl = import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/mine";
                const response = await fetch(mineUrl);
            }
            this.$log.info("VehicleTokens : submit :: ", "TX: " + txid);
            this.$swal.close();
            this.$router.push("/vehicles");
        },
    },
    created() {
        this.setFlags();
    },
};
</script>


<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>

<style>
.ps {
height: 750px;
}  

.swal-height {
  height: 60vh;
}

/* Tooltip container */
.tooltip {
    position: relative;
    display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    bottom: 100%;
    left: 50%;
    margin-left: -60px;
    background-color: #555555;
    color: white;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text*/
    position: absolute;
    z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
    visibility: visible;
}

.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555555 transparent transparent transparent;
}
</style>