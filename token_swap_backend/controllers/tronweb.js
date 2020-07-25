const TronWeb = require('tronweb');
//;
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://api.trongrid.io');
const solidityNode = new HttpProvider('https://api.trongrid.io');
const eventServer = new HttpProvider('https://api.trongrid.io');
const pk = process.env.PK;
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, pk);

let address = tronWeb.address.fromPrivateKey(pk);

tronWeb.defaultAddress = {
  hex: TronWeb.address.toHex(address),
  base58: address,
};

module.exports = tronWeb;