const Web3 = require('web3');
const options = {
    // Enable auto reconnection
    reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 1000000000000000000000000000000000000000000000000,
        onTimeout: true
    }
  };
let provider=new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/22d00d3a2af54901ae40806d0c36b870',options)
let web3 = 
    new Web3(provider);

//;
provider.on('connect', function () {
    console.log('WSS connected');
});
provider.on('error', e => console.log('WS Error', e));
provider.on('end', e => {
    console.log('WS closed');
    console.log('Attempting to reconnect...');
    provider = new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/22d00d3a2af54901ae40806d0c36b870',options);

    provider.on('connect', function () {
        console.log('WSS Reconnected');
    });
    
    web3.setProvider(provider);
});

module.exports = web3;
