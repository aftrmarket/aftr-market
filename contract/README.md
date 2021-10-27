# The AFTR Protocol Contract

The AFTR state follows common practices established by early SmartWeave contracts such as CommunityXYZ.

```
{
    name: string,
    ticker: string,
    balances: {
        [addr: string]: number,                     
    },
    creator: string,                                // Wallet of creator of vehicle
    seats?: number,                                 // Number of available seats in vehicle
    ownership: 'single' | 'dao',                    // Owned by a single wallet or a DAO
    votingSystem?: 'equal' | 'weighted',            // Member votes count equally or weighted based on token balance
    status: 'stopped' | 'started' | 'expired',      // Vehicle status can be stopped, started, or expired (lock period has expired without being renewed)
    vault: {                                        // Locked member tokens
        [key: string]: [{
            balance: number,    // Positive integer
            end: number,        // At what block the lock ends.
            start: number       // At what block the lock starts.
        }]
    },
    votes: VoteInterface[],
    tokens?: [                                      // Tokens stored in vehicle
        TokenInterface,
    ],
    settings: Map<string, any>
}
```
## Interfaces

### Token Interface
```
TokenInterface {
    txId: string,
    tokenId: string,
    source: string,
    balance: number,
    start: number,          // Stamp when added
    lockLength?: number,    // Tokens can be loaned to a vehicle. A 0 value indicates no loan.
}
```

### Vote Interface
The VoteInterface is similar to the vote interface in CommunityXYZ with a few additions.

```
VoteInterface {
    status?: 'active' | 'quorumFailed' | 'passed' | 'failed';
    type?: 'mint' | 'burn' | 'indicative' | 'set' | 'addMember' | 'mintLocked' | 'removeMember' | 'assetDirective';
    caller?: String;
    id?: String;
    totalWeight?: number;
    recipient?: string;
    target?: string;
    qty?: number;
    key?: string;
    value?: any;
    note?: string;
    yays?: number;
    nays?: number;
    voted?: string[];
    start?: number;
    lockLength?: number;
  }
```

All changes to the vehicle state with the exception of deposits are handled through the voting functions. When a vote is proposed, the contract checks to see if the vehicle is owned by a single member or a DAO. If the ownership is single, then the vote processes immediately without requiring passed votes. If the ownership is DAO, then the contract using the voting system settings (votingSystem, voteLength, and quorum) to process the vote. If the vote passes, then the contract makes the proposed change to the vehicle.

## Functions

### Balance


### Transfer


### Deposit


### Withdrawal


### Propose


### Vote


## Multi-Interaction

Multi-interactions allows multiple contract actions to be bundled together in one call to the handle function in the AFTR contract. By setting the input function to 'multiInteraction' and adding an actions array containing all the specific calls separately, the contract will process each of those calls recursively. Please note the folowing regarding multi-interaction calls:
- Multiple changes to the vehicle can be processed in one call.
- Tips, token unlocking, and returning loaned tokens are handled only once in the first iteration of the multi-interaction.
- The contract limits the number of actions inside of a multi-interaction to 1000, which should be more than enough.
- If a multi-interaction is called from a DAO owned vehicle, then the number of proposed votes will be equal to the number of actions bundled into the call.

### Multi-Interaction Input
```
const actions = [
    {
        input: {
            function: 'propose',
            type: 'set',
            key: 'name',
            value: 'Alquip'
        },
        caller: 'Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I'
    },
    {
        input: {
            function: 'propose',
            type: 'set',
            key: 'ticker',
            value: 'AFTR-ALQP'
        },
        caller: 'Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I'
    },
    {
        input: {
            function: 'propose',
            type: 'set',
            key: 'status',
            value: 'started'
        },
        caller: 'Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I'
    },
    {
        input: {
            function: 'propose',
            type: 'set',
            key: 'votingSystem',
            value: 'equal'
        },
        caller: 'Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I'
    },
    {
        input: {
            function: 'propose',
            type: 'set',
            key: 'settings.voteLength', // Note how to propose changes to the settings Map
            value: 200
        },
        caller: 'Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I'
    },
]
const input: {
    function: 'multiInteraction',
    type: 'set',
    actions: actions
},
    caller: 'Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I'
}
```