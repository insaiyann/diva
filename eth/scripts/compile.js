const path = require('path');
const fs = require('fs');
const solc = require('solc');

const CONTRACTS_PATH = "/Users/hy/Downloads/diva/eth/contracts";

const universityContractPath = path.resolve(CONTRACTS_PATH, 'University.sol');
const defenseContractPath = path.resolve(CONTRACTS_PATH, 'Defense.sol');
 
const univFile = fs.readFileSync(universityContractPath, 'utf8');
const defenseFile = fs.readFileSync(defenseContractPath, 'utf8');

const compiledUnivContract = solc.compile(univFile, 1).contracts[':University'];
const compiledDefenseContract = solc.compile(defenseFile, 1).contracts[':Defense'];

module.exports = {
    compiledUnivContract: compiledUnivContract,
    compiledDefenseContract: compiledDefenseContract
};