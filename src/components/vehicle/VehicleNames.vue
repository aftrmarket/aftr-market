<template>
    <div class="pt-4 flex justify-end">
        <div v-if="allowEdits" class="px-4 sm:px-6">
            <SwitchGroup as="div" class="flex items-center">
                <Switch v-model="uiEditMode" :class="[uiEditMode ? 'bg-green-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2']">
                    <span aria-hidden="true" :class="[uiEditMode ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
                </Switch>
                <SwitchLabel as="span" class="ml-3">
                    <span :class="editModeClass">Enable Editing</span>
                </SwitchLabel>
            </SwitchGroup>
        </div>
    </div>
    <perfect-scrollbar>
    <div :class="editClass">
        <!-- Setting Table -->
        <div v-if="uiEditMode || settingArray.length > 0" class="shadow col-span-3 overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="flex space-x-3 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <span class="py-2">Key ({{ settingArray[0] ? settingArray[0][1].length : 0 }})</span>
                            <button v-if="uiEditMode" @click.prevent="addSettingRow" type="button" class="px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </th>
                        <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Value
                        </th>
                        <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                        </th>
                        <th v-if="uiEditMode" scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Edit Value
                        </th>
                        <th v-if="uiEditMode" scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200" v-for="val in settingArray" :key="val" >
                    <tr v-for="v in val[1]" :key="v" class="text-xs text-gray-500 hover:bg-gray-50">
                        <td class="text-left px-4 py-2 font-mono tracking-wider">
                            {{ v.name }}
                        </td>
                        <td class="text-right px-4 py-2" v-if="!uiEditMode">
                            {{ v.value}}
                        </td>
                        <td v-if="uiEditMode" class="text-right px-4 py-2">
                            <textarea v-model="memberUpdates[v.value, v.name]" @blur="onDirty" class="mt-1 mb-1 mr-4 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                        </td>
                        <td class="text-right px-4 py-2" v-if="!uiEditMode">
                            {{ v.priority}}
                        </td>
                        <td class="text-right px-4 py-2" v-if="uiEditMode">
                            <input type="number" v-model="memberPriorityUpdates[v.priority, v.name]" @blur="updatePriority" class="mt-1 mb-1 mr-4 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                        </td>
                        <!-- <td v-if="uiEditMode" class="text-right px-4 py-2">
                            <textarea v-model="memberUpdates[v.value, v.name]" @blur="onDirty" class="mt-1 mb-1 mr-4 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                        </td> -->
                        <td v-if="uiEditMode" class="text-center px-4 py-2">
                            <button @click.prevent="removeSetting(val, v)" type="button" class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                 </tbody>
                 <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-show="addRow" class="text-xs text-gray-500 hover:bg-gray-50">
                        <td class="text-left px-2 py-2">
                            <input type="text" v-model="newSettingKey" class="mt-1 mb-1 w-full text-xs focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md">
                        </td>
                        <td class="text-right px-4 py-2">
                            <textarea v-model="newSettingValue" @blur="onDirty" class="mt-1 mb-1 mr-4 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                        </td>
                        <td class="text-right px-4 py-2">
                            <input type="number" v-model="newSettingPriority" @blur="onDirty" class="mt-1 mb-1 mr-4 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                        </td>
                        <td class="text-center px-4 py-2">
                            <button @click.prevent="addSetting" type="button" class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                 </tbody>
            </table>
        </div>

         <div v-if="settingArray.length == 0 && showMessage">
            No current custom settings.
        </div>

        <!--- Verify Proposal Start --->
        <div v-if="uiEditMode && numChanges > 0" class="col-span-2 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                    <tr v-for="(value, index) in settingAdds" :key="value" class="text-xs text-gray-500 hover:bg-gray-50">
                        <td class="px-4 py-2">
                            {{ Object.keys(memberUpdates).length + index + 1 }}
                        </td>
                        <td class="px-4 py-2">
                            <span v-html="proposedText(value, value, 'add')"></span>
                        </td>
                        <td class="px-4 py-2 text-center">
                            <button @click.prevent="removeProposal(value[0], 'add')" type="button" class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                    <tr v-for="(value, index) in settingRemoves" :key="value" class="text-xs text-gray-500 hover:bg-gray-50">
                        <td class="px-4 py-2">
                            {{ Object.keys(memberUpdates).length + settingAdds.length + index + 1 }}
                        </td>
                        <td class="px-4 py-2">
                            <span v-html="proposedText(value, value.name, 'remove')"></span>
                        </td>
                        <td class="px-4 py-2 text-center">
                            <button @click.prevent="removeProposal(value, 'remove')" type="button" class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                    <tr v-for="(key, index) in Object.keys(memberPriorityUpdates)" :key="key" class="text-xs text-gray-500 hover:bg-gray-50">
                        <td class="px-4 py-2">
                            {{ index + 1 }}
                        </td>
                        <td class="px-4 py-2">
                            <span v-html="proposedText(key, memberPriorityUpdates[key], 'updatePriority')"></span>
                        </td>
                        <td class="px-4 py-2 text-center">
                            <button @click.prevent="removeProposal(key, 'updatePriority')" type="button" class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="uiEditMode && numChanges > 0" class="flex flex-col justify-center px-2 py-4 text-left text-xs text-gray-500 tracking-wider">
            <p class="text-aftrRed uppercase">Please review the proposed changes</p>
            {{ statusMessage }}
        </div>
        
        <!--- Verify Proposal End --->
        <div class="col-span-3 text-right">
            <div v-if="uiEditMode && numChanges > 0" class="inline-flex">
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
    </div>
    </perfect-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import { warpWrite } from '../utils/warpUtils.js';

