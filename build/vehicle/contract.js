// contract/vehicle/contract.ts
var mode = "TEST";
function ThrowError(msg) {
  if (mode === "TEST") {
    throw "ERROR: " + msg;
  } else {
    throw new ContractError(msg);
  }
}
async function handle(state, action) {
  const balances = state.balances;
  const leases = state.leases;
  const input = action.input;
  const caller = action.caller;
  if (state.tokens) {
    const block = 130;
    returnUnlockedTokens(state, block);
  }
  if (input.function === "balance") {
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
    if (status !== "stopped" && status !== "started" && status !== "expired") {
      ThrowError("Invalid status");
    }
    if (caller !== state.creator || state.ownership !== "single") {
      ThrowError("The status can't be changed because either the creator is not initiating the change or the vehicle is not a single ownership vehicle.");
    }
    if (status === state.status) {
      ThrowError("Invalid status change requested.");
    }
    state.status = status;
    return { state };
  }
  if (input.function === "lease") {
    const target = input.target;
    const qty = input.qty;
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
  }
  if (input.function === "deposit") {
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
    const txObj = {
      txId,
      tokenId,
      source,
      target,
      balance: qty,
      depositBlock,
      lockLength: -1
    };
    if (input.lockLength) {
      txObj.lockLength = input.lockLength;
    }
    if (!txId) {
      ThrowError("The transaction is not valid.  Tokens were not transferred to vehicle.");
    }
    if (!state.tokens) {
      state["tokens"] = [];
    }
    state.tokens.push(txObj);
    return { state };
  }
}
function isArweaveAddress(addy) {
  const address = addy.toString().trim();
  if (!/[a-z0-9_-]{43}/i.test(address)) {
    ThrowError("Invalid Arweave address.");
  }
  return address;
}
function returnUnlockedTokens(vehicle, block) {
  const unlockedTokens = vehicle.tokens.filter((token) => token.lockLength !== -1 && token.depositBlock + token.lockLength >= block);
  unlockedTokens.forEach((token) => processWithdrawal(vehicle, token));
}
function processWithdrawal(vehicle, tokenObj) {
  vehicle.tokens = vehicle.tokens.filter((token) => token.txId !== tokenObj.txId);
}
async function test() {
  const state = {
    "name": "Test Vehicle",
    "ticker": "AFTR-Test-1",
    "balances": {
      "abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8": 12300,
      "Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I": 1e3
    },
    "creator": "Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I",
    "ownership": "single",
    "settings": [
      ["quorum", 0.5],
      ["voteLength", 2e3],
      ["lockMinLength", 100],
      ["lockMaxLength", 1e4]
    ],
    "tokens": [
      {
        "tokenId": "VRT",
        "source": "abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8",
        "txId": "tx1fasdfoijeo0984",
        "balance": 2500,
        "depositBlock": 123,
        "lockLength": 5
      },
      {
        "tokenId": "VRT",
        "source": "joe7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8",
        "txId": "tx2fasdfoijeo8547",
        "balance": 1e3,
        "depositBlock": 123,
        "lockLength": 10
      },
      {
        "tokenId": "XYZ",
        "source": "joe7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8",
        "txId": "tx3fasdfoijeo8547",
        "balance": 3400,
        "depositBlock": 123,
        "lockLength": 5
      }
    ]
  };
  const balAction = {
    input: {
      function: "balance"
    },
    caller: "Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I"
  };
  const txAction = {
    input: {
      function: "transfer",
      target: "Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I",
      qty: 300
    },
    caller: "abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8"
  };
  const depAction = {
    input: {
      function: "deposit",
      txId: "NOT IMPLEMENTED YET",
      depositBlock: 123,
      tokenId: "VRT",
      qty: 2500
    },
    caller: "abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8"
  };
  let result = await handle(state, depAction);
  console.log(result);
  console.log(JSON.stringify(result));
}
test();
