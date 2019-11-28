'use strict';
var fs = require('fs');

const {FileSystemWallet, Gateway} = require('fabric-network');
const path = require('path');

const walletPath = path.resolve(__dirname, '..', 'library', 'hfc-key-store');
// const walletDirectoryPath = path.join(process.cwd(), 'hfc-key-store');

// Obtain the smart contract with which our application wants to interact
const wallet = new FileSystemWallet(walletPath);
console.log(`Wallet path: ${walletPath}`);

const gatewayOptions = {wallet, identity: 'user2', discovery: {enabled: true, asLocalhost: true}};


const ccpPath = path.resolve(__dirname, '..', 'first-network', 'connection-org1.json');
console.log("ccPath is " + ccpPath); // testing

async function isUserExists() {
    // Check to see if we've already enrolled the user.
    let userExists = await wallet.exists(gatewayOptions.identity);
    if (!userExists) {
        console.log(`User '${gatewayOptions.identity}': doesn't exist`)
    } else {
        console.log(`User '${gatewayOptions.identity}': exists`)
    }
    return userExists.toString();
}

// async function gateway() {
//     // Create a new gateway for connecting to our peer node.
//     const gateway = new Gateway();
//     await gateway.connect(ccpPath, gatewayOptions);
//
//     // Get the network (channel) our contract is deployed to.
//     const network = await gateway.getNetwork('mychannel');
//     // console.log(network);
//
//     // Get the contracttermi from the network.
//     const contract = network.getContract('ctb');
//     // console.log(contract);
//     return contract;
// }

async function evaluateCert(subjectName) {

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();

    try {

        await gateway.connect(ccpPath, gatewayOptions);

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        // console.log(network);

        // Get the contracttermi from the network.
        const contract = network.getContract('ctb');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        var certPath = "certificates/CA1/ashoka/ashoka.pem"; //proposed certificate
        //var certString = fs.readFileSync(certPath).toString();

        //console.log(">>>>>>>>>>drftbgvhnjmk");

        const result = await contract.evaluateTransaction('queryCertificate', subjectName);

        console.log(result);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return JSON.parse(result.toString());
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        // process.exit(1);
        // process.exit(-1);
        let result = {cert: "XX", revokeStatus: "notAvailable"};
        // return JSON.parse(result.toString());

    } finally {
        // Disconnect from the gateway
        console.log('Disconnect from Fabric gateway.');
        gateway.disconnect();
    }
}

// isUserExists();
// evaluateCert();

module.exports = {
    isUserExists, evaluateCert
};

