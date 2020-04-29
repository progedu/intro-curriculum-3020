'use strict';
const http = require('http'),
      router = require('./lib/router'),

      server = http.createServer((req, res) => {
        router.route(req, res);
      }).on('error', (e) => {
        console.error('Server Error', e);
      }).on('clientError', (e) => {
        console.error('Client Error', e);
      }),

      port = 8000;
server.listen(port, () => {
  console.info('Listening on ' + port);
});