const excludeSettings = [ "quorum", "support", "voteLength", "communityDescription", "communityLogo", "lockMinLength", "lockMaxLength" ];

export default {
    props: ['vehicle', 'isMember'],
    components: { Switch, SwitchGroup, SwitchLabel },
    data() {
        return {
            settingArray: [],
            settingRemoves: [],
            memberUpdates: {},
            settingAdds: [],
            uiEditMode: false,
            newSettingKey: '',
            newSettingValue: null,
            newSettingPriority: null,
            addRow: false,
            allowEdits: false,
            isDirty: false,
            updatedValue: [],
            showMessage: true,
            memberPriorityUpdates : {}
        };
    },
    mounted() {
        this.vehicle.settings.map((value,index) => {
            if (!excludeSettings.includes(value[0])) {
                this.settingArray.push([
                    value[0] , value[1]
                ])
            }
        })
    },
    watch: {
        arConnected() {
            this.checkEditStatus();
        },
    },
    computed: {
        editClass() {
            if (this.allowEdits && this.uiEditMode) {
                this.showMessage = false
                return 'pt-4 w-full grid grid-cols-3 gap-4';
            } else {
                if(this.settingArray.length == 0){
                    this.showMessage = true
                } else {
                    this.showMessage = false
                }
                return 'pt-4 w-3/4 grid grid-cols-3 gap-4';
            }
        },
        numChanges() {
            return this.settingRemoves.length + this.settingAdds.length + Object.keys(this.memberUpdates).length + Object.keys(this.memberPriorityUpdates).length;
        },
        editModeClass() {
            if (this.uiEditMode) {
                return "text-black text-sm";
            } else {
                return "text-gray-500 text-sm";
            }
        },
        ownerAddress() {
            if (typeof this.vehicle.owner === 'undefined' || this.vehicle.owner === null || this.vehicle.owner === '') {
                return '~NO ONE~';
            } else {
                return this.vehicle.owner;
            }
        },
        statusMessage() {
            if (this.getActiveAddress === this.ownerAddress && this.vehicle.ownership === 'single') {
                return "Settings changes will process immediately because you are the owner of the vehicle";
            } else {
                return "Settings changes will be proposed as votes because this is a multiple owner vehicle";
            }
        },
        ...mapGetters(['arConnected', 'getActiveAddress', 'keyFile']),
    },
    methods: {
        updatePriority(){
            for(let member in this.memberPriorityUpdates) {
                 if (this.memberPriorityUpdates[member] === null || this.memberPriorityUpdates[member].match(/^ *$/) !== null) {
                    this.$swal({
                                    icon: "error",
                                    html: "Priority should not be null or empty.",
                                    showConfirmButton: true,
                                    allowOutsideClick: false
                                });
                    this.$router.push("../vehicles");
                    return;
                }
                 this.vehicle.settings.map(item => {
                        if(item[0] == "names") {
                            let indexOfObject = item[1].findIndex(x => {
                               if(x.name == member){
                                   console.log(this.memberPriorityUpdates[member])
                                   x.priority = this.memberPriorityUpdates[member]
                               } else {
                                   x
                               }
                            })
                            return
                        }
                 })
            }
            console.log(this.vehicle.settings)
            if (this.settingRemoves.length + this.settingAdds.length + Object.keys(this.memberUpdates).length > 0 + Object.keys(this.memberPriorityUpdates).length > 0) {
                this.isDirty = true;
            } else {
                this.isDirty = false;
            }
        },
        proposedText(settingKey, settingValue, type) {
            this.showMessage = false;
            if (type === 'update') {
                return "<span style='color:#FF6C8C'><b>Change value of key </b></span> <b>" + settingKey+ "</b> to <b>" +settingValue + "</b>";
            } else if (type === 'add') {
                return "<span style='color:green'><b>Add key </b></span> <b>" + settingKey[0] + "</b>, <span style='color:green'><b>Value </b></span> <b>" + settingValue[1] + "</b>, <span style='color:green'><b>and Priority </b></span> <b>" + settingValue[2] +"</b>";
            } else if (type === 'remove') {
                return "<span style='color:#FF6C8C'><b>Remove Key </b></span> <b>" +  settingKey.name + "<span style='color:#FF6C8C'><b> Value </b></span> <b>" + settingKey.value + "<span style='color:#FF6C8C'><b> Priority </b></span> <b>" + settingKey.priority;
            } else if (type === 'updatePriority') {
                return "<span style='color:#FF6C8C'><b>Change Priority of key </b></span> <b>" + settingKey+ "</b> to <b>" +settingValue + "</b>";
            }
        },
        removeSetting(settingVal,val) {
            if (!this.settingRemoves.includes(settingVal)) {
                if(!(settingVal[0] == 'quorum' || settingVal[0] == 'support' || settingVal[0] == 'voteLength' || settingVal[0] == 'communityDescription' || settingVal[0] == 'communityLogo')){
                    this.settingRemoves.push(val);
                    this.onDirty();
                } else {
                    this.$swal({
                    icon: "error",
                    html: "Can't remove the "+ `${settingVal[0]}`+ ' from setting',
                    showConfirmButton: true,
                    allowOutsideClick: false
                });
                }
            }
        },
        removeProposal(value, type) {
            console.log(value, type,this.settingRemoves)
            if (type === 'update') {
                delete this.memberUpdates[value];
            } else if (type === 'add') {
                this.settingAdds = this.settingAdds.filter((el) => el[0] !== value);
            } else if (type === 'remove') {
                this.settingRemoves = this.settingRemoves.filter((el) => el.name !== value.name);
            } else if (type === 'updatePriority') {
                 delete this.memberPriorityUpdates[value];
            }
        },
        checkEditStatus() {
            if (this.isMember) {
                this.allowEdits = true;
            } else {
                this.allowEdits = false;
            }
        },
        onDirty() {
            // Clean up update object, remove any blank inputs
            console.log("onDirty",JSON.stringify(this.memberUpdates))
            for(let member in this.memberUpdates) {
                console.log()
                if (this.memberUpdates[member] === null || this.memberUpdates[member].match(/^ *$/) !== null) {
                    this.$swal({
                                    icon: "error",
                                    html: "Value should not be null or empty.",
                                    showConfirmButton: true,
                                    allowOutsideClick: false
                                });
                    this.$router.push("../vehicles");
                    return;
                }
                 this.vehicle.settings.map(item => {
                        if(item[0] == "names") {
                            
                            let indexOfObject = item[1].findIndex(x => {
                               if(x.name == member){
                                   
                                   x.value = this.memberUpdates[member]
                               } else {
                                   x
                               }
                            })
                            return
                        }
                    });
                    console.log("this.vehicle.settings",this.vehicle.settings)
            }

            if (this.settingRemoves.length + this.settingAdds.length + Object.keys(this.memberUpdates).length > 0 + Object.keys(this.memberPriorityUpdates).length > 0) {
                this.isDirty = true;
            } else {
                this.isDirty = false;
            }
        },
        arConnect() {
            this.$store.dispatch('arConnect');
        },
        buildInput(settingKey, settingValue, type = 'tokenChange') {
            let input = {};
            // let currentsettingValue = +this.vehicle.balances[settingKey];
            
            input.function = 'propose';
            if (type === 'removeSetting') {
                input.type = 'set',
                input.key = 'settings.'+settingKey,
                input.value = settingValue
            } else if (type === 'addSetting') {
                input.type = 'set',
                input.key = 'settings.'+settingKey,
                input.value = settingValue
            } else if (type === 'update') {
                input.type = 'set',
                input.key = 'settings.'+settingKey,
                input.value = settingValue
            } 
            return input;
        },
        async submit() {
            if (!this.allowEdits || !this.uiEditMode) {
                // No updates allowed
                return;
            }

            const count = this.settingRemoves.length + this.settingAdds.length + Object.keys(this.memberUpdates).length + Object.keys(this.memberPriorityUpdates).length;
            let settingKey = '';
            let settingValue = 0;
            let settingValue1 = 0 ;
            
            let input = {};

            if (count === 1) {
                if (this.settingRemoves.length === 1) {
                    settingValue = []
                    this.vehicle.settings.map(item => {
                        if(item[0] == "names") {
                            
                            let indexOfObject = item[1].findIndex(x => {
                               return x.name == this.settingRemoves[0].name && x.value == this.settingRemoves[0].value
                            })
                            item[1].splice(indexOfObject, 1);
                            return
                        }
                    });
                    settingKey = "names";
                    this.vehicle.settings.map((item, index) => {
                        if(item[0] == "names") {
                            settingValue.push(item[1])
                        }
                        return
                    })
                    input = this.buildInput(settingKey, settingValue[0], 'removeSetting');
                } else if (this.settingAdds.length === 1) {
                    let values = [];
                    let isTrue = false;
                    settingKey = "names"
                    settingValue = {name : this.settingAdds[0][0], value : this.settingAdds[0][1], priority : this.settingAdds[0][2]};
                    this.vehicle.settings.map((value,index) => {
                        if(value[0] == "names") {
                            value[1].push(settingValue)
                            isTrue = true
                            value[1].map(x => {
                                values.push(x)
                            })
                        }
                        return
                    })
                    settingValue1 = isTrue ? values : [settingValue]
                    input = this.buildInput(settingKey, settingValue1, 'addSetting');
                } else if (Object.keys(this.memberUpdates).length === 1) {
                    settingKey = "names";
                    settingValue = []
                    // this.updatedValue[0][1];
                    this.vehicle.settings.map(item => {
                         if(item[0] == "names") {
                            settingValue.push(item[1])
                        }
                    })
                    input = this.buildInput(settingKey, settingValue[0], 'update');
                } else if (Object.keys(this.memberPriorityUpdates).length === 1) {
                    settingKey = "names";
                    settingValue = []
                    // this.updatedValue[0][1];
                    this.vehicle.settings.map(item => {
                         if(item[0] == "names") {
                            settingValue.push(item[1])
                        }
                    })
                    input = this.buildInput(settingKey, settingValue[0], 'update');
                }
            } else if (count > 1) {
                input.function = 'multiInteraction';
                input.key = 'multi';
                input.note = 'Multi-Interaction';
                input.actions = [];

                if (this.settingRemoves.length > 0) {
                    let multiAction = {
                            input: {}
                        };
                    this.settingRemoves.forEach(setting => {
                        settingKey = "names";
                        settingValue = []
                        this.vehicle.settings.map(item => {
                            if(item[0] == "names") {
                                let indexOfObject = item[1].findIndex(x => {
                                return x.name == setting.name
                                })
                                item[1].splice(indexOfObject, 1);
                                return
                            }
                        });
                        settingKey = "names";
                        this.vehicle.settings.map((item, index) => {
                            if(item[0] == "names") {
                                settingValue.push(item[1])
                            }
                            return
                        })
                    })
                    multiAction.input = this.buildInput(settingKey, settingValue[0], 'removeSetting');
                    input.actions.push(multiAction);
                }
                if (this.settingAdds.length > 0) {
                    let values = [];
                    console.log("settingAdds", this.settingAdds.length)
                    let multiAction = {
                            input: {}
                        };
                    this.settingAdds.forEach(setting => {
                        
                        settingKey = "names";
                        settingValue = {name : setting[0], value : setting[1], priority : setting[2]};
                        values.push(settingValue)
                    });
                    this.vehicle.settings.map((value,index) => {
                        if(value[0] == "names") {
                            value[1].map(x => {
                                values.push(x)
                            })
                        }
                        return
                    })
                    
                    multiAction.input = this.buildInput(settingKey, values, 'addSetting');
                    input.actions.push(multiAction);
                }
                if (Object.keys(this.memberUpdates).length > 0) {
                    let values = [];
                    let multiAction = {
                            input: {}
                        };
                    // for(let member in this.memberUpdates) {
                        
                       this.vehicle.settings.map((value,index) => {
                        if(value[0] == "names") {
                            value[1].map(x => {
                                values.push(x)
                            })
                        }
                        return
                    })
                    // }
                     settingKey = "names";
                    multiAction.input = this.buildInput(settingKey, values, 'update');
                    input.actions.push(multiAction);
                }

                if (Object.keys(this.memberPriorityUpdates).length > 0) {
                    let values = [];
                    let multiAction = {
                            input: {}
                        };
                    // for(let member in this.memberPriorityUpdates) {
                        
                       this.vehicle.settings.map((value,index) => {
                        if(value[0] == "names") {
                            value[1].map(x => {
                                values.push(x)
                            })
                        }
                        return
                    })
                    // }
                     settingKey = "names";
                    multiAction.input = this.buildInput(settingKey, values, 'update');
                    input.actions.push(multiAction);
                }
            }

            this.$log.info("VehicleSettings : submit :: ", JSON.stringify(input));
            this.$swal({
                icon: "info",
                html: "Please wait while setting changes are sent to the contract...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.$swal.showLoading()
                },
            });

            let txid = await warpWrite(this.vehicle.id, input);
            this.$log.info("VehicleSettings : sumbit :: ", "TX: " + txid);
            this.$swal.close();

            let msg = "Your setting changes have been submitted to the Permaweb.  Your changes will be reflected in the next block.";
            if (this.vehicle.ownership === "multi") {
                msg = "Your setting changes have been proposed.  You'll be able to see the vote in the next block.";
            }
            // alert(msg);
            this.$swal({
                icon: 'info',
                html: msg,
            })
            this.$router.push("/vehicles");
        },
        addSettingRow() {
            console.log(!this.addRow)
            this.addRow = !this.addRow;
        },
        addSetting() {
            if (this.newSettingKey.length > 0 && this.newSettingValue && this.newSettingPriority) {
                this.vehicle.settings.map((value,index) => {
                        if(value[0] == "names") {
                            value[1].map(x => {
                                if(x.name == this.newSettingKey){
                                    this.$swal({
                                        icon: "error",
                                        html: "Key already exists",
                                        showConfirmButton: true,
                                        allowOutsideClick: false
                                    });
                                    this.$router.push("../vehicles");
                                    return;
                                }
                            })
                        }
                })

                
                this.settingAdds.push(
                    [this.newSettingKey , this.newSettingValue , this.newSettingPriority]
                );
                const uniqueValues = new Set(this.settingAdds.map(v => v[0]));
                if (uniqueValues.size < this.settingAdds.length) {
                    this.$swal({
                                icon: "error",
                                html: "Key already exists",
                                showConfirmButton: true,
                                allowOutsideClick: false
                            });
                            this.$router.push("../vehicles");
                            return;
                }
                this.addRow = false;
                this.newSettingKey = '';
                this.newSettingValue = '';
                this.newSettingPriority = '';
            }
        },
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