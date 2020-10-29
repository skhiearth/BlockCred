pragma solidity >=0.5.0;

contract BlockCred {

    uint public certificateCount = 0;
    uint public requestsCount = 0;
    mapping(uint => Certificate) public certificates;
    mapping(uint => Request) public requests;
    
    struct Certificate {
        uint identity;
        uint recipients;
        string certificateName;
        uint certificateCost;
        uint holding;
        address payable author;
        mapping(address => bool) recipientsMapping;
    }
    
    struct Request {
        uint id;
        uint certificateId;
        address certificateOwner;
        address studentId;
        bool approved;
    }
    
    function newCertificate(string memory name, uint cost) public {
        Certificate storage c = certificates[certificateCount];
        c.identity = certificateCount;
        c.certificateName = name;
        c.author = msg.sender;
        c.recipients = 0;
        c.certificateCost = cost;
        c.holding = 0;
        certificateCount++;
    }
    
    function directCreation(string memory name, address recipient) public {
        Certificate storage c = certificates[certificateCount];
        c.identity = certificateCount;
        c.certificateName = name;
        c.author = msg.sender;
        c.recipients = 0;
        c.certificateCost = 0;
        c.holding = 0;
        c.recipientsMapping[recipient] = true;
        certificateCount++;
    }
    
    function approveRequest(uint _id, address student, uint reqid) public payable {
        Certificate storage c = certificates[_id];
        require(msg.sender == c.author, 'You are not authorised');
        
        c.recipientsMapping[student] = true;
        msg.sender.transfer(c.certificateCost);
        c.holding = c.holding - c.certificateCost;
        delete requests[reqid];
        c.recipients++;
        requestsCount--;
    }
    
    function purchaseCertificate(uint _id, uint cost) public payable {
        require(_id > 0 && _id <= certificateCount, 'Id not valid');
        Certificate storage c = certificates[_id];
        require(cost >= c.certificateCost, "This certificate is worth more.");
        c.holding = c.holding + cost;
        
        Request storage r = requests[requestsCount];
        r.id = requestsCount;
        r.certificateOwner = c.author;
        r.certificateId = _id;
        r.studentId = msg.sender;
        requestsCount++;
    }
    
    function checkValidity(uint _contractId, address _student) public view returns (bool) {
        Certificate storage c = certificates[_contractId];
        return(c.recipientsMapping[_student]);
    }
    
}