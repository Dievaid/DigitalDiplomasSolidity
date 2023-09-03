pragma solidity >= 0.4.25 <= 0.8.21;

// SPDX-License-Identifier: MIT 
contract DiplomaProvider {
    uint public diplomaCount = 0;

    struct Diploma {
        string id;
        string firstName;
        string lastName;
        int256 mark;
        string title;
        string dType;
        address owner;
        address issuer;
        bool emitted;
    }

    event DiplomaCreated(
        string id,
        string firstName,
        string lastName,
        int256 mark,
        string title,
        string dType,
        address issuer,
        bool emited
    );

    event DiplomaSent(
        string id,
        string firstName,
        string lastName,
        int256 mark,
        string title,
        string dType,
        address owner,
        address issuer,
        bool emited
    );

    Diploma[] diplomasArray;

    function createDiploma(
        string memory _id,
        string memory _firstName,
        string memory _lastName,
        int256 _mark,
        string memory _title,
        string memory _dType
    ) public {
        diplomaCount++;
        diplomasArray.push(Diploma(_id, _firstName, _lastName, _mark, _title, _dType, msg.sender, msg.sender, false));
        emit DiplomaCreated(_id, _firstName, _lastName, _mark, _title, _dType, msg.sender, false);
    }

    function sendDiploma(uint256 _id) public {
        Diploma memory _diploma = diplomasArray[_id];
        _diploma.owner = msg.sender;
        _diploma.emitted = true;
        diplomasArray[_id] = _diploma;
        
        emit DiplomaSent(
            _diploma.id,
            _diploma.firstName,
            _diploma.lastName,
            _diploma.mark,
            _diploma.title,
            _diploma.dType,
            _diploma.owner,
            _diploma.issuer,
            true
        );
    }
}