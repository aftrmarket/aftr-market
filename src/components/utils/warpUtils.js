import { WarpFactory } from "warp-contracts/web";
import Arweave from "arweave";

function warpInit() {
    let warp = {};
    try {
        // Using Warp
        if (import.meta.env.VITE_ENV === "PROD") {
            warp = WarpFactory.forMainnet();
        } else if (import.meta.env.VITE_ENV === "TEST") {
            warp = WarpFactory.forTestnet();
        } else if (import.meta.env.VITE_ENV === "DEV") {
            warp = WarpFactory.forLocal();
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

export { warpInit, warpRead, warpWrite, arweaveInit };