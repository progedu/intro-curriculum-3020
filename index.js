'use strict';
let http = require('http');
let router = require('./lib/router');

let server = http.createServer((req, res) => {
  router.route(req, res);
}).on('error', (e) => {
  console.error('Server Error', e);
}).on('clientError', (e) => {
  console.error('Client Error', e);
});

let port = 8000;
server.listen(port, () => {
  console.info('Listening on ' + port);
});