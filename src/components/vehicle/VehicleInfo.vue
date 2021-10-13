<template>
    <div class="pt-4">
        <div class="flex justify-end">
            <div v-if="allowEdits" class="px-4 sm:px-6">
                <SwitchGroup as="div" class="flex items-center">
                    <Switch v-model="uiEditMode" @click="loadVehicleDefaults" :class="[uiEditMode ? 'bg-green-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2']">
                        <span aria-hidden="true" :class="[uiEditMode ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
                    </Switch>
                    <SwitchLabel as="span" class="ml-3">
                        <span class="">Enable Editing</span>
                    </SwitchLabel>
                </SwitchGroup>
            </div>
        </div>
        <div class="flex items-center justify-between">
            <div class="px-4 py-5 sm:px-6">
                <h2 id="applicant-information-title" class="text-lg leading-6 font-medium text-gray-900">
                    {{ vehicle.name }}
                </h2>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    <span class="text-lg text-black">{{ vehicle.ticker }}</span>
                </p>
            </div>
            <div class="pr-6">
                <p class="text-gray-900">Current Value: <span class="px-2 py-3 sm:px-6 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{ formatNumber(vehicle.treasury, true) }} AR</span></p>
            </div>
        </div>
        <div class="flex items-start justify-between">
            <div>
                <div class="px-4 sm:px-6 max-w-2xl text-sm text-gray-500">Status</div>
                <div v-if="!allowVehicleEdits" class="flex items-center justify-between pb-4">
                    <div class="px-4 sm:px-6"><span :class="vehicleStatusAlert">{{ vehicleStatusText }}</span></div>
                </div>
                <div v-else class="px-4 sm:px-6">
                    <SwitchGroup as="div" class="flex items-center">
                        <Switch v-model="statusSwitchEnabled" @click="statusChange" :class="[statusSwitchEnabled ? 'bg-green-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2']">
                            <span aria-hidden="true" :class="[statusSwitchEnabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
                        </Switch>
                        <SwitchLabel as="span" class="ml-3">
                            <span :class="vehicleStatusAlert">{{ vehicleStatusText }}</span>
                        </SwitchLabel>
                    </SwitchGroup>
                </div>
            </div>
            <vehicle-status-text 
                :headerText="'Editing'" 
                :item1="'Creator'" 
                :item1Status="getActiveAddress === creatorAddress ? true : false" 
                :item2="'Status = Not Running'" 
                :item2Status="vehicle.status === 'stopped' || typeof vehicle.status === 'undefined' ? true : false"
                :item3="'Single Ownership'"
                :item3Status="vehicle.ownership === 'single' ? true : false"
                :footerMessage="allowVehicleEdits ? 'Edits allowed' : 'Votes must be passed to edit'"
                :footerStatus="allowVehicleEdits ? true : false">
            </vehicle-status-text>
        </div>

        <!--- NEW CODE --->
        <div v-if="uiEditMode">

 <!-- Vehicle Info -->
                <form action="#" method="POST">
                    <h3 class="text-xl font-light leading-6">Vehicle Information</h3>
                    <div class="bg-white sm:p-6">
                        <div class="pt-2 grid grid-cols-3 gap-4">
                            <label for="newName" class="block text-sm font-medium text-gray-700">Vehicle Name</label>
                            <label for="newTicker" class="block text-sm font-medium text-gray-700">Ticker</label>
                        </div>
                        <div class="pt-2 grid grid-cols-3 gap-4">
                            <input type="text" name="newName" v-model="newName" />
                            <input type="text" name="newTicker" v-model="newTicker" />
                            
                        </div>
                        <div class="pt-2 grid grid-cols-3 gap-4">
                            <div class="col-span-2">
                                <label for="newDesc" class="pt-2 block text-sm font-medium text-gray-700">Description</label>
                                <div class="mt-1">
                                    <textarea id="newDesc" name="newDesc" v-model="newDesc" rows="3" class="shadow-sm focus:ring-aftrBlue focus:border-aftrBlue mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Describe your fund"></textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label for="newLogo" class="py-2 block text-sm font-medium text-gray-700">Logo</label>
                            <div class="mt-2 sm:mt-0 sm:col-span-2 pl-6">
                                <div class="flex text-sm text-gray-600">
                                    <label for="newLogo" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload a file</span>
                                        <input @change="onFileChange" id="newLogo" name="newLogo" type="file" class="sr-only" />
                                    </label>
                                </div>
                                <p class="text-xs text-gray-500">200 x 200 PNG, JPG, or GIF</p>
                            </div>
                        </div>
                    </div>
                    <h3 class="mt-4 border-t border-gray-200 pt-4 text-xl font-light leading-6">Settings</h3>
                    <div class="bg-white sm:p-6">
                        <div class="pt-2 grid grid-cols-3 flex items-center gap-x-4">
                            <label class="block text-sm font-medium text-gray-700">Status</label>
                            <label class="block text-sm font-medium text-gray-700">Vehicle Ownership</label>
                            <label class="block text-sm font-medium text-gray-700">Voting System</label>
                            <div>
                                <input type="radio" v-model="newStatus" id="started" value="started" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Start</label>
                                <input type="radio" v-model="newStatus" id="stopped" value="stopped" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Stop</label>
                                <input type="radio" v-model="newStatus" id="expired" value="expired" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Expire</label>
                            </div>
                            <div>
                                <input type="radio" v-model="newOwnership" id="single" value="single" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Single Owner</label>
                                <input type="radio" v-model="newOwnership" id="dao" value="dao" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">DAO Owned</label>
                            </div>
                            <div>
                                <input type="radio" v-model="newVotingSystem" id="equal" value="equal" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Distributed Evenly</label>
                                <input type="radio" v-model="newVotingSystem" id="weighted" value="weighted" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Weighted</label>
                            </div>
                            <label class="pt-4 pb-2  block text-sm font-medium text-gray-700">Quorum</label>
                            <label class="pt-4 pb-2  block text-sm font-medium text-gray-700">Vote Length</label>
                            <div/>
                            <input v-model="newQuorum" class="w-3/4" type="number" name="newQuorum" />
                            <input v-model="newVoteLength" class="w-3/4" type="number" name="newVoteLength" />
                            <div/>
                            <label class="pt-4 pb-2 grid col-span-2 block text-sm font-medium text-gray-700">Creator</label>
                            <div/>
                            <input v-model="newCreator" class="grid col-span-2 w-3/4" type="text" name="newCreator"/>
                        </div>
                    </div>
                </form>

        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { mapGetters } from 'vuex';
