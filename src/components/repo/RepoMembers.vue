<template>
    <div class="pt-4 flex justify-end">
        <div v-if="allowEdits" class="px-4 sm:px-6">
            <SwitchGroup as="div" class="flex items-center">
                <Switch v-model="uiEditMode"
                    :class="[uiEditMode ? 'bg-green-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2']">
                    <span aria-hidden="true"
                        :class="[uiEditMode ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
                </Switch>
                <SwitchLabel as="span" class="ml-3">
                    <span :class="editModeClass">Enable Editing</span>
                </SwitchLabel>
            </SwitchGroup>
        </div>
    </div>
    <perfect-scrollbar>
        <div :class="editClass">
            <!-- Member Table -->
            <div class="col-span-3 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col"
                                class="flex space-x-3 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span class="py-2">Member ({{ Object.keys(repo.balances).length }})</span>
                                <button v-if="uiEditMode" @click.prevent="addMemberRow" type="button"
                                    class="px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                    </svg>
                                </button>
                            </th>
                            <th scope="col"
                                class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Voting Power
                            </th>
                            <th v-if="uiEditMode" scope="col"
                                class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                New Allocation
                            </th>
                            <th v-if="uiEditMode" scope="col"
                                class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(tokens, addr) in repo.balances" :key="addr"
                            class="text-xs text-gray-500 hover:bg-gray-50">
                            <td class="text-left px-4 py-2 font-mono tracking-wider">
                                {{ addr }}
                            </td>
                            <td class="text-right px-4 py-2">
                                {{ formatNumber(tokens) }}
                            </td>
                            <td v-if="uiEditMode" class="text-right px-4 py-2">
                                <input type="number" v-model="memberUpdates[addr]" @blur="onDirty"
                                    class="mt-1 mb-1 mr-4 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                            </td>
                            <td v-if="uiEditMode" class="text-center px-4 py-2">
                                <button @click.prevent="removeMember(addr)" type="button"
                                    class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="addRow" class="text-xs text-gray-500 hover:bg-gray-50">
                            <td class="text-left px-2 py-2">
                                <input type="text" v-model="newMember"
                                    class="mt-1 mb-1 w-full text-xs focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md">
                            </td>
                            <td class="text-right px-4 py-2">
                                0
                            </td>
                            <td class="text-right px-4 py-2">
                                <input type="number" v-model="newQty" @blur="onDirty"
                                    class="mt-1 mb-1 mr-4 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                            </td>
                            <td class="text-center px-4 py-2">
                                <button @click.prevent="addMember" type="button"
                                    class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!--- Verify Proposal Start --->
            <div v-if="uiEditMode && numChanges > 0"
                class="col-span-2 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th colspan="2" scope="col"
                                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Proposed Changes ({{ numChanges }})
                            </th>
                            <th scope="col"
                                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cancel
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(key, index) in Object.keys(memberUpdates)" :key="key"
                            class="text-xs text-gray-500 hover:bg-gray-50">
                            <td class="px-4 py-2">
                                {{ index + 1 }}
                            </td>
                            <td class="px-4 py-2">
                                <span v-html="proposedText(key, memberUpdates[key], 'update')"></span>
                            </td>
                            <td class="px-4 py-2 text-center">
                                <button @click.prevent="removeProposal(key, 'update')" type="button"
                                    class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr v-for="(member, index) in memberAdds" :key="member"
                            class="text-xs text-gray-500 hover:bg-gray-50">
                            <td class="px-4 py-2">
                                {{ Object.keys(memberUpdates).length + index + 1 }}
                            </td>
                            <td class="px-4 py-2">
                                <span v-html="proposedText(member.recipient, member.qty, 'add')"></span>
                            </td>
                            <td class="px-4 py-2 text-center">
                                <button @click.prevent="removeProposal(member.recipient, 'add')" type="button"
                                    class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr v-for="(member, index) in memberRemoves" :key="member"
                            class="text-xs text-gray-500 hover:bg-gray-50">
                            <td class="px-4 py-2">
                                {{ Object.keys(memberUpdates).length + memberAdds.length + index + 1 }}
                            </td>
                            <td class="px-4 py-2">
                                <span v-html="proposedText(member, repo.balances[member], 'remove')"></span>
                            </td>
                            <td class="px-4 py-2 text-center">
                                <button @click.prevent="removeProposal(member, 'remove')" type="button"
                                    class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="uiEditMode && numChanges > 0"
                class="flex flex-col justify-center px-2 py-4 text-left text-xs text-gray-500 tracking-wider">
                <p class="text-aftrRed uppercase">Please review the proposed changes</p>
                {{ statusMessage }}
            </div>

            <!--- Verify Proposal End --->
            <div class="col-span-3 text-right">
                <div v-if="uiEditMode && numChanges > 0" class="inline-flex">
                    <div class="text-right">
                        <button @click.prevent="submit" type="button"
                            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z">
                                </path>
                                <path fill-rule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="pl-2">Update Repo</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </perfect-scrollbar>
