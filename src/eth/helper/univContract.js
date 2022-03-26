import web3 from '../../web3';

const deployedAddress = '0xaa774B12968012E5Af8B295506c852555F2cd880';

const abi = [{"constant":false,"inputs":[{"name":"students","type":"string[]"}],"name":"removeStudents","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"studentRoll","type":"string"}],"name":"verifyStudent","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"students","type":"string[]"}],"name":"addNewStudents","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"uniName","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

export default new web3.eth.Contract(abi, deployedAddress);