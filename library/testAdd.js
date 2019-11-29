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

async function addCertificate(certString, intermediateCertString, sigString) {

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    try {

        await gateway.connect(ccpPath, gatewayOptions);

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('ctb');

        // var certPath = "certificates/CA2/hdworks/hdworks.pem"; //proposed certificate
        // var intermediateCertPath = "certificates/CA2/CA2.pem"; //certificate authority's root certificate
        // var certString = fs.readFileSync(certPath).toString();
        // var intermediateCertString = fs.readFileSync(intermediateCertPath).toString();

        // var sigString = "";
        const result = await contract.submitTransaction('addCertificate', certString, intermediateCertString, sigString);
            // .then((buffer) => {
            //     console.log("buffer: ", buffer);
            // })
            // .catch((err) => {
            //     console.log("error: ", err)
            // });

        // contract.submitTransaction('addCertificate',certString,intermediateCertString,sigString).then((buffter)=>{
        //     console.log(buffter);
        // })
        // .catch((err)=>{
        //     console.log("error::",err);
        // });


        // Disconnect from the gateway.
        await gateway.disconnect();
        return result;

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return {status: "Failed"};
    }
}

module.exports = {
    addCertificate
};