<template>
    <div :class="editClass">
        <vehicle-members-add v-if="showAddModal" :vehicle="vehicle" @close="closeModal"></vehicle-members-add>
        <!-- Member Table -->
        <div class="col-span-3 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th v-if="allowEdits" scope="col" class="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <input type="checkbox" v-model="selectAll" :class="checkboxClass" />
                        </th>
                        <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Member ({{ Object.keys(vehicle.balances).length }})
                            <button v-if="allowEdits" @click.prevent="addMemberRow" type="button" class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                </svg>
                            </button>
                        </th>
                        <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tokens
                        </th>
                        <th v-if="allowEdits" scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            New Allocation
                        </th>
                        <th v-if="allowEdits" scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(tokens, addr) in vehicle.balances" :key="addr" class="text-xs text-gray-500 hover:bg-gray-50">
                        <td v-if="allowEdits" class="text-center px-2 py-2">
                            <input type="checkbox" :value="addr" v-model="memberRemoves" :class="checkboxClass" />
                        </td>
                        <td class="text-left px-4 py-2">
                            {{ addr }}
                        </td>
                        <td class="text-right px-4 py-2">
                            {{ formatNumber(tokens) }}
                        </td>
                        <td v-if="allowEdits" class="text-right px-4 py-2">
                            <input type="number" v-model="memberUpdates[addr]" @blur="onDirty" class="mt-1 mb-1 mr-4 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                        </td>
                        <td v-show="addRow" class="text-center px-4 py-2">
                            <button @click.prevent="removeProposal(key, 'update')" type="button" class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                    <tr v-show="addRow" class="text-xs text-gray-500 hover:bg-gray-50">
                        <td class="text-center px-2 py-2">
                            
                        </td>
                        <td class="text-left px-2 py-2">
                            <input type="text" v-model="newMember" class="mt-1 mb-1 w-full text-xs focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md">
                        </td>
                        <td class="text-right px-4 py-2">
                            0
                        </td>
                        <td class="text-right px-4 py-2">
                            <input type="number" v-model="newQty" @blur="onDirty" class="mt-1 mb-1 mr-4 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                        </td>
                        <td class="text-center px-4 py-2">
                            <button @click.prevent="addMember" type="button" class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--
        <div class="grid justify-start">
            <div class="max-w-2xl text-sm text-gray-500">
                memberRemoves Members ({{ memberRemoves.length }})
            </div>
            <div v-for="addr in memberRemoves" :key="addr" class="max-w-2xl text-sm text-gray-500">{{ formatAddr(addr) }}</div>
    
            <vehicle-status-text 
                :headerText="'Adding Members'" 
                :item1="'Creator'" 
                :item1Status="getActiveAddress === creatorAddress ? true : false" 
                :item2="'Status = Not Running'" 
                :item2Status="vehicle.status === 'stopped' || typeof vehicle.status === 'undefined' ? true : false"
                :item3="'Single Ownership'"
                :item3Status="vehicle.ownership === 'single' ? true : false"
                :footerMessage="allowVehicleAdds ? 'Members may be added or removed' : 'Votes must be passed to add/remove members'"
                :footerStatus="allowVehicleAdds ? true : false">
            </vehicle-status-text>
        </div>
        -->

        <!--- Update Information Start --->
        <div v-if="numChanges > 0" class="col-span-2 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div v-if="Object.keys(memberUpdates).length > 0">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                
                            </th>
                            <th scope="col" class="px-4 py-3 col-span-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Proposed Updates
                            </th>
                            <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(key, index) in Object.keys(memberUpdates)" :key="key" class="text-xs text-gray-500 hover:bg-gray-50">
                            <td class="px-4 py-2">
                                {{ index + 1 }}
                            </td>
                            <td class="px-4 py-2">
                                <span v-html="proposedText(key, memberUpdates[key], 'update')"></span>
                            </td>
                            <td class="px-4 py-2 text-center">
                                <button @click.prevent="removeProposal(key, 'update')" type="button" class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="memberAdds.length > 0">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                
                            </th>
                            <th scope="col" class="px-4 py-3 col-span-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Proposed Adds
                            </th>
                            <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(member, index) in memberAdds" :key="member" class="text-xs text-gray-500 hover:bg-gray-50">
                            <td class="px-4 py-2">
                                {{ index + 1 }}
                            </td>
                            <td class="px-4 py-2">
                                <span v-html="proposedText(member.recipient, member.qty, 'add')"></span>
                            </td>
                            <td class="px-4 py-2 text-center">
                                <button @click.prevent="removeProposal(member.recipient, 'add')" type="button" class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="memberRemoves.length > 0">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                
                            </th>
                            <th scope="col" class="px-4 py-3 col-span-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Proposed Removes
                            </th>
                            <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(member, index) in memberRemoves" :key="member" class="text-xs text-gray-500 hover:bg-gray-50">
                            <td class="px-4 py-2">
                                {{ index + 1 }}
                            </td>
                            <td class="px-4 py-2">
                                <span v-html="proposedText(member, vehicle.balances[member], 'remove')"></span>
                            </td>
                            <td class="px-4 py-2 text-center">
                                <button @click.prevent="removeProposal(member, 'remove')" type="button" class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
        <!--- Update Information End --->

        <div class="col-span-3 flex flex-col inline-flex">
            <!---
            <div v-if="false && allowVehicleAdds && !arConnected" class="pt-6 flex justify-start items-center">
                <button @click="arConnect" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aftrBlue hover:bg-aftrBlue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Login to ArConnect
                </button>
                <label class="pl-4 block text-sm text-gray-700">
                    You must provide a wallet in order to add members to a vehicle
                </label>
            </div>
            
            <div v-if="allowEdits">
                <button @click.prevent="addMemberModal" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                    <span class="pl-2">Add Member</span>
                </button>
            </div>
            --->
            <div v-if="numChanges > 0" class="text-right">
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
    ALLOW EDITS: {{ allowEdits }}
