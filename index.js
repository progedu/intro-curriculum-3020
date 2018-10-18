'use strict';
//httpをrequireする
const http = require('http');
//モジュールを作る
const router = require('./lib/router');
//serverモジュールを作る

const server = http.createServer((req, res) => {
//リクエストが来た時にrouteを呼び出す
	console.info('call route');
  router.route(req, res);

}).on('error', (e) => {
//errorイベントを受信したらコンソールに出す
  console.error('Server Error', e);
}).on('clientError', (e) => {
  console.error('Client Error', e);
});

const port = 8000;
server.listen(port, () => {
  console.info('Listening on ' + port);
});
