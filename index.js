// 厳密モード
'use strict';
// httpモジュール呼び出し
const http = require('http');
// 自作のrouterモジュール呼び出し(.jsは省略可能)
const router = require('./lib/router.js');
/** 
 * サーバー作成
 * 第一引数：サーバーにリクエストがあったときに実行するコールバック（以下CB）関数
 * 　　CB関数の引数１：IncomingMessage
 * 　　CB関数の引数２：ServerResponse
 * 　　CB関数の戻り値：void
*/
const server = http.createServer((req, res) => {
    // 'hi'を書き出して終了
    // res.end('hi');
    router.route(req,res);
});
/**
 * サーバーエラーなどのイベント発生時の処理を設定
 * 第一引数：イベント名
 * 第二引数：イベント発生時に実行するコールバック関数
 * 　　CB関数の引数：Error
 * 　　CB関数の戻り値：void
 */
server.on('error', (e) => {
    // 標準エラー出力にエラー情報を出力
    console.error('Server Error', e);
});
// 同上
server.on('clientError', (e) => {
    console.error('Client Error', e);
});
// ポート番号
const port = 8000;
/**
 * サーバー起動
 * 第一引数：ポート番号
 * 第二引数：サーバー起動時に実行するコールバック関数
 */
server.listen(port, () => {
    // 使用するポート番号を書き出す
    console.info('Listening on ' + port);
});