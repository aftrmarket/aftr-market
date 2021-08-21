export interface StateInterface {
    name: string,
    ticker: string,
    balances: {
        [addr: string]: number,                       // lessee wallet addr: number of seats leased
    },
    creator: string,                                // Wallet of creator of vehicle
    seats?: number,                                  // Number of available seats in vehicle
    lockPeriod?: number,                             // Period of time in blocks that vehicle runs (lockPeriod can be renewed)
    pricePerSeat?: number,                           // Price per seat is customizable
    minLength?: number,                              // Minimum amount of blocks required to lease a seat
    maxLength?: number,                              // Maximum amount of blocks required to lease a seat (maximum can't exceed lockPeriod)
    ownership: 'single' | 'dao',
    status: 'stopped' | 'started' | 'expired',      // Vehicle status can be stopped (not accepting leases), started (running), or expired (lock period has expired without being renewed)
    tokens?: [
        TokenInterface,
    ],
    leases?: {
        [lessee: string]: [                           // lessee wallet address
            {
                start: number,                            // Leased seat start time in blocks
                end: number,                              // Leased seat end time in blocks
            }
        ],
    },
    settings: []
    ,
}

export interface BalanceInterface {
    function: 'balance',
    target: string,
    balance?: number,
    ticker?: string,
}

export interface ActionInterface {
    input: any,
    caller: string,
}

export interface InputInterface {
    function: 'lease' | 'withdrawal',
    target?: string,
    qty?: number,
}

export interface TransferInterface {
    function: 'transfer',
    target: string,
    qty: number,
}

export interface DepositInterface {
    function: 'deposit',
    txId: string,
    // Won't need these when txId is working
    source?: string,
    depositBlock?: number,
    tokenId?: string,
    target?: string,
    qty?: number,
    holdLength?: number,
}

export interface StatusChangeInterface {
    function: 'statusChange',
    status: string,
}

export interface TokenInterface {
    tokenId: string,
    balances: [
        {
            source: string,
            deposits: [
                {
                    balance: number,
                    depositBlock: number,   // Stamp when added
                    holdLength?: number,    // Planning for temporary loaning of tokens to a vehicle
                }
            ]
        }
    ]
}
