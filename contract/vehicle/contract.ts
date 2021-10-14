import { smartweave } from "smartweave";
import { textChangeRangeIsUnchanged } from "typescript";
import { StateInterface, ActionInterface, BalanceInterface, InputInterface, VoteInterface } from "./faces";

const mode = 'TEST';    // If TEST, SmartWeave not used & messages print to console.

function ThrowError(msg: string) {
    if (mode === 'TEST') {
        throw('ERROR: ' + msg);
    } else {
        throw new ContractError(msg);
    }
}
declare const ContractError: any;
declare const SmartWeave: any;

// Multi-interaction variables
const multiLimit = 1000;
let multiIteration = 0;

/*** Tip Constants */
const tipCreateVehicle = 0;
const tipProposeVote = 0;
const tipVote = 0;
const tipMemberMgmt = 0;
/*** */

export async function handle(state: StateInterface, action: ActionInterface) {
    const balances = state.balances;
    //const leases = state.leases;      /*** Leasing seats from vehicle is a future enhancement / use case */
    const input = action.input;
    const caller = action.caller;
    const settings: Map<string, any> = new Map(state.settings);
    const votes: VoteInterface[] = state.votes;

    /*** MULTI-INTERACTION */
    /*** Multi-interactions allows for multiple contract interactions in a single transaction */
    /*** If multi is set to true on the action input, then the call is a multi-interaction and therefore the following applies: */
    /***    1. Tips should only be accrued once. */
    /***    2. Because multi-interactions are recursive, a maximum limit is set to protect the contract (not sure if this is necessary, but just in case :) */
    let multi = false;
    if (input.multi) {
        multi = input.multi;
        multiIteration++;
    }
    /*** */

    let block = 0;
    if (mode === 'TEST') {
        block = 130;
    } else {
        block = +SmartWeave.block.height;
    }
    
    // Find concluded votes in order to finalize
    /***
     * Look for
     * voteLength has passed OR single ownership vehicle (no voteLength required)
     * AND status of vote == 'active'
    ***/
    const concludedVotes = votes.filter(vote => ((block >= vote.start + settings.get('voteLength') || state.ownership === 'single') && vote.status === 'active'));
    if (concludedVotes.length > 0) {
        finalizeVotes(state, concludedVotes, settings.get('quorum'), settings.get('support'));
    }

    if (multiIteration <= 1) {
        // Only handle tips one time
        // Handle tips to vehicle balance holders
        /**** TODO */


        // Check for any unlocked tokens
        if (state.tokens) {
            returnUnlockedTokens(state, block);
        }
    }

    if (input.function === "balance") {
        // View balance

        const target = isArweaveAddress(input.target || caller);

        if (typeof target !== "string") {
            ThrowError("Must specificy target to get balance for.");
        }
        let balance = 0;
        if (target in balances) {
            balance = balances[target];
        }
        return { result: { target, balance } };
    }

    /*** FUNCTIONALITY NOT YET IMPLEMENTED
    if (input.function === "lease") {
        // Lease a seat, subtract balance from owner wallet, add to lessee
        const target = input.target;  // Address of lessee
        const qty = input.qty;        // Number of seats to lease

        if (!Number.isInteger(qty)) {
            ThrowError('Invalid value for "qty". Must be an integer.');
        }
        if (qty <= 0 || caller === target) {
            ThrowError("Invalid token lease.");
        }
        
        return { state };
    }
    ****/

    /******* BEGIN VOTING FUNCTIONS */
    if (input.function === "propose") {
        const voteType = input.type;
        let note = input.note;
        let target = input.target;
        let qty = input.qty;
        let key = input.key;
        let value = input.value;
        
        // Check if single ownership
        if (state.ownership === 'single') {
            // Single ownership, so caller must be creator
            if (caller !== state.creator) {
                ThrowError("Caller is not the creator of the vehicle.");
            }
        }

        // Check valid inputs, caller is member with balance
        if (!(caller in balances) || !(balances[caller] > 0)) {    
            ThrowError("Caller is not allowed to propose vote.")
        }

        // Determine weight of a vote
        // Default is equal weighting:  all votes counted equally
        // If weighed system, vote counts as much as voter's balance
        let votingSystem = 'equal';
        let totalWeight = 0;
        if (state.votingSystem) {
            votingSystem = state.votingSystem;
        }
        if (votingSystem === 'equal') {
            totalWeight = Object.keys(balances).length;
        } else if (votingSystem === 'weighted') {
            for (let member in balances) {
                totalWeight += balances[member];
            }
        } else {
            ThrowError("Invalid voting system.");
        }     

        // Validate input for member and token management
        let recipient = '';
        if (voteType === 'mint' || voteType === 'burn' || voteType === 'addMember' || voteType === 'removeMember') {
            if (!input.recipient) {
                ThrowError("Error in input.  Recipient not supplied.");
            }
            
            if (!(qty) || !(qty > 0)) {
                ThrowError("Error in input.  Quantity not supplied or is invalid.");
            }

            // Check to see if qty is too big
            if (voteType === 'mint' || voteType === 'addMember') {
                let totalTokens = 0;
                for (let wallet in balances) {
                    totalTokens += balances[wallet];
                }
                if (totalTokens + qty > Number.MAX_SAFE_INTEGER) {
                    ThrowError("Proposed quantity is too large.");
                }
            }

            // Check to see if trying to burn more than possible
            if (voteType === 'burn') {
                if (!balances[recipient]) {
                    ThrowError("Request to burn for recipient not in balances.");
                }
                if (qty > balances[recipient]) {
                    ThrowError("Invalid quantity.  Can't burn more than recipient has.");
                }
            }

            // Check for trying to remove creator
            if (voteType === 'removeMember') {
                if (recipient === state.creator) {
                    ThrowError("Can't remove creator from balances.");
                }
            }

            recipient = isArweaveAddress(input.recipient);

            if (voteType === 'mint') {
                note = "Mint " + String(qty) + " tokens for " + recipient;
            } else if (voteType === 'burn') {
                note = "Burn " + String(qty) + " tokens for " + recipient;
            } else if (voteType === 'addMember') {
                note = "Add new member, " + recipient + ", and mint " + String(qty) + " tokens";
            } else if (voteType === 'removeMember') {
                note = "Remove member, " + recipient + ", and burn their " + String(qty) + " tokens";
            }
        } else if (voteType === 'set') {
            // Validate properties
            if (!key || key === '') {
                ThrowError("Invalid Key.");
            }
            if (!value || value === '') {
                ThrowError("Invalid Value.");
            }

            // Get current value for key in state
            let currentValue = String(getStateValue(state, key));

            // Get state property that is being changed
            key = getStateProperty(key);

            note = "Change " + key + " from " + currentValue + " to " + String(value);
        } else if (voteType === 'assetDirective') {
            // A vote to direct assets
            /**** THINK ABOUT HOW THIS WOULD WORK */
            
        } else {
            ThrowError("Vote Type not supported.");
        }

        // Create Vote ID
        let voteId = String(SmartWeave.block.height) + SmartWeave.transaction.id;

        let vote: VoteInterface = {
            status: 'active',
            type: voteType,
            id: voteId,
            totalWeight: totalWeight,
            yays: 0,
            nays: 0,
            voted: [],
            start: block
        }
        if (recipient !== '') {
            vote.recipient = recipient;
        }
        if (target && target !== '') {
            vote.target = target;
        }
        if (!qty) {
            vote.qty = qty;
        }
        if (key && key !== '') {
            vote.key = key;
        }
        if (value && value !== '') {
            vote.value = value;
        }
        if (note && note !== '') {
            vote.note = note;
        }

        votes.push(vote);

        return { state };
    }

    if (input.function === "vote") {
        const voteId = input.voteId;
        const cast = input.cast;
        
        const vote = votes.find(vote => vote.id === voteId);

        if (typeof vote === 'undefined') {
            ThrowError("Vote does not exist.");
        }

        // Is caller allowed to vote?
        if (!(caller in balances)) {
            ThrowError("Caller isn't a member of the vehicle and therefore isn't allowed to vote");
        }

        // Is vote over?
        if (vote.status !== 'active') {
            ThrowError("Vote is not active.");
        }

        // Has caller already voted?
        if (vote.voted.includes(caller)) {
            ThrowError("Caller has already voted.");
        }

        let weightedVote = 1;
        // Determine weight of vote
        if (state.votingSystem === 'weighted') {
            weightedVote = balances[caller];
        } 
        
        // Record vote
        if (cast === 'yay') {
            vote.yays += weightedVote;
        } else if (cast === 'nay') {
            vote.nays += weightedVote;
        } else {
            ThrowError('Invalid vote cast.');
        }

        vote.voted.push(caller);
        return { state };
    }
    /******* END VOTING FUNCTIONS */

    if (input.function === "transfer") {
        const target = input.target;
        const qty = input.qty;
        const callerAddress = isArweaveAddress(caller);
        const targetAddress = isArweaveAddress(target);

        if (!Number.isInteger(qty)) {
            ThrowError('Invalid value for "qty". Must be an integer.');
        }
        if (!targetAddress) {
            ThrowError("No target specified.");
        }
        if (qty <= 0 || callerAddress === targetAddress) {
            ThrowError("Invalid token transfer.");
        }
        if (!(callerAddress in balances)) {
            ThrowError("Caller doesn't own any DAO balance.");
        }
        if (balances[callerAddress] < qty) {
            ThrowError(`Caller balance not high enough to send ${qty} token(s)!`);
        }
        balances[callerAddress] -= qty;
        if (targetAddress in balances) {
            balances[targetAddress] += qty;
        } else {
            balances[targetAddress] = qty;
        }
        return { state };

    }

    if (input.function === "withdrawal") {
        // Utilize Foreign Call Protocol



        // Update deposits
    }

    if (input.function === 'deposit') {
        // Transfer tokens into vehicle
        
        // Confirm tx by matching source, target, qty, tokenId, and lockLength
        /*** TODO */
        const txId = input.txId;

        const source = caller;
        const target = input.target;
        const qty = input.qty;
        const tokenId = input.tokenId;
        const depositBlock = input.depositBlock;
        let lockLength = -1;
        if (input.lockLength) {
            lockLength = input.lockLength;
        }

        /*** UPDATE THIS when tx can be validated */
        const txObj = {
            txId: txId,
            tokenId: tokenId,
            source: source,
            target: target,
            balance: qty,
            depositBlock: depositBlock,
            lockLength: -1
        };
        if (input.lockLength) {
            txObj.lockLength = input.lockLength;
        }
        /*** */

        if (!txId) {
            ThrowError("The transaction is not valid.  Tokens were not transferred to vehicle.");
        }
        // Add to psts object

        if (!state.tokens) {
            // tokens array is not in vehicle
            // @ts-expect-error
            state['tokens'] = [];
        }

        state.tokens.push(txObj);

        return { state };
    }
}

