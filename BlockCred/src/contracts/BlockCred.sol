pragma solidity >=0.5.0;

contract BlockCred {

    uint public certificateCount = 0;
    mapping(uint => Certificate) public certificates;
    
    struct Certificate {
        uint id;
        uint recipients;
        string certificateName;
        uint certificateCost;
        address payable author;
        mapping(address => bool) recipientsMapping;
    }
    
    function newCertificate(string memory name, uint cost) public {
        certificateCount++;
        Certificate storage c = certificates[certificateCount];
        c.id = certificateCount;
        c.certificateName = name;
        c.author = msg.sender;
        c.recipients = 0;
        c.certificateCost = cost;
    }
    
    function purchaseCertificate(uint _id, uint cost) public payable {
        require(_id > 0 && _id <= certificateCount, 'Id not valid');
        Certificate storage c = certificates[_id];
        require(cost >= c.certificateCost, "This certificate is worth more.");
        c.recipientsMapping[msg.sender] = true;
        c.author.transfer(cost);
        c.recipients++;
    }
    
    function checkValidity(uint _contractId, address _student) public view returns (bool) {
        Certificate storage c = certificates[_contractId];
        return(c.recipientsMapping[_student]);
    }
    
}