import { WarpFactory } from "warp-contracts/web";
import Arweave, { init } from "arweave";

function warpInit() {
    let warp = {};
    
    try {
        const arweave = arweaveInit();

        // Using Warp
        if (import.meta.env.VITE_ENV === "PROD") {
            warp = WarpFactory.forMainnet();
        } else if (import.meta.env.VITE_ENV === "TEST") {
            warp = WarpFactory.forTestnet(import.meta.env.VITE_ARWEAVE_PORT, arweave);
        } else if (import.meta.env.VITE_ENV === "DEV") {
            warp = WarpFactory.forLocal(import.meta.env.VITE_ARWEAVE_PORT, arweave);
        } else {
            warp = WarpFactory.forTestnet();
        }
    } catch(e) {
        console.log(e);
    }
    return warp;
};

async function warpRead(contractId, internalWrites = true) {
    const warp = warpInit();

    try {
        const contract = warp.contract(contractId)
            .setEvaluationOptions({ 
                internalWrites: internalWrites,
            });
        const result = await contract.readState();
        return result.cachedValue;
    } catch (e) {
        console.log(e);
        return {};
    }
};

async function warpWrite(contractId, input, internalWrites = true, bundling = true) {
    const warp = warpInit();
    try {
        const contract = warp.contract(contractId)
        .setEvaluationOptions({ 
            internalWrites: internalWrites,
            disableBundling: !bundling
         })
        .connect("use_wallet");
        const { originalTxId } = await contract.writeInteraction(input);
        return originalTxId;
    } catch(e) {
        console.log(e);
        return "";
    }
};

async function warpCreateContract(source, initState, currentTags = undefined, aftr = false) {
    /*** 
     * Returns:
     * { contractTxId: string, srcTxId: string }
     */

    let tags = addTags(currentTags, aftr);
    const warp = warpInit();
    try {
        let txIds = await warp.createContract.deploy({
            wallet: "use_wallet",
            initState: initState,
            src: source,
            tags
        });
        return txIds;
    } catch(e) {
        console.log("ERROR deploying AFTR contract: " + e);
        return {};
    }
};

async function warpCreateFromTx(initState, srcId, currentTags = undefined, aftr = false) {
    /*** 
     * Returns:
     * { contractTxId: string, srcTxId: string }
     */

    let tags = addTags(currentTags, aftr);

    const warp = warpInit();
    try {
        let txIds = await warp.createContract.deployFromSourceTx({
            wallet: "use_wallet",
            initState: initState,
            srcTxId: srcId,
            tags
        });
        return txIds;
    } catch(e) {
        console.log("ERROR deploying AFTR contract: " + e);
        return {};
    }
};

function arweaveInit() {
    const arweave = Arweave.init({
        host: import.meta.env.VITE_ARWEAVE_HOST,
        port: import.meta.env.VITE_ARWEAVE_PORT,
        protocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
        timeout: 20000,
        logging: true,
    });
    return arweave;
};

function addTags(currentTags, aftr = false) {
    let tags = [];
    if (currentTags) {
        tags = currentTags;
    }
    if (aftr) {
        tags.push( { name: "Protocol", value: import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL } );
        tags.push( { name: "Implements", value: ["ANS-110"] });
        tags.push( { name: "Type", value: ["token", "vehicle"] } );
    }

    return tags;
};

export { warpInit, warpRead, warpWrite, warpCreateContract, warpCreateFromTx, arweaveInit };