const Arweave = require('arweave');
const fs = require('fs');
var path = require('path');

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});

const keyfile = JSON.parse(fs.readFileSync(path.join(__dirname, "/") + "keyfile.json", "utf-8"));
const initialState = JSON.parse(fs.readFileSync(path.join(__dirname, "/") + "state.json", "utf-8"));

const tags = [
    {
        name: "Content-Type",
        value: "text/html"
    },
    {
        name: "App-Name",
        value: "SmartWeaveContract"
    },
    {
        name: "App-Version",
        value: "0.3.0"
    },
    {
        name: "Contract-Src",
        value: "DqgDvNCzLVwIvODbtx14gvCKDJp2JUdwr5CAg1Ei2ao"
    },
    {
        name: "Init-State",
        value: JSON.stringify(initialState)
    },
    {
        name: "Token-Type",
        value: "test"
    }
];

async function mintDAA() {
    // const txData = fs.readFileSync(path.join(__dirname, "/") + "nft.html", "utf-8");

    const tx = await arweave.createTransaction({
        //data: txData.toString()
        data: '1234'
    }, keyfile);
    for (let i = 0; i < tags.length; i++) {
        tx.addTag(tags[i].name, tags[i].value);
    }

    await arweave.transactions.sign(tx, keyfile);
    await arweave.transactions.post(tx);
}

mintDAA();