import { WarpFactory } from "warp-contracts/web";

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
        }
    } catch(e) {
        console.log(e);
    }
    return warp;
};

async function warpRead(warp, contractId) {
    try {
        const contract = warp.contract(contractId)
            .setEvaluationOptions({ 
                allowUnsafeClient: true,
                internalWrites: true,
        });
        const { cachedValue } = await contract.readState();
        return cachedValue;
    } catch (e) {
        console.log(e);
        return {};
    }
};

async function warpWrite(warp, contractId ,input) {
    try {
        const contract = warp.contract(contractId)
        .setEvaluationOptions({ 
            allowUnsafeClient: true,
            internalWrites: true,
         })
        .connect("use_wallet");
        const { originalTxId } = await contract.writeInteraction(input);
        return originalTxId;
    } catch(e) {
        console.log(e);
        return "";
    }
};


export { warpInit, warpRead, warpWrite };