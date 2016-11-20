'use strict';

const Socket = require('net').Socket;
const NUM_CLIENTS = 500;
const SERVER = {
  host: 'localhost',
  port: '8080'
};

for (let i = 0; i < NUM_CLIENTS; i++) {
  let client = new Socket();
  client.connect(SERVER);
}
