<template>
    <div class="pt-4 w-full">
        <vehicle-tokens-add v-if="showAddTokens" :vehicle="vehicle" @close="closeModal"></vehicle-tokens-add>
        <!-- PSTs in Vehicle -->
        <div v-if="vehicle.tokens.length > 0" class="pt-1">
            <div class="pt-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div :class="editClass">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="w-full text-xs divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th v-if="allowTransfer" scope="col" class="pl-3 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                                        <input type="checkbox" v-model="selectAll" :class="checkboxClass" />
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Arweave Assets ({{ vehicle.tokens.length }})</th>
                                    <th scope="col" class="px-1 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Contributor</th>
                                    <th scope="col" class="px-1 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Tokens</th>
                                    <th scope="col" class="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Value (AR)</th>
                                    <th v-if="allowTransfer" scope="col" class="py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Transfer Amount</th>
                                    <th v-if="allowTransfer" scope="col" class="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Transfer To Address</th>
                                    <th v-if="allowTransfer" scope="col" class="py-3 text-left font-medium text-gray-500 uppercase tracking-wider"> </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="(pst, index) in vehicle.tokens" :key="pst.id" class="hover:bg-gray-50">
                                    <td v-if="allowTransfer" class="text-center py-2 pl-3">
                                        <input type="checkbox" :value="pst.txId" v-model="tokenSelected" :class="checkboxClass" />
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10">
                                                <img class="h-10 w-10 rounded-full" :src="`https://arweave.net/` + pst.logo" alt="" />
                                            </div>
                                            <div class="ml-4">
                                                <div class="font-medium text-gray-900"> {{ pst.name + " (" + pst.ticker + ")" }} </div>
                                                <div class="text-gray-500 font-mono"> {{ idSubstr(pst.id) }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-1 py-3 text-gray-500 font-mono">{{ idSubstr(pst.source) }}</td>
                                    <td class="text-right px-1 py-3 text-gray-500">{{ formatNumber(pst.balance) }}</td>
                                    <td class="text-right px-6 py-3 text-gray-500">{{ formatNumber(pst.total, true) }}</td>
                                    <td v-if="allowTransfer" class="pt-1">
                                        <input type="number" v-model="transferAmounts[index]" class="mt-1 mb-1 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                                    </td>
                                    <td v-if="allowTransfer" class="pt-4 pl-4 pr-1 flex items-center space-x-2">
                                        <input type="text" v-model="transferAddrs[index]" class="mt-1 mb-1 w-80 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                                        <button v-if="index == 0" @click.prevent="onFillDownClick" type="button" class="p-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td v-if="allowTransfer" class="pt-1 px-3">
                                        <button @click.prevent="onTransferPstClick(pst.txId, index)" type="submit" class="p-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrDarkGreen bg-white hover:bg-aftrDarkGreen hover:text-white focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
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
                    <tr v-for="(wd, index) in proposedChanges" :key="wd.txId" class="text-xs text-gray-500 hover:bg-gray-50">
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
                <button @click.prevent="submit" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                        <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="pl-2">Update Vehicle</span>
                </button>
            </div>
        </div>
    </div>




    {{ transferAddrs }}
    Num Changes: {{ numChanges }}<br>
    {{ proposedChanges }}
</template>

<script>
import numeral from "numeral";
import { mapGetters } from 'vuex';
import VehicleTokensAdd from './VehicleTokensAdd.vue';

export default {
    props: ['vehicle'],
    components: { VehicleTokensAdd },
    data() {
        return {
            allowAdd: false,
            allowTransfer: false,
            showAddTokens: false,
            tokenSelected: [],
            transferAddrs: [],
            transferAmounts: [],
            proposedChanges: [],

/*** TODO: HANDLE TOKENS THAT ARE LOCKED! */
/**************************************** */
        };
    },
    computed: {
        selectAll: {
            get() {
                return this.vehicle.tokens ? this.tokenSelected.length == Object.keys(this.vehicle.tokens).length : false;
            },
            set(value) {
                let selected = [];
                if(value) {
                    for(let token of this.vehicle.tokens) {
                        selected.push(token.txId);
                    }
                }
                this.tokenSelected = selected;
            }
        },
        checkboxClass() {
            return "focus:ring-aftrBlue h-4 w-4 text-aftrBlue border-gray-300 rounded";
        },
        numChanges() {
            return this.proposedChanges.length;
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
        ...mapGetters(['arConnected', 'getActiveAddress']),
    },
    watch: {
        arConnected(value) {
            this.setFlags();
        }
    },
    methods: {
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
            if (typeof addr == 'string' && addr.length == 43) {
                return true;
            } else {
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
        onTransferPstClick(txId, index) {
            const pst = this.vehicle.tokens.find( token => token.txId === txId);

            // Validate the amount
            if (this.transferAmounts[index] > 0 && this.transferAmounts[index] <= pst.balance && this.isAddrValid(this.transferAddrs[index])) {
                const foundIndex = this.proposedChanges.findIndex( tx => tx.txId === txId);
                if (foundIndex === -1) {
                    this.proposedChanges.push(
                        {
                            txId: txId,
                            target: this.transferAddrs[index],
                            qty: this.transferAmounts[index]
                        }
                    );
                    if (this.tokenSelected.includes(txId)) {
                        this.tokenSelected = this.tokenSelected.filter( (id) => id !== txId);
                    } else {
                        this.tokenSelected.push(txId);
                    }

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
            const transObj = this.vehicle.tokens.find( trans =>  trans.txId === withdrawal.txId );
            let rowText = "<span style='color:#FF6C8C'><b>Withdrawal</b></span> <b>" + this.formatNumber(withdrawal.qty) + "</b> " + transObj.name + " tokens and transfer to <b><span class='font-mono'>" + withdrawal.target + "</span></b><br/>";
            rowText += "Leaving a new balance of <b>" + this.formatNumber(transObj.balance - withdrawal.qty) + "</b> " + transObj.name + " tokens in the vehicle";
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
            input.id = proposedChange.txId;
            input.target = proposedChange.target;
            input.qty = proposedChange.qty;

            const transObj = this.vehicle.tokens.find( trans =>  trans.txId === proposedChange.txId );
            input.note = 'Withdrawal ' + this.formatNumber(proposedChange.qty) + ' ' + transObj.name + ' tokens and transfer to ' + proposedChange.target + ' leaving a new balance of ' + this.formatNumber(transObj.balance - proposedChange.qty) + ' ' + transObj.name + ' tokens in the vehicle';

            return input;
        },
        submit() {
            /*** 
             * Need to propose a vote to call the Withdrawal function.
             * type = withdrawal??
             * id = Transaction ID of the token in state.tokens
             * target = Arweave wallet address that the qty is being transferred to
             * qty = Amount of tokens being transferred
             * note = proposed change
             *** */
            let action = {
                input: {}
                //caller: this.getActiveAddress
            };
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
                        //caller: this.getActiveAddress
                    };
                    multiAction.input = this.buildInput(proposedChange);
                    action.input.actions.push(multiAction);
                }
            }

            /*** CALL SMARTWEAVE */
            console.log(JSON.stringify(action));
        },
    },
    created() {
        this.setFlags();
    },
};
</script>