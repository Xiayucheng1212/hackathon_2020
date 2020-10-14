//引用'http'模組
// const http = require('http');

const express = require('express');
const app = express();
const mongoose = require('mongoose');


//設定server網址，因為在本機端測試，所以輸入127.0.0.1
//const hostname = '127.0.0.1'  //上傳至伺服器需拿掉
app.get('*', (req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('hiiiiiii');
})
//port 號會由 Heroku 給予，因此不再自行指定
const port = process.env.PORT || 3000;
app.listen(port);
console.log('服務器連結成功');