</template>

<script>
import numeral from "numeral";
import { mapGetters } from 'vuex';
import VehicleStatusText from './VehicleStatusText.vue';
import VehicleMembersAdd from './VehicleMembersAdd.vue';

export default {
    props: ['vehicle'],
    components: { VehicleStatusText, VehicleMembersAdd },
    data() {
        return {
            memberRemoves: [],
            memberUpdates: {},
            memberAdds: [],
            newMember: '',
            newQty: null,
            addRow: false,
            // allowVehicleAdds: false,            // Allow adding members if Creator and Not Started
            // allowVehicleRemoves: false,         // Allow removing members if Creator, Single Ownership, and Not Started
            showAddModal: false,                 // ADD THIS FUNCTIONALITY LATER
            allowEdits: false,
            isDirty: false,
        };
    },
    watch: {
        arConnected() {
            //this.setFlags();
            this.checkEditStatus();
        },
    },
    computed: {
        selectAll: {
            get() {
                return this.vehicle.balances ? this.memberRemoves.length == Object.keys(this.vehicle.balances).length : false;
            },
            set(value) {
                let selected = [];
                if(value) {
                    for(let balance in this.vehicle.balances) {
                        selected.push(balance);
                    }
                }
                this.memberRemoves = selected;
            }
        },
        editClass() {
            if (this.allowEdits) {
                return 'pt-4 w-full grid grid-cols-3 gap-4';
            } else {
                return 'pt-4 w-3/4 grid grid-cols-3 gap-4';
            }
        },
        numChanges() {
            return this.memberRemoves.length + this.memberAdds.length + Object.keys(this.memberUpdates).length;
        },
        checkboxClass() {
            return "focus:ring-aftrBlue h-4 w-4 text-aftrBlue border-gray-300 rounded";
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
    methods: {
        formatNumber(num, dec = false) {
            if (dec) {
                return numeral(num).format("0,0.0000");
            } else {
                return numeral(num).format("0,0");
            }
        },
        formatAddr(addr) {
            return addr.substring(0, 5) + '...' + addr.substring(addr.length - 5);
        },
        proposedText(recipient, qty, type) {
            if (type === 'update') {
                const currentQty = this.vehicle.balances[recipient];
                if (currentQty > +qty) {
                    return "<span style='color:#FF6C8C'><b>Burn</b></span> " + this.formatNumber(String(currentQty - +qty)) + " tokens for <b> " + recipient + "</b>";
                } else if (currentQty < +qty) {
                    return "<span style='color:green'><b>Mint</b></span> " + this.formatNumber(String(+qty - currentQty)) + " tokens for <b>" + recipient + "</b>";
                } else if (currentQty === +qty) {
                    return "No change for " + recipient;
                }
            } else if (type === 'add') {
                return "<span style='color:green'><b>Add</b></span> <b>" + recipient + "</b>, minting " + qty + " tokens";
            } else if (type === 'remove') {
                return "<span style='color:#FF6C8C'><b>Remove</b></span> <b>" + recipient + "</b>, burning " + qty + " tokens";
            }
        },
        removeProposal(member, type) {
            if (type === 'update') {
                delete this.memberUpdates[member];
            } else if (type === 'add') {
                this.memberAdds = this.memberAdds.filter((el) => el.recipient !== member);
            } else if (type === 'remove') {
                this.memberRemoves = this.memberRemoves.filter((el) => el !== member);
            }
        },
        // setFlags() {
        //     // Allow member add/remove if user is creator and (ownership is single or vehicle is not running), otherwise changes must be via vote
        //     if (this.getActiveAddress === this.creatorAddress && (this.vehicle.ownership === 'single' || this.vehicle.status !== 'started')) {
        //         this.allowVehicleAdds = true;
        //         this.allowVehicleRemoves = true;
        //     } else {
        //         this.allowVehicleAdds = false;
        //         this.allowVehicleRemoves = false;
        //     }
        // },
        checkEditStatus() {
            // If wallet is in balances, then user can edit
            if (this.getActiveAddress in this.vehicle.balances) {
                this.allowEdits = true;
            } else {
                this.allowEdits = false;
            }
        },
        onDirty() {
            // Clean up update object, remove any blank inputs
            for(let member in this.memberUpdates) {
                if (this.memberUpdates[member] === '') {
                    delete this.memberUpdates[member];
                } else {
                    this.memberUpdates[member] = parseInt(this.memberUpdates[member]);
                    if (+this.memberUpdates[member] < 0) {
                        this.memberUpdates[member] = +this.memberUpdates[member] * -1;
                    }
                    if (isNaN(+this.memberUpdates[member])){
                        this.memberUpdates[member] = '';
                    }
                }
                // Deselect any rows with checkboxes
            }

            if (this.memberRemoves.length + this.memberAdds.length + Object.keys(this.memberUpdates).length > 0) {
                this.isDirty = true;
            } else {
                this.isDirty = false;
            }
        },
        arConnect() {
            this.$store.dispatch('arConnect');
        },
        // addMemberModal(){
        //     this.showAddModal = true;
        // },
        // closeModal() {
        //     this.showAddModal = false;
        // },
        buildInput(recipient, qty, type = 'tokenChange') {
            let input = {};
            let currentQty = +this.vehicle.balances[recipient];
            
            input.function = 'propose';
            input.recipient = recipient;
            input.qty = qty;
            if (type === 'removeMember') {
                input.type = type;
                input.note = "Remove " + recipient + ", burning " + this.formatNumber(String(currentQty)) + " tokens";
            } else if (type === 'addMember') {
                input.type = type;
                input.note = "Add " + recipient + ", minting " + qty + " tokens";
            } else if (currentQty > qty) {
                input.type = 'burn';
                input.note = "Burn " + this.formatNumber(String(currentQty - qty)) + " for " + recipient;
            } else if (currentQty < qty) {
                input.type = 'mint';
                input.note = "Mint " + this.formatNumber(String(qty - currentQty)) + " for " + recipient;
            }

            return input;
        },
        submit() {
            // Determine changes
            const count = this.memberRemoves.length + this.memberAdds.length + Object.keys(this.memberUpdates).length;
            let recipient = '';
            let qty = 0;
            let action = {
                input: {},
                caller: this.getActiveAddress
            }

            if (count === 1) {
                if (this.memberRemoves.length === 1) {
                    recipient = this.memberRemoves[0];
                    qty = +this.vehicle.balances[recipient];
                    action.input = this.buildInput(recipient, qty, 'removeMember');
                } else if (this.memberAdds.length === 1) {
                    recipient = this.memberAdds[0].recipient;
                    qty = +this.memberAdds[0].qty;
                    action.input = this.buildInput(recipient, qty, 'addMember');
                } else if (Object.keys(this.memberUpdates).length === 1) {
                    recipient = Object.keys(this.memberUpdates)[0];
                    qty = +Object.values(this.memberUpdates)[0];
                    action.input = this.buildInput(recipient, qty);
                }
            } else if (count > 1) {
                action.input.function = 'multiInteraction';
                action.input.key = 'multi';
                action.input.note = 'Multi-Interaction';
                action.input.actions = [];

                if (this.memberRemoves.length > 0) {
                    for(let member in this.memberRemoves) {
                        let multiAction = {
                            input: {},
                            caller: this.getActiveAddress
                        };
                        recipient = member;
                        qty = +this.vehicle.balances[member];
                    
                        multiAction.input = this.buildInput(recipient, qty, 'removeMember');
                        action.input.actions.push(multiAction);
                    }
                }
                if (this.memberAdds.length > 0) {
                    this.memberAdds.forEach(member => {
                        let multiAction = {
                            input: {},
                            caller: this.getActiveAddress
                        };
                        recipient = member.recipient;
                        qty = +member.qty;

                        multiAction.input = this.buildInput(recipient, qty, 'addMember');
                        action.input.actions.push(multiAction);
                    });
                }
                if (Object.keys(this.memberUpdates).length > 0) {
                    for(let member in this.memberUpdates) {
                        let multiAction = {
                            input: {},
                            caller: this.getActiveAddress
                        };
                        recipient = member;
                        qty = +this.memberUpdates[member];
                    
                        multiAction.input = this.buildInput(recipient, qty);
                        action.input.actions.push(multiAction);
                    }
                }
            }
            /*** CALL SMARTWEAVE */
            this.$log.info("sampleCheckboxTable : submit :: ", JSON.stringify(action));
        },
        addMemberRow() {
            this.addRow = !this.addRow;
        },
        addMember() {
            this.memberAdds.push(
                { recipient : this.newMember, qty: +this.newQty }
            );
            this.addRow = false;
            this.newMember = '';
            this.newQty = ''

        },
        // removeMember() {
        //     let recipient = '';
        //     let qty = 0;
        //     let action = {
        //         input: {},
        //         caller: this.getActiveAddress
        //     }

        //     if (this.memberRemoves.length === 1) {
        //         recipient = this.memberRemoves[0];
        //         qty = +this.vehicle.balances[recipient];
        //         action.input = this.buildInput(recipient, qty, 'removeMember');
        //     } else if (this.memberRemoves.length > 1) {
        //         action.input.function = 'multiInteraction';
        //         action.input.key = 'multi';
        //         action.input.note = 'Multi-Interaction';
        //         action.input.actions = [];
                
        //         for(let member in this.memberRemoves) {
        //             let multiAction = {
        //                 input: {},
        //                 caller: this.getActiveAddress
        //             };
        //             recipient = member;
        //             qty = +this.vehicle.balances[member];
                
        //             multiAction.input = this.buildInput(recipient, qty, 'removeMember');
        //             action.input.actions.push(multiAction);
        //         }
        //     }
            
        //     /*** CALL SMARTWEAVE */
        //     this.$log.info(JSON.stringify(action));
        // },
        // updateAllocations() {
        //     let recipient = '';
        //     let qty = 0;
        //     let action = {
        //         input : {},
        //         caller: this.getActiveAddress
        //     }

        //     if (Object.keys(this.memberUpdates).length === 1) {
        //         recipient = Object.keys(this.memberUpdates)[0];
        //         qty = +Object.values(this.memberUpdates)[0];

        //         action.input = this.buildInput(recipient, qty);
        //     } else if (Object.keys(this.memberUpdates).length > 1) {
        //         action.input.function = 'multiInteraction';
        //         action.input.key = 'multi';
        //         action.input.note = 'Multi-Interaction';
        //         action.input.actions = [];

        //         for(let member in this.memberUpdates) {
        //             let multiAction = {
        //                 input: {},
        //                 caller: this.getActiveAddress
        //             };
        //             recipient = member;
        //             qty = +this.memberUpdates[member];
                
        //             multiAction.input = this.buildInput(recipient, qty);
        //             action.input.actions.push(multiAction);
        //         }
        //     }

        //     /*** CALL SMARTWEAVE */
        //     this.$log.info(JSON.stringify(action));
        // },
    },
    created() {
        this.checkEditStatus();
    },
    updated() {
        this.checkEditStatus();
    },
};
</script>