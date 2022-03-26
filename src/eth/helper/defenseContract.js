import web3 from '../../web3';

const deployedAddress = '0xF53236Ed36530B43296294389B1fD92629EDc464';

const abi = [{"constant":false,"inputs":[{"components":[{"name":"empId","type":"string"},{"name":"empRank","type":"uint8"}],"name":"employees","type":"tuple[]"}],"name":"removePersonnels","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"components":[{"name":"empId","type":"string"},{"name":"empRank","type":"uint8"}],"name":"employees","type":"tuple[]"}],"name":"addNewPersonnels","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"empId","type":"string"}],"name":"verifyPersonnel","outputs":[{"components":[{"name":"empId","type":"string"},{"name":"empRank","type":"uint8"}],"name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

export default new web3.eth.Contract(abi, deployedAddress);