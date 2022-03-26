pragma solidity ^0.4.25;
pragma experimental ABIEncoderV2;

contract University {

    string universityName;
    address universityAdmin;
    mapping(string => bool) currentStudentMapping;
    
    constructor(string memory uniName) public {
        universityAdmin = msg.sender;
        universityName = uniName;
    }

    modifier restricted() {
        require(msg.sender == universityAdmin);
        _;
    }

    function addNewStudents(string[] memory students) public restricted {
        uint sIndex = 0;
        for(sIndex = 0; sIndex < students.length; sIndex++) {
            bytes32 encryptedAdmin = sha256(abi.encodePacked(universityAdmin));
            bytes memory student = bytes(students[sIndex]);
            string memory key = string(abi.encodePacked(encryptedAdmin, student));
            currentStudentMapping[key] = true;
        }
    }

    function verifyStudent(string memory studentRoll) public view returns (bool) {
        bytes32 encryptedAdmin = sha256(abi.encodePacked(universityAdmin));
        bytes memory student = bytes(studentRoll);
        string memory key = string(abi.encodePacked(encryptedAdmin, student));
        return currentStudentMapping[key];
    }

    function removeStudents(string[] memory students) public restricted {
        uint sIndex = 0;
        for(sIndex = 0; sIndex < students.length; sIndex++) {
            bytes32 encryptedAdmin = sha256(abi.encodePacked(universityAdmin));
            bytes memory student = bytes(students[sIndex]);
            string memory key = string(abi.encodePacked(encryptedAdmin, student));
            delete currentStudentMapping[key];
        }
    }

}