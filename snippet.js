let arweave = {};
try {
    arweave = await Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
        timeout: 20000,
        logging: false,
    });
} catch (error) {
    console.log("ERROR connecting to Arweave: " + error); // How can this ever happen? :)
    return false;
}


const tags = [{ name: "Protocol", value: this.tagProtocol }];
this.contractSourceId = "BTxbGwMEyVv94ak2CDeuCAXLWnAhwLb_hK4qw8_a-JU";  // Contract for testing
/****
 this.vehicle = 
 {
  "name": "Test Vehicle",
  "ticker": "AFTR-Test-1",
  "creator": "abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8",
  "seats": 0,
  "lockPeriod": 0,
  "minLease": 2,
  "maxLease": 24,
  "logo": "9CYPS85KChE_zQxNLi2y5r2FLG-YE6HiphYYTlgtrtg",
  "ownership": "dao",
  "status": "stopped",
  "balances": {
    "abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8": 12300,
    "Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I": 1000
  },
  "psts": []
}
******/

// Create SmartWeave contract
try {
    console.log("vehicle: " + JSON.stringify(this.vehicle));
    this.vehicle['id'] = await createContractFromTx(arweave, "use-wallet", this.contractSourceId, JSON.stringify(this.vehicle), tags);
} catch(error) {
    console.log("ERROR creating SmartWeave contract: " + error);
    return false;
}