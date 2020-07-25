const mongoose = require('mongoose');

const SwapSchema = mongoose.Schema({
  transaction_hash: {
    type: String,
    required: true,
    unique: true,
  },
  trxAddress: {
    type: String,
    required: true,
  
  },
  ethAddress: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
 
});

const Swap = mongoose.model('Swap', SwapSchema);

module.exports.create = async (params) => {
  try {
    let doc=await Swap.findOne({transaction_hash:params.transaction_hash});
    if(doc){
        return;
    }
    console.log("Saving data..")
    const newSwap = await new Swap(params).save();
    console.log("Saved");
    //return newParty;
  } catch (error) {
    throw new Error(error);
  }
};