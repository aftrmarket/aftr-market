import { StateInterface, ActionInterface, BalanceInterface, InputInterface } from "./faces";

export function handle(state: StateInterface, action: ActionInterface) {
  const balances = state.balances;
  const leases = state.leases;
  const input = action.input;
  const caller = action.caller;

  if (input.function === "balance") {
    // View seats
    
    const target = input.target || caller;
    if (typeof target !== "string") {
      // @ts-expect-error
      throw new ContractError("Must specificy target to get balance for.");
    }
    let balance = 0;
    if (target in balances) {
      balance = balances[target];
    }
    return {result: {target, balance}};
  }

  if (input.function === "lease") {
    // Lease a seat, subtract balance from owner wallet, add to lessee
    const target = input.target;  // Address of lessee
    const qty = input.qty;        // Number of seats to lease

    // 


    if (!Number.isInteger(qty)) {
      // @ts-expect-error
      throw new ContractError('Invalid value for "qty". Must be an integer.');
    }
    if (qty <= 0 || caller === target) {
      // @ts-expect-error
      throw new ContractError("Invalid token lease.");
    }

    return {state};
  }

  if (input.function === "transfer") {
    const target = input.target;
    const qty = input.qty;
    if (!Number.isInteger(qty)) {
      // @ts-expect-error
      throw new ContractError('Invalid value for "qty". Must be an integer.');
    }
    if (!target) {
      // @ts-expect-error
      throw new ContractError("No target specified.");
    }
    if (qty <= 0 || caller === target) {
      // @ts-expect-error
      throw new ContractError("Invalid token transfer.");
    }
    if (!(caller in balances)) {
      // @ts-expect-error
      throw new ContractError("Caller doesn't own any DAO balance.");
    }
    if (balances[caller] < qty) {
      // @ts-expect-error
      throw new ContractError(`Caller balance not high enough to send ${qty} token(s)!`);
    }
    balances[caller] -= qty;
    if (target in balances) {
      balances[target] += qty;
    } else {
      balances[target] = qty;
    }
    return {state};

  }

  if (input.function === "withdrawl") {
    // Utilize Foreign Call Protocol
  }
}

// npm run build:contract
// smartweave create ./dist_contract/contract.js ./contract/init.json --key-file ./keyfile.json