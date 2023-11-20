import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
const APIKEY = process.env.INFURA_API_KEY;
//const url = `https://eth-mainnet.g.alchemy.com/v2/${APIKEY}`;
const url = `https://eth-mainnet.g.alchemy.com/v2/ENpLIAcvBTvMgc172XxaF38w4P-ICADs`;
import abi from "./abi.json" assert { type: "json" };
const provider = new ethers.providers.JsonRpcProvider(url);
const lendingPoolV2 = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9';
const contract = new ethers.Contract(lendingPoolV2, abi, provider);
let i;
let eventArray = new Array(4);
eventArray[0] = "Deposit";
eventArray[1] = "Repay";
eventArray[2] = "Borrow";
eventArray[3] = "Withdraw";

async function monitorAaveEvents() {
    // Listen for Deposit events
    contract.on('Deposit', ( reserve, user,onBehalfOf, amount,referral) => {
      i = 0;
      console.log(`Deposit event: User: ${user}, Amount: ${amount}`);
      // Record the address
      recordAddress(user);
    })
  
    // Listen for Repay events
    contract.on('Repay', (reserve, user,onBehalfOf, amount, referral) => {
      i = 1;
      console.log(`Repay event: User: ${user}, Amount: ${amount}`);
      // Record the address
      recordAddress(user);
    });
  
    // Listen for Borrow events
    contract.on('Borrow', (reserve, user,onBehalfOf, amount,referral) => {
      i = 2;
      console.log(`Borrow event: User: ${user}, Amount: ${amount}`);
      // Record the address
      recordAddress(user);
    });
  
    // Listen for Withdraw events
       contract.on('Withdraw', (reserve, user,to, amount,referral) => {
      i = 3;
        console.log(`Withdraw event: User: ${user}, Amount: ${amount}`);
        // Record the address
        recordAddress(user);
      });
      
    // You can add listeners for other events based on your requirements.

  }
  
  async function recordAddress(address) {
    // Implement the logic to record the address
    let res = await contract.getUserAccountData(address)
    console.log('user:'+ address + ', healthFactor: '+ Number(res.healthFactor._hex).toFixed(0)+ ',event:'+eventArray[i] )
  }
const main = async () => {
    monitorAaveEvents()
}

main()
