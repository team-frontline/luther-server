'use strict';
var fs = require('fs');

const {FileSystemWallet, Gateway} = require('fabric-network');
const path = require('path');

const walletDirectoryPath = path.join(process.cwd(), 'hfc-key-store');

// Obtain the smart contract with which our application wants to interact
const wallet = new FileSystemWallet(walletDirectoryPath);
console.log(`Wallet path: ${walletDirectoryPath}`);

const gatewayOptions = {wallet, identity: 'user1', discovery: {enabled: true, asLocalhost: true}};


const ccpPath = path.resolve(__dirname, '..', 'first-network', 'connection-org1.json');
console.log("ccPath is " + ccpPath); // testing

async function isUserExists(){
    // Check to see if we've already enrolled the user.
    let userExists = await wallet.exists(gatewayOptions.identity);
    if (!userExists){
        console.log(`User '${gatewayOptions.identity}': doesn't exist`)
    } else {
        console.log(`User '${gatewayOptions.identity}': exists`)
    }
}

async function gateway() {
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccpPath, gatewayOptions);

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');
    console.log(network);
}

isUserExists();
gateway();