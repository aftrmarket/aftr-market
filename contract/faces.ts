export interface StateInterface {
  name: string;
  ticker: string;
  balances: {
    [addr: string]: number;                       // lessee wallet addr: number of seats leased
  };
  creator: string;                                // Wallet of creator of vehicle
  seats: number;                                  // Number of available seats in vehicle
  lockPeriod: number;                             // Period of time in blocks that vehicle runs (lockPeriod can be renewed)
  pricePerSeat: number;                           // Price per seat is customizable
  minLength: number;                              // Minimum amount of blocks required to lease a seat
  maxLength: number;                              // Maximum amount of blocks required to lease a seat (maximum can't exceed lockPeriod)
  status: 'stopped' | 'started' | 'expired';      // Vehicle status can be stopped (not accepting leases), started (running), or expired (lock period has expired without being renewed)
  leases: {
    [lessee: string]: [                           // lessee wallet address
      {
        start: number;                            // Leased seat start time in blocks
        end: number;                              // Leased seat end time in blocks
      }
    ];
  };
  settings: [];
}

export interface BalanceInterface {
  target: string;
  balance: number;
  ticker: string;
}

export interface ActionInterface {
  input: InputInterface;
  caller: string;
}

export interface InputInterface {
  function: 'balance' | 'transfer' | 'lease' | 'withdrawl';
  target?: string;
  qty?: number;
}