</template>

<script>
import numeral from "numeral";
import { mapGetters } from 'vuex';
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import { warpWrite } from "../utils/warpUtils.js";
// import Aftr from "aftr-market";

// const client = new Aftr();

export default {
    props: ['repo', 'isMember'],
    components: { Switch, SwitchGroup, SwitchLabel },
    data() {
        return {
            /** Smartweave variables */
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            arweaveMine: import.meta.env.VITE_MINE,
            /** */

            memberRemoves: [],
            memberUpdates: {},
            memberAdds: [],
            uiEditMode: false,
            newMember: '',
            newQty: null,
            addRow: false,
            // allowRepoAdds: false,            // Allow adding members if Owner and Not Started
            // allowRepoRemoves: false,         // Allow removing members if Owner, Single Ownership, and Not Started
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
                return this.repo.balances ? this.memberRemoves.length == Object.keys(this.repo.balances).length : false;
            },
            set(value) {
                let selected = [];
                if (value) {
                    for (let balance in this.repo.balances) {
                        selected.push(balance);
                    }
                }
                this.memberRemoves = selected;
            }
        },
        editClass() {
            if (this.allowEdits && this.uiEditMode) {
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
        editModeClass() {
            if (this.uiEditMode) {
                return "text-black text-sm";
            } else {
                return "text-gray-500 text-sm";
            }
        },
        ownerAddress() {
            if (typeof this.repo.owner === 'undefined' || this.repo.owner === null || this.repo.owner === '') {
                return '~NO ONE~';
            } else {
                return this.repo.owner;
            }
        },
        statusMessage() {
            if (this.getActiveAddress === this.ownerAddress && this.repo.ownership === 'single') {
                return "Membership changes will process immediately because you are the owner of the repo";
            } else {
                return "Membership changes will be proposed as votes because this is a multiple owner repo";
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
                const currentQty = this.repo.balances[recipient];
                if (currentQty > +qty) {
                    return "<span style='color:#FF6C8C'><b>Decrease</b></span> voting power to " + this.formatNumber(String(currentQty - +qty)) + " for <b> " + recipient + "</b>";
                } else if (currentQty < +qty) {
                    return "<span style='color:green'><b>Increase</b></span> voting power to " + this.formatNumber(String(+qty - currentQty)) + " for <b>" + recipient + "</b>";
                } else if (currentQty === +qty) {
                    return "No change for " + recipient;
                }
            } else if (type === 'add') {
                return "<span style='color:green'><b>Add</b></span> <b>" + recipient + "</b>";
            } else if (type === 'remove') {
                return "<span style='color:#FF6C8C'><b>Remove</b></span> <b>" + recipient + "</b>";
            }
        },
        removeMember(member) {
            if (!this.memberRemoves.includes(member)) {
                this.memberRemoves.push(member);
                this.onDirty();
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
        //     // Allow member add/remove if user is owner and (ownership is single or repo is not running), otherwise changes must be via vote
        //     if (this.getActiveAddress === this.ownerAddress && (this.repo.ownership === 'single' || this.repo.status !== 'started')) {
        //         this.allowRepoAdds = true;
        //         this.allowRepoRemoves = true;
        //     } else {
        //         this.allowRepoAdds = false;
        //         this.allowRepoRemoves = false;
        //     }
        // },
        checkEditStatus() {
            if (this.isMember) {
                this.allowEdits = true;
            } else {
                this.allowEdits = false;
            }
        },
        onDirty() {
            // Clean up update object, remove any blank inputs
            for (let member in this.memberUpdates) {
                if (this.memberUpdates[member] === '') {
                    delete this.memberUpdates[member];
                } else {
                    this.memberUpdates[member] = parseInt(this.memberUpdates[member]);
                    if (+this.memberUpdates[member] < 0) {
                        this.memberUpdates[member] = +this.memberUpdates[member] * -1;
                    }
                    if (isNaN(+this.memberUpdates[member])) {
                        this.memberUpdates[member] = '';
                    }
                }
                // Deselect any rows with checkboxes
                if (this.memberRemoves.includes(member)) {

                    this.memberRemoves = this.memberRemoves.filter((el) => el !== member);
                }
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
            let currentQty = +this.repo.balances[recipient];

            input.function = 'propose';
            input.recipient = recipient;
            if (type === 'removeMember') {
                input.type = type;
                input.qty = qty;
                input.note = "Remove " + recipient + " with a balance of " + this.formatNumber(String(currentQty));
            } else if (type === 'addMember') {
                input.type = type;
                input.qty = qty;
                input.note = "Add " + recipient + ", adding a balance of " + qty;
            } else if (currentQty > qty) {
                input.qty = currentQty - qty;
                input.type = 'subtractBalance';
                input.note = "Subtract a balance of " + this.formatNumber(String(currentQty - qty)) + " for " + recipient;
            } else if (currentQty < qty) {
                input.qty = qty - currentQty;
                input.type = 'addBalance';
                input.note = "Add a balance of " + this.formatNumber(String(qty - currentQty)) + " for " + recipient;
            }

            return input;
        },
        async submit() {
            if (!this.allowEdits || !this.uiEditMode) {
                // No updates allowed
                return;
            }

            // this.$log.info("RepoMembers : submit :: ", JSON.stringify(input));

            // Determine changes
            const count = this.memberRemoves.length + this.memberAdds.length + Object.keys(this.memberUpdates).length;
            let recipient = '';
            let qty = 0;
            let input = {};
            if (count === 1) {
                if (this.memberRemoves.length === 1) {
                    // txid = await client.repo.removeMember(this.memberRemoves, wallet, this.repo.id, this.repo)
                    recipient = this.memberRemoves[0];
                    qty = +this.repo.balances[recipient];
                    input = this.buildInput(recipient, qty, 'removeMember');
                } else if (this.memberAdds.length === 1) {
                    //  txid = await client.repo.addMember(this.memberAdds, wallet, this.repo.id)
                    recipient = this.memberAdds[0].recipient;
                    qty = +this.memberAdds[0].qty;
                    input = this.buildInput(recipient, qty, 'addMember');
                } else if (Object.keys(this.memberUpdates).length === 1) {
                    // txid = await client.repo.updateMember(this.memberUpdates, wallet, this.repo.id,this.repo)
                    recipient = Object.keys(this.memberUpdates)[0];
                    qty = +Object.values(this.memberUpdates)[0];
                    input = this.buildInput(recipient, qty);
                }
            } else if (count > 1) {
                input.function = 'multiInteraction';
                input.key = 'multi';
                input.note = 'Multi-Interaction';
                input.actions = [];

                if (this.memberRemoves.length > 0) {
                    // txid = await client.repo.removeMember(this.memberRemoves, wallet, this.repo.id, this.repo)
                    for (let member of this.memberRemoves) {
                        let multiAction = {
                            input: {}
                        };
                        recipient = member;
                        qty = +this.repo.balances[member];

                        multiAction.input = this.buildInput(recipient, qty, 'removeMember');
                        input.actions.push(multiAction);
                    }
                }
                if (this.memberAdds.length > 0) {
                    // txid = await client.repo.addMember(this.memberAdds, wallet, this.repo.id)
                    this.memberAdds.forEach(member => {
                        let multiAction = {
                            input: {}
                        };
                        recipient = member.recipient;
                        qty = +member.qty;
                        multiAction.input = this.buildInput(recipient, qty, 'addMember');
                        input.actions.push(multiAction);
                    });
                }
                if (Object.keys(this.memberUpdates).length > 0) {
                    // txid = await client.repo.updateMember(this.memberUpdates, wallet, this.repo.id,this.repo)
                    for (let member in this.memberUpdates) {
                        let multiAction = {
                            input: {}
                        };
                        recipient = member;
                        qty = +this.memberUpdates[member];

                        multiAction.input = this.buildInput(recipient, qty);
                        input.actions.push(multiAction);
                    }
                }
            }

            this.$swal({
                icon: "info",
                html: "Please wait while member changes are sent to the contract...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.$swal.showLoading()
                },
            });

            const txid = await warpWrite(this.repo.id, input);

            this.$log.info("RepoMembers : submit :: ", "TX: " + txid);
            this.$swal.close();

            let msg = "Your membership changes have been submitted to the Permaweb.  Your changes will be reflected in the next block.";
            if (this.repo.ownership === "multi") {
                msg = "Your membership changes have been proposed.  You'll be able to see the vote in the next block.";
            }
            // alert(msg);
            this.$swal({
                icon: 'info',
                html: msg,
            })
            this.$router.push("/repos");
        },
        addMemberRow() {
            this.addRow = !this.addRow;
        },
        addMember() {
            if (this.newMember.length === 43 && +this.newQty > 0 && !(this.newMember in this.repo.balances) && (this.newMember !== this.repo.id)) {
                this.memberAdds.push(
                    { recipient: this.newMember, qty: +this.newQty }
                );
                this.addRow = false;
                this.newMember = '';
                this.newQty = ''
            }
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
        //         qty = +this.repo.balances[recipient];
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
        //             qty = +this.repo.balances[member];

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











































































































<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>
<style scoped>
.ps {
    height: 750px;
}
</style>