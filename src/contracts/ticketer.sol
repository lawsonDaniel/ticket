// SPDX-License-Identifier: MIT  

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract DriveThrough{
    struct Ticket{
        address payable owner;
        string ticketNumber;
        string category;
        uint price;
        bool booked;
    }

    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    address internal adminAddress = ; // replace with your own address

    uint ticketLength = 0;
    mapping(uint => Ticket) tickets;

    modifier isAdmin(){
        require(msg.sender == adminAddress,"Only the admin can access this");
        _;
    }

    function addTicket(
        string memory _ticketNo,
        string memory _category, 
        uint _price       
    )public isAdmin(){
        Ticket storage _tickets = tickets[ticketLength];
        _tickets.owner = payable(msg.sender);
        _tickets.ticketNumber = _ticketNo;
        _tickets.category = _category;
        _tickets.price = _price;
        _tickets.booked = false;

        ticketLength++;
    }


    function getTickets(uint _index)public view returns(
        address payable,
        string memory,
        string memory,
        uint,
        bool
    ){
        Ticket storage _tickets = tickets[_index];
        return(
            _tickets.owner,
            _tickets.ticketNumber,
            _tickets.category,
            _tickets.price,
            _tickets.booked
        );
    }

    function bookTicket(uint _index) public {
        require(msg.sender != adminAddress, "Cannot be admin");
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                    msg.sender,
                    tickets[_index].owner,
                    tickets[_index].price
            ),
            "Transaction could not be performed"
        );
        // change ownership
        tickets[_index].owner = payable(msg.sender);
        tickets[_index].booked = true;
    }

    function revokeTicket(uint _index)public{
        require(msg.sender != adminAddress, "Cannot be admin");
        tickets[_index].booked = false;
    }

    function isUserAdmin(address _address) public view returns (bool){
        if(_address == adminAddress){
            return true;
        }
        return false;   
    } 

    function getTicketLength() public view returns (uint) {
        return (ticketLength);
    }
}