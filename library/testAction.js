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
    // console.log(network);

    // Get the contracttermi from the network.
    const contract = network.getContract('ctb');
    console.log(contract);
    return  contract;
}

async function evaluateCert() {

    const contract = await gateway();

    // Evaluate the specified transaction.
    // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
    // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
    var certPath = "certificates/CA1/ashoka/ashoka.pem"; //proposed certificate
    var certString = fs.readFileSync(certPath).toString();

    //console.log(">>>>>>>>>>drftbgvhnjmk");
    const result = await contract.evaluateTransaction('queryCertificate',"hdworks.org");
    console.log(result);
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
}

isUserExists();
evaluateCert();


