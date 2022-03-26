pragma solidity ^0.4.25;
pragma experimental ABIEncoderV2;
 
contract Defense {
 
   enum Rank { LIEUTINANT, COLONEL , MAJOR_GENERAL }
  
   struct Employee {
       string empId;
       Rank empRank;
   }
 
   address admin;
   mapping(string => Employee) currentEmploymentMapping;
  
   constructor() public {
       admin = msg.sender;
   }
 
   modifier restricted() {
       require(msg.sender == admin);
       _;
   }
 
   function addNewPersonnels(Employee[] memory employees) public restricted {
       uint empIndex = 0;
       for(empIndex = 0; empIndex < employees.length; empIndex++) {
           bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
           bytes memory empId = bytes(employees[empIndex].empId);
           string memory key = string(abi.encodePacked(encryptedAdmin, empId));
           currentEmploymentMapping[key] = employees[empIndex];
       }
   }
 
   function verifyPersonnel(string memory empId) public view returns (Employee memory) {
       bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
       bytes memory employee = bytes(empId);
       string memory key = string(abi.encodePacked(encryptedAdmin, employee));
       return currentEmploymentMapping[key];
   }
 
   function removePersonnels(Employee[] memory employees) public restricted {
       uint empIndex = 0;
       for(empIndex = 0; empIndex < employees.length; empIndex++) {
           bytes32 encryptedAdmin = sha256(abi.encodePacked(admin));
           bytes memory empId = bytes(employees[empIndex].empId);
           string memory key = string(abi.encodePacked(encryptedAdmin, empId));
           delete currentEmploymentMapping[key];
       }
   }
 
}