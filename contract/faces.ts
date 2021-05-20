export interface StateInterface {
  ticker: string;
  reserve: string;
  balances: {
    [addr: string]: number;
  };
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
  function: 'transfer' | 'balance' | 'lease' | 'withdrawl';
  target?: string;
  qty?: number;
}
