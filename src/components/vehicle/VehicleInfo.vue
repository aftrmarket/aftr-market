<template>
    <div class="pt-4 flex justify-end">
        <div v-if="allowEdits" class="px-4 sm:px-6">
            <SwitchGroup as="div" class="flex items-center">
                <Switch v-model="uiEditMode" @click="loadVehicleDefaults" :class="[uiEditMode ? 'bg-green-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2']">
                    <span aria-hidden="true" :class="[uiEditMode ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
                </Switch>
                <SwitchLabel as="span" class="ml-3">
                    <span :class="editModeClass">Enable Editing</span>
                </SwitchLabel>
            </SwitchGroup>
        </div>
    </div>
    <div v-if="!uiEditMode" class="pt-2">
        <vehicle-info-read :vehicle="vehicle"></vehicle-info-read>
    </div>
    <!-- EDIT MODE -->
    <div v-else>
        <form action="#" method="POST">
            <h3 class="text-xl font-light leading-6">Vehicle Information</h3>
            <div class="bg-white sm:p-6">
                <div class="pt-2 grid grid-cols-3 gap-4">
                    <label for="newName" class="block text-sm font-medium text-gray-700">Vehicle Name</label>
                    <label for="newTicker" class="block text-sm font-medium text-gray-700">Ticker</label>
                </div>
                <div class="pt-2 grid grid-cols-3 gap-4">
                    <input @change="formDirty" type="text" name="newName" v-model="newName" :class="inputBox(newName !== '')" />
                    <input @change="formDirty" type="text" name="newTicker" v-model="newTicker" :class="inputBox(newTicker !== '')" />
                    
                </div>
                <div class="pt-2 grid grid-cols-3 gap-4">
                    <div class="col-span-2">
                        <label for="newDesc" class="pt-2 block text-sm font-medium text-gray-700">Description</label>
                        <div class="mt-1">
                            <textarea @change="formDirty" id="newDesc" name="newDesc" v-model="newDesc" rows="3" class="shadow-sm focus:ring-aftrBlue focus:border-aftrBlue mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Describe your fund"></textarea>
                        </div>
                    </div>
                </div>
                <div>
                    <label for="newLogo" class="py-2 block text-sm font-medium text-gray-700">Logo</label>
                    <div class="mt-2 sm:mt-0 sm:col-span-2 pl-6">
                        <div class="flex text-sm text-gray-600">
                            <label for="newLogo" class="relative cursor-pointer bg-white rounded-md font-medium text-aftrBlue hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>Change the Logo</span>
                                <input @change="onFileChange" id="newLogo" name="newLogo" type="file" accept="image/png, image/gif, image/jpeg" class="sr-only" />
                            </label>
                        </div>
                        <p class="text-xs text-gray-500">200 x 200 PNG, JPG, or GIF</p>
                        <p class="text-xs text-aftrRed">
                            {{ fileMessage }}
                        </p>
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
                        <input @change="formDirty" type="radio" v-model="newStatus" id="started" value="started" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Start</label>
                        <input @change="formDirty" type="radio" v-model="newStatus" id="stopped" value="stopped" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Stop</label>
                        <input @change="formDirty" type="radio" v-model="newStatus" id="expired" value="expired" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Expire</label>
                    </div>
                    <div>
                        <input @change="formDirty" type="radio" v-model="newOwnership" id="single" value="single" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Single Owner</label>
                        <input @change="formDirty" type="radio" v-model="newOwnership" id="dao" value="dao" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">DAO Owned</label>
                    </div>
                    <div>
                        <input @change="formDirty" type="radio" v-model="newVotingSystem" id="equal" value="equal" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Distributed Evenly</label>
                        <input @change="formDirty" type="radio" v-model="newVotingSystem" id="weighted" value="weighted" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Weighted</label>
                    </div>
                    <label class="pt-4 pb-2  block text-sm font-medium text-gray-700">Quorum (between 0.01 - 0.99)</label>
                    <label class="pt-4 pb-2  block text-sm font-medium text-gray-700">Support (between 0.01 - 0.99)</label>
                    <label class="pt-4 pb-2  block text-sm font-medium text-gray-700">Vote Length (blocks)</label>
                    
                    <input @change="formDirty" v-model="newQuorum" class="w-3/4" type="number" name="newQuorum" :class="inputBox(quorumIsValid)" />
                    <input @change="formDirty" v-model="newSupport" class="w-3/4" type="number" name="newSupport" :class="inputBox(supportIsValid)" />
                    <input @change="formDirty" v-model="newVoteLength" class="w-3/4" type="number" name="newVoteLength" :class="inputBox(voteLengthIsValid)" />
                    <div/>
                    <div/>
                    <label class="pt-4 pb-2 grid col-span-2 block text-sm font-medium text-gray-700">Creator (transferring ownership not recommended!)</label>
                    <div/>
                    <input @change="formDirty" v-model="newCreator" class="grid col-span-2 w-3/4" type="text" name="newCreator" :class="inputBox(creatorIsValid)" />
                </div>
            </div>
            <div class="flex justify-end">
                <button v-if="isFormValid" @click.prevent="updateVehicle" type="submit" class="inline-flex justify-center py-2 px-2 border border-gray shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-transparent hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                    </svg>
                    <span class="pl-2">Modify Vehicle</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import { mapGetters } from 'vuex';
