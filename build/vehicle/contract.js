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
  const input = action.input;
  const caller = action.caller;
  const settings = new Map(state.settings);
  const votes = state.votes;
  let block = 0;
  if (mode === "TEST") {
    block = 130;
  } else {
    block = +SmartWeave.block.height;
  }
  let votingSystem = "equal";
  if (state.votingSystem) {
    votingSystem = state.votingSystem;
  }
  const concludedVotes = votes.filter((vote) => block >= (vote.status === "active" && vote.start + settings.get("voteLength")));
  if (concludedVotes.length > 0) {
    finalizeVotes(state, concludedVotes, settings.get("quorum"), settings.get("support"));
  }
  if (state.tokens) {
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
    return { state };
  }
  if (input.function === "propose") {
    const voteType = input.type;
    let note = input.note;
    let target = input.target;
    let qty = input.qty;
    let key = input.key;
    let value = input.value;
    let yays = input.yays;
    let nays = input.nays;
    if (!(caller in balances) || !(balances[caller] > 0)) {
      ThrowError("Caller is not allowed to vote.");
    }
    let votingSystem2 = "equal";
    let totalWeight = 0;
    if (state.votingSystem) {
      votingSystem2 = state.votingSystem;
    }
    if (votingSystem2 === "equal") {
      totalWeight = Object.keys(balances).length;
    } else if (votingSystem2 === "weighted") {
      for (let member in balances) {
        totalWeight += balances[member];
      }
    } else {
      ThrowError("Invalid voting system.");
    }
    let recipient = "";
    if (voteType === "mint" || voteType === "burn" || voteType === "addMember" || voteType === "removeMember") {
      if (!input.recipient) {
        ThrowError("Error in input.  Recipient not supplied.");
      }
      if (!qty || !(qty > 0)) {
        ThrowError("Error in input.  Quantity not supplied or is invalid.");
      }
      recipient = isArweaveAddress(input.recipient);
      if (voteType === "mint") {
        note = "Mint " + String(qty) + " tokens for " + recipient;
      } else if (voteType === "burn") {
        note = "Burn " + String(qty) + " tokens for " + recipient;
      } else if (voteType === "addMember") {
        note = "Add new member, " + recipient + ", and mint " + String(qty) + " tokens";
      } else if (voteType === "removeMember") {
        note = "Remove member, " + recipient + ", and burn their " + String(qty) + " tokens";
      }
    } else if (voteType === "set") {
      if (!key || key === "") {
        ThrowError("Invalid Key.");
      }
      if (!value || value === "") {
        ThrowError("Invalid Value.");
      }
      let currentValue = String(getStateValue(state, key));
      key = getStateProperty(key);
      note = "Change " + key + " from " + currentValue + " to " + String(value);
    } else {
      ThrowError("Vote Type not supported.");
    }
    let voteId = 1e3;
    if (state.votes.length > 0) {
      voteId += votes.length;
    }
    let vote = {
      status: "active",
      type: voteType,
      id: voteId,
      totalWeight,
      voted: [],
      start: block
    };
    if (recipient !== "") {
      vote.recipient = recipient;
    }
    if (target && target !== "") {
      vote.target = target;
    }
    if (!qty) {
      vote.qty = qty;
    }
    if (key && key !== "") {
      vote.key = key;
    }
    if (value && value !== "") {
      vote.value = value;
    }
    if (note && note !== "") {
      vote.note = note;
    }
    votes.push(vote);
    return { state };
  }
  if (input.function === "vote") {
    const voteId = input.voteId;
    const cast = input.cast;
    if (!Number.isInteger(voteId)) {
      ThrowError("Invalid value for the Vote ID. Vote ID must be an integer.");
    }
    const vote = votes.find((vote2) => vote2.id === voteId);
    if (typeof vote === "undefined") {
      ThrowError("Vote does not exist.");
    }
    if (!(caller in balances)) {
      ThrowError("Caller isn't a member of the vehicle and therefore isn't allowed to vote");
    }
    if (vote.status !== "active") {
      ThrowError("Vote is not active.");
    }
    if (vote.voted.includes(caller)) {
      ThrowError("Caller has already voted.");
    }
    let weightedVote = 1;
    if (state.votingSystem === "weighted") {
      weightedVote = balances[caller];
    }
    if (cast === "yay") {
      vote.yays += weightedVote;
    } else if (cast === "nay") {
      vote.nays += weightedVote;
    } else {
      ThrowError("Invalid vote cast.");
    }
    vote.voted.push(caller);
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
function getStateProperty(key) {
  if (key.substring(0, 9) === "settings.") {
    key = key.substring(9);
  }
  return key;
}
function getStateValue(vehicle, key) {
  const settings = new Map(vehicle.settings);
  let value = "";
  if (key.substring(0, 9) === "settings.") {
    let setting = key.substring(9);
    value = settings.get(setting);
  } else {
    value = vehicle[key];
  }
  return value;
}
function processWithdrawal(vehicle, tokenObj) {
  vehicle.tokens = vehicle.tokens.filter((token) => token.txId !== tokenObj.txId);
}
function finalizeVotes(vehicle, concludedVotes, quorum, support) {
  concludedVotes.forEach((vote) => {
    if (vote.totalWeight * quorum > vote.yays + vote.nays) {
      vote.status = "quorumFailed";
    } else if (vote.yays / (vote.yays + vote.nays) > support) {
      vote.status = "passed";
      modifyVehicle(vehicle, vote);
    } else {
      vote.status = "failed";
    }
  });
}
function modifyVehicle(vehicle, vote) {
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
    "votingSystem": "weighted",
    "settings": [
      ["quorum", 0.5],
      ["voteLength", 2e3],
      ["lockMinLength", 100],
      ["lockMaxLength", 1e4]
    ],
    "votes": [
      {
        "status": "active",
        "type": "",
        "id": 1e3,
        "totalWeight": 13300,
        "yays": 0,
        "nays": 0,
        "voted": [],
        "start": 100
      }
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
      tokenId: "T-SQUID",
      qty: 1e4
    },
    caller: "Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I"
  };
  const voteCastAction = {
    input: {
      function: "vote",
      voteId: 101,
      cast: "yay"
    },
    caller: "Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I"
  };
  const proposeVoteAction = {
    input: {
      function: "propose",
      type: "set",
      recipient: "",
      target: "",
      qty: 0,
      key: "settings.quorum",
      value: 0.01,
      note: ""
    },
    caller: "Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I"
  };
  let result = await handle(state, proposeVoteAction);
  console.log(result);
  console.log(JSON.stringify(result));
}
test();