// npm run build:contract
// smartweave create ./dist_contract/contract.js ./contract/init.json --key-file ./keyfile.json


function isArweaveAddress(addy: string) {
    const address = addy.toString().trim();
    if (!/[a-z0-9_-]{43}/i.test(address)) {
        ThrowError('Invalid Arweave address.');
    }

    return address;
}

function returnUnlockedTokens(vehicle, block) {
    const unlockedTokens = vehicle.tokens.filter((token) => (token.lockLength !== -1 && token.depositBlock + token.lockLength >= block));
    unlockedTokens.forEach(token => processWithdrawal(vehicle, token));
}

function getStateProperty(key: string) {
    if (key.substring(0, 9) === 'settings.') {
        // Key is in Settings map
        key = key.substring(9);
    }
    return key;
}

function getStateValue(vehicle: StateInterface, key) {
    const settings: Map<string, any> = new Map(vehicle.settings);
    let value = '';

    if (key.substring(0, 9) === 'settings.') {
        let setting = key.substring(9);
        value = settings.get(setting);
    } else {
        value = vehicle[key];
    }
    return value;
}

function processWithdrawal(vehicle, tokenObj) {
    // Utilize the Foreign Call Protocol to return tokens to orginal source
    /**** FOREIGN CALL PROTOCOL to call transfer function on token's smart contract */


    // Update state by finding txId if Withdrawal was successful
    vehicle.tokens = vehicle.tokens.filter(token => token.txId !== tokenObj.txId);
}

