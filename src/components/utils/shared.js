function capitalize(str) {
    return str[0].toUpperCase() + str.substr(1,);
};

function isRepoMember(repo, userAddr) {
    const addr = userAddr;
    let found = false;

    // If single ownership, check for owner
    if (repo.ownership === "single" && addr === repo.owner) {
        return true;
    }

    // Check balances
    if (repo.balances) {
        if (addr in repo.balances && repo.balances[addr] > 0) {
            return true;
        }
    }

    // Check vault
    if (repo.vault) {
        for (let vaultAddr in repo.vault) {
            if (vaultAddr === addr) {
                for (let bal of repo.vault[vaultAddr]) {
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



export { capitalize, isRepoMember };