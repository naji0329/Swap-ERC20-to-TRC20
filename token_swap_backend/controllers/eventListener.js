const web3 = require('./web3')
const tronWeb = require('./tronweb');
const { contract } = require('./contract')
const swapModel = require('../models/swap.model')
const {create} = require("../models/hash.model")
const { hash } = require('../models/hash.model')
const { swapContract } = require("./swap")


async function transfer(details) {
  try{
  let amount1 = await web3.utils.fromWei(details.amount.toString(), 'ether');
  amount1 = parseFloat(amount1).toFixed(6);
  console.log("Amount to transfer:",amount1+" MIMA")
  let amount2 = await tronWeb.toSun(amount1);
  let user = await swapContract.methods.storedAddress(details.address).call();
  let owner = "TERoxVwntfkqxpZpNkjh8pmwqSLxEwzSmR"
  let contractAddress = "TFouHv3jFqMbHuz1Y2bXyShTywNrofauSA"
  var options = {
    feeLimit: 20000000,
    callValue: 0,
  };

  let params = [
    { type: 'address', value: user },
    { type: 'uint256', value: amount2 },
  ];

  let tx = await tronWeb.transactionBuilder.triggerSmartContract(
    tronWeb.address.toHex(contractAddress),
    'transfer(address,uint256)',
    options,
    params,
    tronWeb.address.toHex(owner)
  );
  const signedTransaction = await tronWeb.trx.sign(tx.transaction, process.env.PK);

  await tronWeb.trx.sendRawTransaction(signedTransaction, async (err, result) => {
    try {
      if (err) {
        console.error(err);
      }
      console.log("Transferring ... ")
      let obj = {
        transaction_hash: details.transaction_hash,
        trxAddress: user,
        ethAddress: details.address,
        amount: details.amount
      }

      // await User.updateOne({ trxAddress: newDoc.trxAddress }, { executed: true });
      await checkStatus(tx.transaction.txID, obj);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  });
}
catch(err){
  console.log("Error:",err)
}
}
async function checkStatus(id, details) {
  try {
    let timer = setInterval(async () => {
      try {
        let info = await tronWeb.trx.getTransactionInfo(id);
        if (info.receipt) {
          if (info.receipt.result === 'SUCCESS') {
            clearInterval(timer);
            console.log("*****")
            console.log('SUCCESS for : ')
            console.log("TRX address:",details.trxAddress)
            console.log("ETH address:",details.ethAddress);
            console.log("*****")
          } else if (info.result === 'FAILED') {
            clearInterval(timer);
            console.log("*****")
            console.log('FAILED for : ')
            console.log("TRX address:",details.trxAddress)
            console.log("ETH address:",details.ethAddress);
            console.log("*****")
            await swapModel.create(details);
            // await mailHelper.sendLogMail(info);
            // await mailHelper.sendLogMail2(info);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}

module.exports.eventListener = async () => {
  try{
 let add1="0xd9AB0c443A46859BB7EeF4c06fB67211Ff54F329"
 let add2="0x4232f2bfddf88971871f3c46f228107704294b89"
  var TransferEvent = await contract.events.Transfer(
    {
      filter: { to: "0x649db4f28bE891B87dea9759c2E4Bbf88a50E572" },
    },
    async (error, result) => {
      if (result) {
        try{
       
        if(result.returnValues.from.toLowerCase()==add1.toLowerCase() || result.returnValues.from.toLowerCase()==add2.toLowerCase()){
          console.log("blocked address")

        }
        else{
        let done = await swapContract.methods.isStored(result.returnValues.from).call()
  
        if (done == true) {

          let obj = {
            address: result.returnValues.from,
            transaction_hash: result.transactionHash,
            amount: result.returnValues.value
          }
          let used = await hash.findOne({ transaction_hash: result.transactionHash });
          if (used) {
            console.log("Transfer for this transacion hash is already done.")
          }
          else {
            await create(result.transactionHash);
            console.log("Transfer process is initiated!")
            //console.log(result.returnValues.value)
            transfer(obj);
          }
        }
        else {
          console.log("You haven't stored trx address, your eth address is :",result.returnValues.from)
        }

      }
    }
    catch(err){
      console.log("Error:",err);
    }
  }
       else {

        console.log("Error:", error);
      }
      
    }
      
    
    
  );
  }
  catch(err){
    console.log("Error:",err);
  }

}