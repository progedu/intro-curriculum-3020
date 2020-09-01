'use strict';
const http = require('http');
const router = require('./lib/router');//作業ディレクトリを基準として相対パスを指定。モジュールを require で読み込む際には、.js は省略可

const server = http.createServer((req, res) => {
  router.route(req, res);//route という関数で必要なリクエストの振り分け処理を行ってくれる
}).on('error', (e) => {
  console.error('Server Error', e);
}).on('clientError', (e) => {
  console.error('Client Error', e);
});

const port = 8000;
server.listen(port, () => {
  console.info(`ポート ${port} 番でサーバーを起動しました`);
});