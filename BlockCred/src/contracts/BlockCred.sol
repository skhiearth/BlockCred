pragma solidity >=0.5.0;

contract BlockCred {

    uint public certificateCount = 0;
    mapping(uint => Certificate) public certificates;
    
    struct Certificate {
        uint identity;
        uint recipients;
        string certificateName;
        uint certificateCost;
        address payable author;
        mapping(address => bool) recipientsMapping;
        mapping(address => bool) requests;
    }
    
    function newCertificate(string memory name, uint cost) public {
        Certificate storage c = certificates[certificateCount];
        c.identity = certificateCount;
        c.certificateName = name;
        c.author = msg.sender;
        c.recipients = 0;
        c.certificateCost = cost;
        certificateCount++;
    }
    
    function approveRequest(uint _id, address student) public payable {
        Certificate storage c = certificates[_id];
        require(msg.sender == c.author, 'You are not authorised');
        if(c.requests[student] == true){
            c.recipientsMapping[student] = true;
            msg.sender.transfer(c.certificateCost);
            c.recipients++;
        }
    }
    
    function purchaseCertificate(uint _id, uint cost) public payable {
        // require(_id > 0 && _id <= certificateCount, 'Id not valid');
        Certificate storage c = certificates[_id];
        require(cost >= c.certificateCost, "This certificate is worth more.");
        c.requests[msg.sender] = true;
    }
    
    function checkValidity(uint _contractId, address _student) public view returns (bool) {
        Certificate storage c = certificates[_contractId];
        return(c.recipientsMapping[_student]);
    }
    
}