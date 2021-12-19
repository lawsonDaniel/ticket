import "./App.css";
import Header from "./Header";
import Main from "./Main";

import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";

import ticketer from "./contracts/ticketer.abi.json";
import IERC from "./contracts/ierc.abi.json";

const ERC20_DECIMALS = 18;

const contractAddress = "0x195608F087cC1B64C951Bde7278B04F78928116d";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

function App() {
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const celoConnect = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
        console.log(user_address);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Error");
    }
  };

  const getBalance = useCallback(async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

      const contract = new kit.web3.eth.Contract(ticketer, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  }, [address, kit]);
  const getTickets = async () => {
    const ticketLength = await contract.methods.getTicketLength().call();
    const _tickets = [];

    for (let index = 0; index < ticketLength; index++) {
      let _ticket = new Promise(async (resolve, reject) => {
        let tick = await contract.methods.getTickets(index).call();
        resolve({
          index: index,
          owner: tick[0],
          ticketNumber: tick[1],
          category: tick[2],
          price: tick[3],
          booked: tick[4],
        });
      });
      _tickets.push(_ticket);
    }
    const tickets = await Promise.all(_tickets);
    setTickets(tickets);
  };

  const isUserAdmin = async () => {
    const isAdmin = await contract.methods.isUserAdmin(address).call();
    setIsAdmin(isAdmin);
  };

  const bookTicket = async (_index) => {
    const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
    try {
      const price = new BigNumber(tickets[_index].price).shiftedBy(ERC20_DECIMALS).toString();
      await cUSDContract.methods
        .approve(contractAddress, price)
        .send({ from: address });
      await contract.methods.bookTicket(_index).send({ from: address });
      getBalance();
      getTickets();
    } catch (error) {
      console.log(error);
    }
  };

  const addTicket = async (_id, _price, _category) => {
    try {
      await contract.methods
        .addTicket(_id, _category, _price)
        .send({ from: address });
    } catch (error) {
      console.log(error);
    }
    getTickets();
  };

  const revokeTicket = async (_index) => {
    try {
      await contract.methods.revokeTicket(_index).send({ from: address });
    } catch (error) {
      console.log(error);
    }
    getTickets();
  };

  useEffect(() => {
    celoConnect();
  }, []);

  useEffect(() => {
    if (kit && address) {
      getBalance();
    } else {
      console.log("no kit");
    }
  }, [kit, address]);

  useEffect(() => {
    if (contract) {
      getTickets();
      isUserAdmin();
    }
  }, [contract]);
  return (
    <div>
      <Header balance={cUSDBalance} />
      <Main
        tickets={tickets}
        address={address}
        isAdmin={isAdmin}
        bookTicket={bookTicket}
        addTicket={addTicket}
        revokeTicket={revokeTicket}
      />
    </div>
  );
}

export default App;
