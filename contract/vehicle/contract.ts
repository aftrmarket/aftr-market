import { textChangeRangeIsUnchanged } from "typescript";
import { StateInterface, ActionInterface, BalanceInterface, InputInterface } from "./faces";

const mode = 'TEST';

function ThrowError(msg: string) {
    if (mode === 'TEST') {
        throw('ERROR: ' + msg);
    } else {
        // @ts-expect-error
        throw new ContractError(msg);
    }
}

export async function handle(state: StateInterface, action: ActionInterface) {
    const balances = state.balances;
    const leases = state.leases;
    const input = action.input;
    const caller = action.caller;

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

    if (input.function === "statusChange") {
        const status = input.status;
        if (!status) {
            ThrowError("No status was supplied.");
        } 

        if (status !== 'stopped' && status !== 'started' && status !== 'expired') {
            ThrowError("Invalid status");
        }

        // Only creator on a single owned vehicle can change the status
        if (caller !== state.creator || state.ownership !== 'single') {
            ThrowError("The status can't be changed because either the creator is not initiating the change or the vehicle is not a single ownership vehicle.");
        }

        if (status === state.status) {
            ThrowError("Invalid status change requested.");
        }

        state.status = status;

        return { state };
    }

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
    }

    if (input.function === 'deposit') {
        // Transfer tokens into vehicle
        
        // Confirm tx
        /*** TODO */
        const txId = input.txId;
        if (!txId) {
            ThrowError("The transaction is not valid.  Tokens were not transferred to vehicle.");
        }

        // Add to psts object
        /** No validation needed b/c the information will be in the tx */

        /** TODO:  Change to obtain from Tx */
        const target = input.target;
        const qty = input.qty;
        const tokenId = input.tokenId;
        const depositBlock = input.depositBlock;
        let holdLength = -1;
        if (input.holdLength) {
            holdLength = input.holdLength;
        }
        /** */

        if (!state.tokens) {
            // tokens array is not in vehicle
            // @ts-expect-error
            state['tokens'] = [];
        }

        const foundToken = state.tokens.find(token => token.tokenId === tokenId);

        if (foundToken) {
            // Token was found, now look for source
            const foundSource = foundToken.balances.find(b => b.source === caller);

            if (foundSource) {
                // Source was found, so add to the source's deposit array
                const depositObj = {
                    txId: txId,
                    balance: qty,
                    depositBlock: depositBlock,
                    holdLength: holdLength
                }
                foundSource.deposits.push(depositObj);
            } else {
                // Source address not found, add new source to balances
                const balanceObj = {
                    source: caller,
                    deposits: [
                        {
                            txId: txId,
                            balance: qty,
                            depositBlock: depositBlock,
                            holdLength: holdLength
                        }
                    ]
                };
                // @ts-expect-error
                foundToken.balances.push(balanceObj);
            }
        } else {
            // Token is not already stored in vehicle
            const tokenObj = {
                tokenId: tokenId,
                balances: [
                    {
                        source: caller,
                        deposits: [
                            {
                                txId: txId,
                                balance: qty,
                                depositBlock: depositBlock,
                                holdLength: holdLength
                            }
                        ]
                    }
                ]
            };
            // @ts-expect-error
            state.tokens.push(tokenObj);
        }
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
        "settings": [
            [ "quorum", 0.5 ],
            [ "voteLength", 2000 ],
            [ "lockMinLength", 100 ],
            [ "lockMaxLength", 10000 ]
        ],
        "tokens": [{
            "tokenId": "VRT",
            "balances": [{
                "source": "abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8",
                "deposits": [{
                    "txId" : 'alsdkfjasdl;fjasa;lksdjfa;sl',
                    "balance": 2500,
                    "depositBlock": 123,
                    "holdLength": -1
                }]
            }]
        }]
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
            source: '',
            depositBlock: 123,
            tokenId: 'VRT',
            qty: 2500
        },
        caller: 'abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8'
    };

    // @ts-expect-error
    let result = await handle(state, depAction);
    console.log(result);
    console.log(JSON.stringify(result));
}

test();