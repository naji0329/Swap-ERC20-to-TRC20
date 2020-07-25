require('dotenv').config();
const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const { eventListener }= require("./controllers/eventListener");
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '4000');

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = async () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
  // await tokenPriceModel.create({});
  //cronHelper.startCron();
};
eventListener();
app.set('port', port);
server.listen(port);
server.timeout = 600000;
server.on('error', onError);
server.on('listening', onListening);
