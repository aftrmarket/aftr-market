import { StateInterface, ActionInterface, BalanceInterface, InputInterface } from "./faces";

export function handle(state: StateInterface, action: ActionInterface) {
  const balances = state.balances;
  const input = action.input;
  const caller = action.caller;

  if (input.function === 'transfer') {

  }

  if (input.function === 'balance') {

  }

  if (input.function === 'lease') {

  }
}