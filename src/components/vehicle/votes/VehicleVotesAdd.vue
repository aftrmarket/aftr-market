<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" auto-reopen="true" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="green">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    New Vote
                  </DialogTitle>
                    <div class="pt-6">
                        <select v-model="voteType" id="voteType" name="voteType" @change="changeVoteType" class="mt-1 block w-3/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="" disabled selected>Vote Type</option>
                            <option value="change">Change Vehicle</option>
                            <option value="member">Member Management</option>
                            <option value="token">Tokens Management</option>
                        </select>
                    </div>
                    <div v-if="voteType === 'change'">
                        <select v-model="stateKey" @change="changeKey" id="stateKey" name="stateKey" class="mt-1 block w-3/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="" disabled selected>Key</option>
                            <option v-for="key in stateKeys" :key=key.id :value=key.id>
                                {{ key.desc }}
                            </option>
                        </select>
                        <div v-if="currentValue !== ''" class="pl-2 mb-2 text-xs text-aftrDarkGrey">
                            <p>Current Value: 
                                <span class="text-aftrBlue">{{ capitalizeText(currentValue) }}</span> 
                            </p>
                        </div>
                        <div v-if="stateKey && !stateKeys.find(key => key.id === stateKey).valid">
                            <input :type="computeStateValueType" v-model="stateValue" @keyup="recalcFields" placeholder="Value" :class="inputBox(dataValid)" />
                            <div v-if="stateValue !== ''" class="pl-2 text-xs text-aftrDarkGrey">
                                <p>
                                    Change 
                                    <span class="text-aftrBlue">{{ capitalizeText(stateKey) }}</span> 
                                    to
                                    <span class="text-aftrBlue">{{ stateValue }}</span>
                                </p>
                            </div>
                        </div>
                        <div v-else-if="stateKey">
                            <select v-model="stateValue" @change="recalcFields" id="stateValue" name="stateValue" class="mt-1 block w-3/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option value="" disabled selected>Value</option>
                                <option v-for="value in stateKeys.find(key => key.id === stateKey).valid.filter(value => value.toLowerCase() !== vehicle[stateKey.toLowerCase()].toLowerCase())" :key=value :value=value>
                                    {{ capitalizeText(value) }}
                                </option>
                            </select>
                            <div v-if="stateValue !== ''" class="pl-2 text-xs text-aftrDarkGrey">
                                <p>
                                    Change 
                                    <span class="text-aftrBlue">{{ capitalizeText(stateKey) }}</span> 
                                    to
                                    <span class="text-aftrBlue">{{ capitalizeText(stateValue) }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="voteType === 'member'">
                        <div class="col-span-2 mt-2 mb-2">
                            <input type="radio" v-model="memberVoteType" @change="refreshMember" id="add" value="add" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Add</label>
                            <input type="radio" v-model="memberVoteType" @change="refreshMember" id="remove" value="remove" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Remove</label>
                        </div>
                        <div v-if="memberVoteType === 'add'" class="flex flex-col">
                            <input type="text" v-model="memberWallet" :placeholder="memberWalletText" @keyup="recalcFields" :class="inputBox(dataValid)" />
                            <input type="number" v-model="memberQty" placeholder="# of Tokens to Mint" @keyup="recalcFields" :class="inputBox(dataValid)" />
                        </div>
                        <div v-else class="flex flex-col gap-y-2">
                            <select v-model="memberWallet" @change="changeMember" id="memberWallet" name="memberWallet" class="mt-1 w-3/4 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option value="" disabled selected>Choose Member to Remove</option>
                                <option v-for="(tokens, addr) in vehicle.balances" :key=addr :value=addr>
                                    {{ addr }}
                                </option>
                            </select>
                        </div>
                        <div v-if="memberQty !== ''" class="pl-2 text-xs text-aftrDarkGrey">
                            <p>
                                {{ capitalizeText(memberVoteType) }} 
                                <span class="text-aftrBlue">{{ walletAddressSubstr(memberWallet) }}</span>
                            </p>
                            <p>
                                <span v-if="memberVoteType === 'add'">Mint </span> 
                                <span v-else>Burn </span> 
                                <span class="text-aftrBlue">{{ formatNumber(memberQty) }}</span> 
                                tokens
                            </p>
                        </div>
                    </div>
                    <div v-else-if="voteType === 'token'">
                        <div class="col-span-2 mt-2 mb-2">
                            <input type="radio" v-model="tokenAction" @change="refreshMember" id="mint" value="mint" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Mint</label>
                            <input type="radio" v-model="tokenAction" @change="refreshMember" id="burn" value="burn" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Burn</label>
                        </div>
                        <div class="flex flex-col">
                            <select v-model="memberWallet" id="memberWallet" name="memberWallet" @change="changeMember" class="mt-1 w-3/4 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option value="" disabled selected>Apply to Member</option>
                                <option v-for="(tokens, addr) in vehicle.balances" :key=addr :value=addr>
                                    {{ addr }}
                                </option>
                            </select>
                            <input type="number" v-model="memberQty" :placeholder="tokenQtyText" :class="inputBox(dataValid)" @keyup="recalcFields" />
                            <div v-if="memberQty !== ''" class="pl-2 text-xs text-aftrDarkGrey">
                                <p>
                                    {{ capitalizeText(tokenAction) }}
                                    <span class="text-aftrBlue">{{ formatNumber(memberQty) }}</span> 
                                    tokens for 
                                    <span class="text-aftrBlue">{{ walletAddressSubstr(memberWallet) }}</span>
                                </p>
                                <p>
                                    New balance
                                    <span class="text-aftrBlue">{{ proposedMemberBalance }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8">
                        <p v-if="dataValid" class="text-sm text-gray-500">
                            Are you sure you want to propose a vote? This action cannot be undone.
                        </p>
                        <p v-else class="text-sm text-aftrRed">
                            Fill out vehicle settings to propose a vote.
                        </p>
                    </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" @click="$emit('close')" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-aftrRed hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" ref="cancelButtonRef">
                Cancel
              </button>
              <button v-if="dataValid" @click="proposeVote" type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                Propose Vote
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationIcon } from '@heroicons/vue/outline'
import { mapGetters } from 'vuex';
import numeral from "numeral";
import capitalize from '../../utils/shared.js';

export default {
    props : ['vehicle'],
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        ExclamationIcon,
    },
    data() {
        return {
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            
            voteType: '',
            stateKey: '',
            stateValue: '',
            currentValue: '',
            memberVoteType: 'add',
            memberWallet: '',
            memberQty: '',
            tokenAction: 'mint',
            proposedMemberBalance: 0,
            dataValid: false,
            stateKeys: [
                { id: "status", desc: "Status", valid: ['stopped', 'started', 'expired'] },
                { id: "name", desc: "Name" },
                { id: "ticker", desc: "Ticker" },
                { id: "creator", desc: "Creator" },
                { id: "ownership", desc: "Ownership", valid: ['single', 'dao'] },
                { id: "settings.quorum", desc: "Quorum", type: 'number' },
                { id: "settings.voteLength", desc: "Vote Length", type: 'number' },
                { id: "settings.lockMinLength", desc: "Minimum Lock Length", type: 'number' },
                { id: "settings.lockMaxLength", desc: "Maximum Lock Length", type: 'number' },
                { id: "settings.communityLogo", desc: "Community Logo" },
            ]
        }
    },
    computed : {
        memberWalletText() {
            if (this.memberVoteType === 'add') {
                return "Member Wallet to Add";
            } else {
                return "Member Wallet to Remove";
            }
        },
        computeStateValueType() {
            const stateObj = this.stateKeys.find(key => key.id === this.stateKey);
            if (stateObj.type) {
                return stateObj.type;
            } else {
                return 'text';
            }
        },
        tokenQtyText() {
            if (this.tokenAction === 'mint') {
                return "# of Tokens to Mint";
            } else {
                return "# of Tokens to Burn";
            }
        },
        voteConfirmText() {
            if (this.voteType === 'member') {
                if (this.memberVoteType === 'add') {
                    return "Voting to Add Member and Mint his/her Tokens";
                } else {
                    return "Voting to Remove Member and Burn his/her Tokens";
                }
            }
        },
        ...mapGetters(['arConnected', 'getActiveAddress']),
    },
    methods: {
        formatNumber(num, dec = false) {
            if (dec) {
                return numeral(num).format("0,0.0000");
            } else {
                return numeral(num).format("0,0");
            }
        },
        capitalizeText(text) {
            return capitalize(text);
        },
        walletAddressSubstr(addr, chars = 10) {
            if (typeof addr === 'string') {
                return addr.substr(0, chars) + '...';
            } else {
                return '';
            }
        },
        inputBox(valid) {
            if (valid) {
                return "mt-1 w-3/4 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md";
            } else {
                return "mt-1 w-3/4 focus:ring-aftrRed focus:border-aftrRed shadow-sm sm:text-sm border-gray-300 rounded-md";
            }
        },
        refreshMember() {
            this.memberWallet = '';
            this.memberQty = '';
        },
        changeKey() {
            let keyString = this.stateKey;
            const settings = new Map(this.vehicle.settings);
            let newValue;
            this.dataValid = false;
            if (keyString.substring(0, 9) === 'settings.') {
                keyString = keyString.substring(9);
                newValue = settings.get(keyString);
            } else if (typeof this.vehicle[keyString] !== 'undefined') {
                newValue = this.vehicle[keyString];
            } else {
                newValue = '';
            }
            this.currentValue = newValue.toString();
            this.stateValue = '';
        },
        isValidAddr(addr) {
            if (addr.length != 43) {
                return false;
            } else {
                return true;
            }
        },
        changeVoteType() {
            // Vote Type has changed, reset fields
            this.dataValid = false;
            if (this.voteType === 'change') {
                this.stateKey = '';
                this.stateValue = '';
                this.currentValue = '';
            }
            else if (this.voteType === 'member' || this.voteType === 'token') {
                this.memberVoteType = 'add';
                this.tokenAction = 'mint';
                this.memberWallet = '';
                this.memberQty = '';
            }
        },
        recalcFields() {
            // Fields have changed, update totals and determine if data is invalid
            this.dataValid = true;
            if (this.voteType === 'change') {
                if (this.stateKey === '' || this.stateValue === '' || this.stateValue == this.currentValue || (this.stateKey === 'creator' && !this.isValidAddr(this.stateValue))) {
                    this.dataValid = false;
                }
            } else if (this.voteType === 'member') {
                if (!this.isValidAddr(this.memberWallet)) {
                    // Invalid Wallet
                    this.dataValid = false;
                } else if (this.memberQty <= 0 || this.memberQty.toString() === '') {
                    // Invalid qty
                    this.dataValid = false;
                }
            } else if (this.voteType === 'token') {
                let newTotal = 0;
                if (this.tokenAction === 'mint') {
                    newTotal = Number(this.vehicle.balances[this.memberWallet]) + Number(this.memberQty);
                } else {
                    newTotal = Number(this.vehicle.balances[this.memberWallet]) - Number(this.memberQty);
                    if (newTotal < 0) {
                        // You can't burn more than a member has
                        this.dataValid = false;
                    }
                }
                if (this.memberQty <= 0 ) {
                    // Invalid qty
                    this.dataValid = false;
                }
                this.proposedMemberBalance = this.formatNumber(newTotal);
            }
        },
        changeMember() {
            // Lookup tokens for member
            this.memberQty = this.vehicle.balances[this.memberWallet];
            this.recalcFields();
        },
        proposeVote() {
            // Call the Propose function on the contract
            /****
            let arweave = {};
            try {
                arweave = await Arweave.init({
                    host: this.arweaveHost,
                    port: this.arweavePort,
                    protocol: this.arweaveProtocol,
                    timeout: 20000,
                    logging: true,
                });
            } catch (error) {
                this.$log.error("ERROR connecting to Arweave: " + error); // How can this ever happen? :)
                this.pageStatus = "error";
                return false;
            }
            ***/
           let input = {
               function: 'propose',
           }
           this.$log.info("VehicleVotesAdd : proposeVote :: ", "CONTRACT:  " + this.vehicle.id);
        }
    },
    setup() {
        const open = ref(true)

        return {
            open,
        }
    },
}
</script>
