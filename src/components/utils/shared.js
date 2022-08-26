function capitalize(str) {
    return str[0].toUpperCase() + str.substr(1, );
};

function isVehicleMember(vehicle, userAddr) {
    const addr = userAddr;
    let found = false;
    
    // If single ownership, check for creator
    if (vehicle.ownership === "single" && addr === vehicle.creator) {
        return true;
    }

    // Check balances
    if (vehicle.balances) {
        if (addr in vehicle.balances && vehicle.balances[addr] > 0) {
            return true;
        }
    }

    // Check vault
    if (vehicle.vault) {
        for (let vaultAddr in vehicle.vault) {
            if (vaultAddr === addr) {
                for (let bal of vehicle.vault[vaultAddr]) {
                    if (bal.balance > 0) {
                        found = true; 
                        break;
                    }
                }
            }
        }
    }

    return found;
};

export { capitalize, isVehicleMember };