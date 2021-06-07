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
      //throw new ContractError("Must specificy target to get balance for.");
    }
    let balance = 0;
    if (target in balances) {
      balance = balances[target];
    }
    return {result: {target, balance}};
  }

  if (input.function === "transfer") {
    // Add leased seats to balance array
    const target = input.target;
    const qty = input.qty;
    if (!Number.isInteger(qty)) {
      //throw new ContractError('Invalid value for "qty". Must be an integer.');
    }
    if (!target) {
      //throw new ContractError("No target specified.");
    }
    if (qty <= 0 || caller === target) {
      //throw new ContractError("Invalid token transfer.");
    }
    if (!(caller in balances)) {
      //throw new ContractError("Caller doesn't own any DAO balance.");
    }
    if (balances[caller] < qty) {
      //throw new ContractError(`Caller balance not high enough to send ${qty} token(s)!`);
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