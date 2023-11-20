import { ethers } from "ethers";
import fs  from "fs";
import dotenv from "dotenv";
dotenv.config();
const APIKEY = process.env.INFURA_API_KEY;
//const url = `https://eth-mainnet.g.alchemy.com/v2/${APIKEY}`;
const url = `https://eth-mainnet.g.alchemy.com/v2/mTosnYQaHVOQuFqoHdAmwOrYjHspW9OX`;
import abi from "./abi.json" assert { type: "json" };
const provider = new ethers.providers.JsonRpcProvider(url);
const lendingPoolV2 = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9';
const contract = new ethers.Contract(lendingPoolV2, abi, provider);

const file = 'result.csv';
let counter = 1;

let i;
let eventArray = new Array(4);
eventArray[0] = "Deposit";
eventArray[1] = "Repay";
eventArray[2] = "Borrow";
eventArray[3] = "Withdraw";
async function monitorAaveEvents() {
    // Listen for Deposit events
    contract.on('Deposit', ( reserve, user,onBehalfOf, amount,event) => {
      i = 0;
      console.log(`Deposit event: User: ${user}, Amount: ${amount}`);
      // Record the address
      recordAddress(user,amount);
    })
  
    // Listen for Repay events
    contract.on('Repay', (reserve, user,onBehalfOf, amount, event) => {
      i = 1;
      console.log(`Repay event: User: ${user}, Amount: ${amount}`);
      // Record the address
      recordAddress(user,amount);
    });
  
    // Listen for Borrow events
    contract.on('Borrow', (reserve, user,onBehalfOf, amount,event) => {
      i = 2;
      console.log(`Borrow event: User: ${user}, Amount: ${amount}`);
      // Record the address
      recordAddress(user,amount);
    });
  
    // Listen for Withdraw events
       contract.on('Withdraw', (reserve, user,to, amount,event) => {
        i = 3;
        console.log(`Withdraw event: User: ${user}, Amount: ${amount}`);
        // Record the address
        recordAddress(user,amount);
      });
      
  
    // Listen for Borrow events
    // contract.on('Borrow', (user, amount, event) => {
    //   console.log(`Borrow event: User: ${user}, Amount: ${amount}`);
    //   // Record the address
    //   recordAddress(user,amount,event);
    // });
  
    // You can add listeners for other events based on your requirements.

  }
  
  async function recordAddress(address,amount,event) {
    // Implement the logic to record the address
    let res = await contract.getUserAccountData(address)
    console.log('user:'+ address + ', healthFactor: '+ Number(res.healthFactor._hex).toFixed(0)+ ',event:'+eventArray[i] )
    writeCSV(address,eventArray[i],amount,Number(res.healthFactor._hex).toFixed(19),Number (new Date().getTime()))
  }
const main = async () => {
  initOutPut()
  monitorAaveEvents()
}

function initOutPut(){
  let csvContent = '\uFEFF';
  let row = `number,user,event,amount,health_factor,timestamp\n`
  csvContent = csvContent.concat(row);
  fs.writeFileSync(file, csvContent);
}

function writeCSV(user,event,amount,health_factor,timestamp) {
  let csvContent = `${counter},${user},${event},${amount},${health_factor},${timestamp}\n`
  fs.appendFileSync(file,csvContent);
  counter+=1;
}


main()
