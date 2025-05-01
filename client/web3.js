import Web3 from "web3";
import Certification from "./src/Certification.json";

// const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
const web3 = new Web3(window.ethereum);

// Replace this with the deployed contract address from Truffle/Ganache
const contractAddress = "0x1D8fFd1Ed640F63C83C1b525D8F26eB9eC31620d";

const CertificationContract = new web3.eth.Contract(
  Certification.abi,
  contractAddress
);

export { web3, CertificationContract };
