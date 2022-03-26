const path = require('path');
const fs = require('fs');
const solc = require('solc');

const CURR_DIR = __dirname;

const universityContractPath = path.resolve(CURR_DIR, '..', 'contracts', 'University.sol');
const defenseContractPath = path.resolve(CURR_DIR, '..', 'contracts', 'Defense.sol');
 
const univFile = fs.readFileSync(universityContractPath, 'utf8');
const defenseFile = fs.readFileSync(defenseContractPath, 'utf8');

const compiledUnivContract = solc.compile(univFile, 1).contracts[':University'];
const compiledDefenseContract = solc.compile(defenseFile, 1).contracts[':Defense'];

module.exports = {
    compiledUnivContract: compiledUnivContract,
    compiledDefenseContract: compiledDefenseContract
};