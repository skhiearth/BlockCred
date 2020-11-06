// Version of Solidity
pragma solidity >=0.5.0;

// BlockCred Contract
contract BlockCred {

    uint public certificateCount = 0; // Track the total number of certificates 
    uint public requestsCount = 0; // Track the total number of requests 
    mapping(uint => Certificate) public certificates; // Mapping of certificate id to certificate struct
    mapping(uint => Request) public requests; // Mapping of request id to request struct
    
    // Certificate Structure
    struct Certificate {
        uint identity; // Unique identifier
        uint recipients; // Total number of recipients
        string certificateName; // Certificate display name
        uint certificateCost; // Cost of the certificate
        uint holding; // Current value in the certificatte
        address payable author; // Creator's address
        mapping(address => bool) recipientsMapping; // Details of all recipients
    }
    
    // Request Structure
    struct Request {
        uint id; // Unique identifies
        string certName; // Associated certificate name
        uint value; // Value of crypto sent
        uint certificateId; // Unique identifier of the certificate
        address certificateOwner; // Address of certificate's creator
        address payable studentId; // Address of requester
        bool approved; // Approval Status
    }
    
    // Create a new certificate
    function newCertificate(string memory name, uint cost) public {
        Certificate storage c = certificates[certificateCount]; // New certificate object
        c.identity = certificateCount; // Set identifier
        c.certificateName = name; // Set certificate name
        c.author = msg.sender; // Set creator's address
        c.recipients = 0; // Initialise recipient count to zero
        c.certificateCost = cost; // Set certificate cost
        c.holding = 0; // Current value zero
        certificateCount++; // Increment identifier for subsequent creation
    }
    
    // Create and directly assign certificate
    function directCreation(string memory name, address recipient) public {
        Certificate storage c = certificates[certificateCount]; // New certificate object
        c.identity = certificateCount; // Set identifier
        c.certificateName = name; // Set certificate name
        c.author = msg.sender; // Set creator's address
        c.recipients = 0; // Set recipient count to zero
        c.certificateCost = 0; // Certificate cost zero
        c.holding = 0; // Current value zero
        c.recipientsMapping[recipient] = true; // Grant certificate to designated recipient
        c.recipients++; // Increment recipient count 
        certificateCount++; // Increment identifier for subsequent creation
    }
    
    // Approve request
    function approveRequest(uint _id, address student, uint reqid) public payable {
        Certificate storage c = certificates[_id]; // Fetch associated certificate
        require(msg.sender == c.author, 'You are not authorised'); // Check authorisation

        Request storage r = requests[reqid]; // Fetch associated request
        r.approved = true; // Set approval status to true
        
        c.recipientsMapping[student] = true; // Grant certificate
        msg.sender.transfer(c.certificateCost); // Collect money
        c.holding = c.holding - c.certificateCost; // Decrement holding amount
        c.recipients++; // Increment recipients of the certificate
    }
    
    // Decline request
    function declineRequest(uint _id, address student, uint reqid) public payable {
        Certificate storage c = certificates[_id]; // Fetch associated certificate
        require(msg.sender == c.author, 'You are not authorised'); // Check authorisation

        Request storage r = requests[reqid]; // Fetch associated request
        r.approved = false; // Set approval status to false
        r.studentId.transfer(msg.value); // Refund the amount to the student
        delete requests[reqid]; // Delete request
        
        c.recipientsMapping[student] = false; // Don't grant access
    }
    
    // Send Claim Request
    function purchaseCertificate(uint _id, uint cost) public payable {
        Certificate storage c = certificates[_id]; // Fetch associated certificate
        require(cost >= c.certificateCost, "This certificate is worth more."); // Check cost 
        c.holding = c.holding + cost; // Add cost to certificate structure
        
        Request storage r = requests[requestsCount]; // Fetch associated request
        r.id = requestsCount; // Set identifier
        r.value = msg.value; // Set value
        r.certName = c.certificateName; // Set name
        r.certificateOwner = c.author; // Set recipient
        r.certificateId = _id; // Set certificate identifier
        r.studentId = msg.sender; // Set student's address
        requestsCount++; // Increment request count
    }
    
    // Check Validity
    function checkValidity(uint _contractId, address _student) public view returns (bool) {
        Certificate storage c = certificates[_contractId]; // Fetch associated certificatte
        return(c.recipientsMapping[_student]); // Return validity status
    }
    
}