import numeral from "numeral";
import VehicleInfoRead from './VehicleInfoRead.vue';
import VehicleStatusText from './VehicleStatusText.vue';
import { interactWrite } from "smartweave";
//import { A } from '../../../dist/assets/vendor.62e455b6';


export default {
    props: ['vehicle', 'contractId'],
    components: { Switch, SwitchGroup, SwitchLabel, VehicleInfoRead, VehicleStatusText },
    data() {
        return {
            /** Smartweave variables */
            contractSourceId: import.meta.env.VITE_SMARTWEAVE_CONTRACT_SOURCE_ID,
            tagProtocol: import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL,
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            arweaveMine: import.meta.env.VITE_MINE,
            /** */
            allowVehicleEdits: false,
            statusSwitchEnabled: false,
            allowEdits: false,
            uiEditMode: false,
            isFormValid: false,
            currentVehicleSettings: null,
            newName: '',
            newTicker: '',
            newDesc: '',
            newLogo: '',
            newStatus: '',
            newOwnership: '',
            newVotingSystem: '',
            newVoteLength: 0,
            newQuorum: 0,
            newSupport: 0,
            newCreator: '',
            quorumIsValid: true,
            supportIsValid: true,
            voteLengthIsValid: true,
            creatorIsValid: true,
            totalSize: 0,
            fileInvalid: false,
            fileUpload: false,
            files: [],
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
        editModeClass() {
            if (this.uiEditMode) {
                return "text-black text-sm";
            } else {
                return "text-gray-500 text-sm";
            }
        },
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
        fileMessage() {
            if (this.fileInvalid) {
                return "Not a valid image. Please try again."
            } else if (this.totalSize === 0) {
                return "If file size is less than 100kb, upload is free.  Overwise AR fees apply.";
            } else {
                return "File size: " + this.formatNumber(this.totalSize);
            }
        },
        ...mapGetters(['arConnected', 'getActiveAddress', 'keyFile']),
    },
    methods: {
        formatNumber(num, dec = false) {
            if (dec) {
                return numeral(num).format("0,0.0000");
            } else {
                return numeral(num).format("0,0");
            }
        },
        inputBox(valid) {
            if (valid) {
                return "mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md";
            } else {
                return "mt-1 focus:ring-aftrRed focus:border-aftrRed shadow-sm sm:text-sm border-aftrRed rounded-md";
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
        loadSettings() {
            this.currentVehicleSettings = new Map(this.vehicle.settings);
        },
        loadVehicleDefaults() {
            if (this.uiEditMode) {
                this.newName = this.vehicle.name;
                this.newTicker = this.vehicle.ticker;
                this.newDesc = this.vehicle.desc;
                this.newStatus = this.vehicle.status;
                this.newOwnership = this.vehicle.ownership;
                
                if (!this.vehicle.votingSystem || this.vehicle.votingSystem === '') {
                    this.newVotingSystem = 'equal';
                } else {
                    this.newVotingSystem = this.vehicle.votingSystem;
                }
                this.newCreator = this.vehicle.creator;

                // Get the settings map values
                this.newQuorum = this.currentVehicleSettings.get('quorum');
                this.newSupport = this.currentVehicleSettings.get('support');
                this.newVoteLength = this.currentVehicleSettings.get('voteLength');
                this.newLogo = this.currentVehicleSettings.get('communityLogo');
            }
        },
        formDirty() {
            this.isFormValid = true;
            this.quorumIsValid = true;
            this.supportIsValid = true;
            this.voteLengthIsValid = true;
            this.creatorIsValid = true;

            // Validate form
            if (!this.newName || this.newName === '') {
                this.isFormValid = false;
            }
            if (!this.newTicker || this.newTicker === '') {
                this.isFormValid = false;
            }
            if (!this.newQuorum || this.newQuorum === '' || +this.newQuorum < 0.01 || +this.newQuorum > 0.99) {
                // Quarum needs to be in the following range:  0.01 - 0.99
                this.isFormValid = false;
                this.quorumIsValid = false;
            }
            if (!this.newSupport || this.newSupport === '' || +this.newSupport < 0.01 || +this.newSupport > 0.99) {
                // Quarum needs to be in the following range:  0.01 - 0.99
                this.isFormValid = false;
                this.supportIsValid = false;
            }
            if (!this.newVoteLength || this.newVoteLength === '' || !Number.isInteger(+this.newVoteLength) || +this.newVoteLength < 0) {
                // Is there a range that the vote needs to be in?
                this.isFormValid = false;
                this.voteLengthIsValid = false;
            }
            if (!this.newCreator || this.newCreator.length != 43) {
                this.isFormValid = false;
                this.creatorIsValid = false;
            }
        },
       async updateVehicle() {
        let arweave = {};
       
        arweave = await Arweave.init({
                  host: this.arweaveHost,
                  port: this.arweavePort,
                  protocol: this.arweaveProtocol,
                  timeout: 20000,
                  logging: true,
                });

            if (this.fileUpload){
                if (import.meta.env.DEV) {
                    await this.deployFile(this.files, arweave, JSON.parse(this.keyFile));
                    const mineUrl =
                            import.meta.env.VITE_ARWEAVE_PROTOCOL +
                            "://" +
                            import.meta.env.VITE_ARWEAVE_HOST +
                            ":" +
                            import.meta.env.VITE_ARWEAVE_PORT +
                            "/mine"; 
                    if(Boolean(this.arweaveMine)){                           
                        this.$log.info("VehicleInfo : updateVehicle :: ","mineUrl ",mineUrl);    
                        let response = await fetch(mineUrl);
                    }
                } else {
                    await this.deployFile(this.files, arweave, "use_wallet");
                }
            }

                this.$log.info("VehicleInfo : updateVehicle :: ", "this.newLogo ",this.newLogo)

            if (this.isFormValid) {
                // Determine what fields have changed
                let changeMap = new Map();

                if (this.newName !== this.vehicle.name) {
                    changeMap.set('name', this.newName);
                }
                if (this.newTicker !== this.vehicle.ticker) {
                    changeMap.set('ticker', this.newTicker);
                }
                if (this.newDesc !== this.vehicle.desc) {
                    changeMap.set('desc', this.newDesc);
                }
                if (this.newStatus !== this.vehicle.status) {
                    changeMap.set('status', this.newStatus);
                }
                if (this.newOwnership !== this.vehicle.ownership) {
                    changeMap.set('ownership', this.newOwnership);
                }
                if (this.newVotingSystem !== this.vehicle.votingSystem) {
                    changeMap.set('votingSystem', this.newVotingSystem);
                }
                if (this.newCreator !== this.vehicle.creator) {
                    changeMap.set('creator', this.newCreator);
                }

                // Settings
                if (this.newLogo !== this.currentVehicleSettings.get('communityLogo')) {
                    changeMap.set('settings.communityLogo', this.newLogo);
                }
                if (this.newQuorum !== this.currentVehicleSettings.get('quorum')) {
                    changeMap.set('settings.quorum', this.newQuorum);
                }
                if (this.newSupport !== this.currentVehicleSettings.get('support')) {
                    changeMap.set('settings.quorum', this.newSupport);
                }
                if (this.newVoteLength !== this.currentVehicleSettings.get('voteLength')) {
                    changeMap.set('settings.voteLength', this.newVoteLength);
                }

                this.$log.info("VehicleInfo : updateVehicle :: ", [...changeMap.entries()]);

                /**** Tip to AFTR for change */
                /*** TODO */
                /**** */

                
                let input = {
                    function: '',
                    type: 'set',
                    recipient: '',
                    target: '',
                    qty: 0,
                    key: '',
                    value: '',
                    note: ''
                };
                
                // If more than one change, build multi-interaction input
                if (changeMap.size > 1) {
                    input.function = 'multiInteraction';
                    input.key = 'multi';
                    input.note = 'Multi-Interaction';
                    
                    let actions = [];
                    for (let [key, value] of changeMap) {
                        let multiAction = {
                            input : {
                                function: 'propose',
                                type: 'set',
                                key: key,
                                value: value
                            }
                        }
                        actions.push(multiAction);
                    }
                    input.actions = actions;
                } else if (changeMap.size === 1) {
                    input.function = 'propose';
                    for (let [key, value] of changeMap) {
                        input.key = key;
                        input.value = value;
                    }
                } else {
                    // Invalid
                    return;
                }

                // Call Smartweave
                this.$log.info("VehicleInfo : updateVehicle :: ", "CALL TO SMARTWEAVE");
                this.$log.info("VehicleInfo : updateVehicle :: ", JSON.stringify(input));
                this.$log.info("VehicleInfo : updateVehicle :: ", "Contract ID: " + this.contractId);
                
                //const txid = await interactWrite(arweave, "use_wallet", this.contractId, JSON.stringify(action));
                /**** INSTEAD OF USING "use_wallet", copy the information out of your keyfile.json file and hardcode it below until I can figure out what's going on with ArConnect. */
                let wallet;
                if (import.meta.env.DEV) {
                    if(this.keyFile.length){
                        wallet =  JSON.parse(this.keyFile)
                    } else {
                        alert("Please attach your keyfile")
                    }        
                } 
                if (import.meta.env.DEV) {
                    const txid = await interactWrite(arweave, wallet, this.contractId, input);
                    this.$log.info("VehicleInfo : updateVehicle :: ", "TX: " + txid);

                    /**** IN ORDER FOR THIS TO PROCESS, YOU NEED TO RUN http://localhost:1984/mine */
                    if(Boolean(this.arweaveMine)){
                        const mineUrl = import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/mine";
                        const response = await fetch(mineUrl);
                    }
                } else {
                    const txid = await interactWrite(arweave, "use_wallet", this.contractId, input);
                    this.$log.info("VehicleInfo : updateVehicle :: ", "TX: " + txid);
                }

                this.$router.push("/vehicles");
            }
        },
        async onFileChange(e) {
            this.fileUpload = true
            const file = e.target.files[0];
            this.files = file;

            // Error Handling
            // if (file.type.substring(0, 6) !== "image/") {
            //     // Write file error message
            //     this.fileInvalid = true;
            //     this.$log.info("FILE IS NOT IMAGE");
            //     return;
            // } else {
            //     this.fileInvalid = false;
            // }


            if (this.vehicleLogo) {
                // Release the memory of the old file
                URL.revokeObjectURL(this.vehicleLogo);
            }
            this.vehicleLogo = URL.createObjectURL(file);
            this.fileInfo = file.size + ", " + file.name + ", " + file.type;
            const filename = file.name.replace(/ /g, "") + file.lastModified;

            // Total size should be < ? so that it's a free transaction
            this.totalSize += file.size;
            this.isFormValid = true
            this.$log.info("VehicleInfo : onFileChange :: ", "totalSize", this.totalSize, this.balance);

            /**** SHOULD THIS BE > 0? */
            if (this.totalSize != 0) {

            }
        },
        readFile(file) {
            // Thanks to https://dilshankelsen.com/convert-file-to-byte-array/
            return new Promise((resolve, reject) => {
                // Create file reader
                let reader = new FileReader();

                // Register event listeners
                reader.addEventListener("loadend", e => resolve(e.target.result));
                reader.addEventListener("error", reject);

                this.$log.info("VehicleInfo : readFile :: ", "readAsArrayBuffer",file)
                // Read file
                reader.readAsArrayBuffer(file);
            });
        },
        async getAsByteArray(file) {
            return new Uint8Array(await this.readFile(file));
        },
        async deployFile(file, arweave, wallet) {

            const tx = await arweave.createTransaction({
                data: await this.getAsByteArray(file)
            }, wallet);

            tx.addTag("Content-Type", file.type);
            //tx.addTag("User-Agent", `AFTR.Market/this.version`);
            tx.addTag("User-Agent", "AFTR.Market")

            await arweave.transactions.sign(tx, wallet);
            await arweave.transactions.post(tx);
            this.newLogo = tx.id;
            
            this.$log.info("VehicleInfo : deployFile :: ", "txid", tx.id);
        },
    },
    created() {
        this.checkEditStatus();
        this.loadSettings();
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