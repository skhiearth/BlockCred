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
        string certName;
        uint value;
        uint certificateId;
        address certificateOwner;
        address payable studentId;
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
        c.recipients++;
        certificateCount++;
    }
    
    function approveRequest(uint _id, address student, uint reqid) public payable {
        Certificate storage c = certificates[_id];
        require(msg.sender == c.author, 'You are not authorised');

        Request storage r = requests[reqid];
        r.approved = true;
        
        c.recipientsMapping[student] = true;
        msg.sender.transfer(c.certificateCost);
        c.holding = c.holding - c.certificateCost;
        c.recipients++;
    }
    
    function declineRequest(uint _id, address student, uint reqid) public payable {
        Certificate storage c = certificates[_id];
        require(msg.sender == c.author, 'You are not authorised');

        Request storage r = requests[reqid];
        r.approved = false;
        r.studentId.transfer(msg.value);
        delete requests[reqid];
        
        c.recipientsMapping[student] = false;
    }
    
    function purchaseCertificate(uint _id, uint cost) public payable {
        Certificate storage c = certificates[_id];
        require(cost >= c.certificateCost, "This certificate is worth more.");
        c.holding = c.holding + cost;
        
        Request storage r = requests[requestsCount];
        r.id = requestsCount;
        r.value = msg.value;
        r.certName = c.certificateName;
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