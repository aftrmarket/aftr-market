/**
 * Main function that every state manipulation is passed into
 * @param {object} state 
 * @param {object} action 
 */
 export function handle (state, action) {
    // Key:value pairs for all token holders and their balances (for NFT it would only have one token holder where balance = 1)
    const balances = state.balances;
    // The ability for a contract to update its source code
    const canEvolve = state.canEvolve;
    // The current contract interaction/state manipulation
    const input = action.input;
    // The wallet of the interactor
    const caller = action.caller;
  
    // Logic to handle transferring token(s) to other wallets/contracts
    if (input.function === 'transfer') {
      const target = input.target;
      const qty = input.qty;
  
      if (!Number.isInteger(qty))
        throw new ContractError('Invalid value for "qty". Must be an integer');
  
      if (!target)
        throw new ContractError('No target specified');
  
      if (qty <= 0 || caller === target)
        throw new ContractError('Invalid token transfer');
  
      if (balances[caller] < qty)
        throw new ContractError(`Caller balance not high enough to send ${qty} token(s)!`);
  
      // Lower the token balance of the caller
      balances[caller] -= qty;
      if (target in balances) {
        // Wallet already exists in state, add new tokens
        balances[target] += qty;
      } else {
        // Wallet is new, set starting balance
        balances[target] = qty;
      }
  
      return { state }
    }
  
    // Logic to handle fetching the balance of a wallet/contract
    if (input.function === 'balance') {
      const target = input.target;
      const ticker = state.ticker;
  
      if (typeof target !== 'string')
        throw new ContractError('Must specificy target to get balance for');
  
      if (typeof balances[target] !== 'number')
        throw new ContractError('Cannnot get balance, target does not exist');
  
      return { result: { target, ticker, balance: balances[target] } };
    }

    // Logic to handle contract source evolution (updating this contract's source code)
    if(input.function === 'evolve' && canEvolve) {
      if(state.owner !== caller)
        throw new ContractError('Only the owner can evolve a contract.');
  
      state.evolve = input.value;
  
      return { state };
    }
  
    throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
  }