function finalizeVotes(vehicle, concludedVotes, quorum, support) {
    concludedVotes.forEach( vote => {
        // If single owned, modify
        if (vehicle.ownership === 'single') {
                vote.status = 'passed';
                modifyVehicle(vehicle, vote);
        } else if (vote.totalWeight * quorum > vote.yays + vote.nays) {
            // Must pass quorum
            vote.status = 'quorumFailed';
        } else if (vote.yays / (vote.yays + vote.nays) > support) {
            // Vote passed
            vote.status = 'passed';
            modifyVehicle(vehicle, vote);
        } else {
            // Vote failed
            vote.status = 'failed';
        }
    });
}

function modifyVehicle(vehicle, vote) {
    if (vote.type === 'mint' || vote.type === 'addMember') {
        if (vote.recipient in vehicle.balances) {
            // Wallet already exists in state, add tokens
            vehicle.balances[vote.recipient] += vote.qty;
        } else {
            // Wallet is new
            vehicle.balances[vote.recipient] = vote.qty;
        }
    } else if (vote.type === 'burn') {
        vehicle.balances[vote.recipient] -= vote.qty;
    } else if (vote.type === 'removeMember') {
        delete vehicle.balances[vote.recipient];
    } else if (vote.type === 'set') {
        if (vote.key.substring(0, 9) === 'settings.') {
            // key is a setting
            let key = getStateProperty(vote.key);
            const settings: Map<string, any> = new Map(vehicle.settings);
            settings.set(key, vote.value);
        } else {
            vehicle[vote.key] = vote.value;
        }
    }
}

