const mongoose = require('mongoose');

const HashSchema = mongoose.Schema({
  transaction_hash: {
    type: String,
    required: true,
    unique: true,
  },
});

const Hash = mongoose.model('Hash', HashSchema);

let create = async (hash) => {
  try {
    console.log("Saving hash: ",hash)
    let doc = await Hash.findOne({ transaction_hash: hash });
    if (doc) {
      console.log("Already added");
      return null;
    }
    console.log("Saving data..")
    const newHash = await new Hash({ transaction_hash: hash }).save();
    console.log("Saved");
    return newHash;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  hash: Hash,
  create: create
}