import numeral from "numeral";
import VehicleStatusText from './VehicleStatusText.vue';


export default {
    props: ['vehicle', 'contractId'],
    components: { Switch, SwitchGroup, SwitchLabel, VehicleStatusText },
    data() {
        return {
            allowVehicleEdits: false,
            statusSwitchEnabled: false,
            allowEdits: false,
            uiEditMode: false,
            newName: '',
            newTicker: '',
            newDesc: '',
            newLogo: '',
            newStatus: '',
            newOwnership: '',
            newVotingSystem: '',
            newVoteLength: 0,
            newQuorum: 0,
            newCreator: ''
        };
    },
    watch: {
        arConnected(value) {
            // Allow edits if user is creator and vehicle is not running, otherwise changes must be via vote
            this.checkEditStatus();
        },
        statusSwitchEnabled() {
            // If vehicle is turned on, a vote must take place to turn it off (unless it's a single-owned vehicle)
            if (this.getActiveAddress === this.creatorAddress && (this.vehicle.status !== 'started' || this.vehicle.ownership === 'single')) {
                this.allowVehicleEdits = true;
            } else {
                this.allowVehicleEdits = false;
            }
        }
    },
    computed: {
        vehicleStatusAlert() {
            if (typeof this.vehicle.status === 'undefined' || this.vehicle.status === 'stopped' || this.vehicle.status === '') {
                return "capitalize px-2 sm:px-4 py-3 inline-flex leading-3 text-sm font-semibold rounded-full bg-red-100 text-red-800";
            } else if (this.vehicle.status === 'started') {
                return "capitalize px-2 sm:px-4 py-3 inline-flex leading-3 text-sm font-semibold rounded-full bg-green-100 text-green-800";
            } else {
                return "capitalize px-2 sm:px-4 py-3 inline-flex leading-3 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800";
            }
        },
        vehicleStatusText() {
            if (typeof  this.vehicle.status === 'undefined' || this.vehicle.status === 'stopped' ||this.vehicle.status === '') {
                return 'not running';
            } else {
                return this.vehicle.status;
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
    methods: {
        formatNumber(num, dec = false) {
            if (dec) {
                return numeral(num).format("0,0.0000");
            } else {
                return numeral(num).format("0,0");
            }
        },
        statusChange() {
            if (this.statusSwitchEnabled) {
                this.vehicle.status = 'started';
            } else {
                this.vehicle.status = 'stopped';
            }
            /***** Update the contract *****/
            /***** TODO - Will be ASYNC *****/
        },
        editingCheckbox(bool) {
            if (bool) {
                return '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>';
            } else {
                return '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>';
            }
        },
        checkEditStatus() {
            if (this.getActiveAddress === this.creatorAddress && (this.vehicle.status !== 'started' || this.vehicle.ownership === 'single')) {
                this.allowVehicleEdits = true;
                if (this.vehicle.status === 'started') {
                    this.statusSwitchEnabled = true;
                } else {
                    this.statusSwitchEnabled = false;
                }
            } else {
                this.allowVehicleEdits = false;
            }
            // If wallet is in balances, then user can edit
            if (this.getActiveAddress in this.vehicle.balances) {
                this.allowEdits = true;
            } else {
                this.allowEdits = false;
            }
        },
        onEditToggle() {
            if (this.uiEditMode) {
                this.uiEditMode = false;
            } else {
                this.uiEditMode = true;
            }
            
        },
        loadVehicleDefaults() {
            if (this.uiEditMode) {
                this.newName = this.vehicle.name;
                this.newTicker = this.vehicle.ticker;
                this.newDesc = this.vehicle.desc;
                this.newLogo = this.vehicle.logo;
                this.newStatus = this.vehicle.status;
                this.newOwnership = this.vehicle.ownership;
                
                if (!this.vehicle.votingSystem || this.vehicle.votingSystem === '') {
                    this.newVotingSystem = 'equal';
                } else {
                    this.newVotingSystem = this.vehicle.votingSystem;
                }
                this.newCreator = this.vehicle.creator;

                // Get the settings map values
                const settings = new Map(this.vehicle.settings);
                this.newQuorum = settings.get('quorum');
                this.newVoteLength = settings.get('voteLength');
                
            }
        }
    },
    created() {
        this.checkEditStatus();
    },
    updated() {
        this.checkEditStatus();
    },
    setup() {
        //const statusSwitchEnabled = ref(false)

        //return { statusSwitchEnabled, }
    },
};
</script>