const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const { SECRET_RECOVERY_PHRASE, RINKEBY_INFURA_LINK } = require('./../../config');

const { compiledUnivContract, compiledDefenseContract } = require('./compile');
 
const univMetaData = {
    interface: compiledUnivContract.interface,
    bytecode: compiledUnivContract.bytecode
}

const defenseMetaData = {
    interface: compiledDefenseContract.interface,
    bytecode: compiledDefenseContract.bytecode
}

const provider = new HDWalletProvider(SECRET_RECOVERY_PHRASE, RINKEBY_INFURA_LINK);

const web3 = new Web3(provider);
 
const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy contracts from account:', accounts[0]);
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log("My Eth Balance", balance);
    
    const univResult = await new web3.eth.Contract(JSON.parse(univMetaData.interface))
        .deploy({ data: univMetaData.bytecode, arguments: ['NIT Kurukshetra'] })
        .send({ gas: '1000000', from: accounts[0] });
        // .send({ gas: '1000000', gasPrice: '2000000000', from: accounts[0] });
 
    const defenseResult = await new web3.eth.Contract(JSON.parse(defenseMetaData.interface))
        .deploy({ data: defenseMetaData.bytecode })
        .send({ gas: '1000000', from: accounts[0] });
        // .send({ gas: '1000000', gasPrice: '2000000000', from: accounts[0] });
 
    console.log('University Contract deployed to address:', univResult.options.address);
    console.log('Defense Contract deployed to address:', defenseResult.options.address);
 
};
deploy();