async function test() {
    // const state = {
    //     "name": "Test Vehicle",
    //     "ticker": "AFTR-Test-1",
    //     "balances": {
    //         "abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8": 12300,
    //         "Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I": 1000
    //     },
    //     "creator": "Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I",
    //     "ownership": "single",
    //     "settings": [
    //         [
    //             "quorum",
    //             0.5
    //         ],
    //         [
    //             "voteLength",
    //             2000
    //         ],
    //         [
    //             "lockMinLength",
    //             100
    //         ],
    //         [
    //             "lockMaxLength",
    //             10000
    //         ]
    //     ]
    // };
    const state = {
        "name": "Test Vehicle",
        "ticker": "AFTR-Test-1",
        "balances": {
            "abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8": 12300,
            "Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I": 1000
        },
        "creator": "Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I",
        "ownership": "single",
        "votingSystem": "weighted",
        "settings": [
            [ "quorum", 0.5 ],
            [ "voteLength", 2000 ],
            [ "lockMinLength", 100 ],
            [ "lockMaxLength", 10000 ]
        ],
        "votes": [
            {
                "status": 'active',
                "type": '',
                "id": 1000,
                "totalWeight": 13300,
                //"totalWeight": 2,
                "yays": 0,
                "nays": 0,
                "voted": [],
                "start": 100
            }
        ],
        "tokens": [
            {
                "tokenId": "VRT",
                "source": "abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8",
                "txId" : 'tx1fasdfoijeo0984',
                "balance": 2500,
                "depositBlock": 123,
                "lockLength": 5
            },
            {
                "tokenId": "VRT",
                "source": "joe7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8",
                "txId" : 'tx2fasdfoijeo8547',
                "balance": 1000,
                "depositBlock": 123,
                "lockLength": 10
            },
            {
                "tokenId": "XYZ",
                "source": "joe7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8",
                "txId" : 'tx3fasdfoijeo8547',
                "balance": 3400,
                "depositBlock": 123,
                "lockLength": 5
            }
        ]
    };
    const balAction = {
        input: { 
            function: 'balance'
        },
        caller: 'Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I'
    };
    const txAction = {
        input: {
            function: 'transfer',
            target: 'Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I',
            qty: 300},
        caller: 'abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8'
    };
    const depAction = {
        input: {
            function: 'deposit',
            txId: 'NOT IMPLEMENTED YET',
            depositBlock: 123,
            tokenId: 'T-SQUID',
            qty: 10000
        },
        caller: 'Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I'
    };

    const voteCastAction = {
        input: {
            function: 'vote',
            voteId: '130tx12033012',
            cast: 'yay'
        },
        caller: 'Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I'
    };

    const proposeVoteAction = {
        input: {
            function: 'propose',
            type: 'set',
            recipient: '',
            target: '',
            qty: 0,
            key: 'settings.quorum',
            value: .01,
            note: ''
        },
        caller: 'Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I'
    };

    // @ts-expect-error
    let result = await handle(state, proposeVoteAction);
    console.log(result);
    console.log(JSON.stringify(result));
}

test();