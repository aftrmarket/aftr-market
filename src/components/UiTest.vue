<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <main class="-mt-32">
        <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">

        </div>
        ROUTE:     {{ $route.name }}

        <div class="flex text-sm text-gray-600">
            <label for="vehicleLogo" class="relative cursor-pointer bg-white rounded-md font-medium text-aftrBlue hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <span>Upload a file</span>
                <input @change="onFileChange" id="vehicleLogo" name="vehicleLogo" type="file" accept="image/png, image/gif, image/jpeg" class="sr-only" />
            </label>
            <p class="text-white">{{ fileInfo }}</p>
        </div>
    </main>
</template>

<script>

import { mapGetters } from "vuex";

export default {
    data() {
        return {
            tagProtocol: import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL,
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            arweaveMine: import.meta.env.VITE_MINE,
            vehicleLogo: null,
            fileInfo: "",
            files: [],
        }
    },
    computed: {
        ...mapGetters(["arConnected", "keyFile"]),
    },
    methods: {
        async onFileChange(e) {
            const file = e.target.files[0];
            this.files = file;

            let wallet;
            if (import.meta.env.DEV) {
                if (this.keyFile.length) {
                    wallet = JSON.parse(this.keyFile);
                } else {
                    alert("Please attach your keyfile");
                    return;
                }
            }
            let arweave = {};
            arweave = await Arweave.init({
                host: this.arweaveHost,
                port: this.arweavePort,
                protocol: this.arweaveProtocol,
                timeout: 20000,
                logging: true,
            });

            if (this.vehicleLogo) {
                // Release the memory of the old file
                URL.revokeObjectURL(this.vehicleLogo);
            }
            this.vehicleLogo = URL.createObjectURL(file);
            this.fileInfo = file.size + ", " + file.name + ", " + file.type;
            const filename = file.name.replace(/ /g, "") + file.lastModified;

            // const { data: winston } = await arweave.api.get(
            //     `price/${file.size}`
            // );
            // const ar = arweave.ar.winstonToAr(winston, {
            //     formatted: true,
            //     decimals: 5,
            //     trim: true,
            // });
            // if (import.meta.env.DEV) {
            //     this.address = await arweave.wallets.jwkToAddress(wallet);
            // } else {
            //     this.address = await arweave.wallets.jwkToAddress("use_wallet");
            // }
            // const bal = await arweave.wallets.getBalance(this.address);
            // this.balance = arweave.ar.winstonToAr(bal);


            /**** SHOULD THIS BE > 0? */
            if (this.totalSize != 0) {
                // const { data: winston } = await arweave.api.get(
                //     `price/${this.totalSize}`
                // );
                // this.fee = +winston * 0.1;
                // const ar = arweave.ar.winstonToAr(winston);
                // const arFee = arweave.ar.winstonToAr(this.fee.toString());
                // const total = arweave.ar.winstonToAr(
                //     (+winston + this.fee).toString()
                // );
                // console.log("total", total);
                // this.totalCost = total;
                // if (total > this.balance) {
                //     return alert("You don't have enough AR to upload this file!");
                // }

                if (import.meta.env.DEV) {
                   await this.deployFile(this.files, arweave, wallet);
                    const mineUrl =
                            import.meta.env.VITE_ARWEAVE_PROTOCOL +
                            "://" +
                            import.meta.env.VITE_ARWEAVE_HOST +
                            ":" +
                            import.meta.env.VITE_ARWEAVE_PORT +
                            "/mine";
                    if(Boolean(this.arweaveMine)){
                        let response = await fetch(mineUrl);
                    }

                } else {
                   await this.deployFile(this.files, arweave, "use_wallet");
                }
            }
        },
        readFile(file) {
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
        },
        async getAsByteArray(file) {
            return new Uint8Array(await this.readFile(file));
        },
        async deployFile(file, arweave, wallet) {

            const tx = await arweave.createTransaction({
                data: await this.getAsByteArray(file)
            }, wallet);

            tx.addTag("Content-Type", file.type);
            //tx.addTag("User-Agent", `AFTR.Market/this.version`);
            tx.addTag("User-Agent", "AFTR.Market")

            await arweave.transactions.sign(tx, wallet);
            await arweave.transactions.post(tx);

            this.communityLogoValue = tx.id;
            console.log("txid", tx.id);
        },
    },
    setup() {
        return {

        };
    },
};
</script>