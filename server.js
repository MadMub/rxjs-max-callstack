'use strict';

const net = require('net');
const Rx = require('rxjs/Rx');
const PORT = process.env.PORT || 8080;

function connection(client) {
  console.log('[CLIENT CONNECTED]');
  let data = Rx.Observable.fromEvent(client, 'data');
  let error = Rx.Observable.fromEvent(client, 'error');
  let close = Rx.Observable.fromEvent(client, 'close');

  data.do(d => console.log(d.toString()))
    .takeUntil(close)
    .subscribe();

  error.do(e => console.log(`[CLIENT ERROR] ${e.stack}`))
    .do(() => client.destroy())
    .takeUntil(close)
    .subscribe();

  close.do(had_error => console.log('[CLIENT CLOSE]'))
    .take(1)
    .subscribe();
}

let server = net.createServer(connection)
  .on('error', e => console.log(`[SERVER ERROR] ${e.stack}`))
  .listen(PORT, () => console.log(`listening for proxy clients on port ${PORT}`));
