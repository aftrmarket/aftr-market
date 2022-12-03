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
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
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
        tags.push({ name: "Protocol", value: import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL });
        tags.push({ name: "Implements", value: ["ANS-110"] });
        tags.push({ name: "Type", value: ["token", "repo"] });
    }

    return tags;
};

function readFile(file) {
    // Thanks to https://dilshankelsen.com/convert-file-to-byte-array/
    return new Promise((resolve, reject) => {
        // Create file reader
        let reader = new FileReader();

        // Register event listeners
        reader.addEventListener("loadend", e => resolve(e.target.result));
        reader.addEventListener("error", reject);

        // Read file
        reader.readAsArrayBuffer(file);
    });
};

async function getAsByteArray(file) {
    return new Uint8Array(await readFile(file));
};

async function upload(file) {
    const arweave = arweaveInit();

    const tx = await arweave.createTransaction({
        data: await getAsByteArray(file)
    }, "use_wallet");
    tx.addTag('Content-Type', file.type)
    await arweave.transactions.sign(tx)
    const res = await arweave.transactions.post(tx)
    if (!res.statusText == "OK") {
        throw new Error('Can not upload data')
    }

    return { file, assetId: tx.id }
};

async function dispatch(file) {
    const tx = await createAndTag(file)
    const result = await window.arweaveWallet.dispatch(tx)
    return { file, atomicId: result.id }
};

async function createAndTag(ctx) {
    const arweave = arweaveInit();

    const { assetId, name, addr, contentType, description } = ctx
    const tx = await arweave.createTransaction({
        data: JSON.stringify({
            manifest: "arweave/paths",
            version: "0.1.0",
            index: {
                path: "asset"
            },
            paths: {
                asset: {
                    id: assetId
                }
            }
        })
    }, "use_wallet")

    return tx
};

async function post(ctx) {
    const tx = await createAndTag(ctx)
    await arweave.transactions.sign(tx)
    tx.id = ctx.atomicId
    const result = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify({ contractTx: tx }),
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
    return { id: ctx.atomicId }
}

export { warpInit, warpRead, warpWrite, warpCreateContract, warpCreateFromTx, arweaveInit, upload, getAsByteArray, readFile, dispatch, post };