const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('model'));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxage: 1000 * 60 * 1
  }
}));

admin.initializeApp(functions.config().firebase);

exports.app = functions.https.onRequest(app);


// get regist user
app.get('function/regist_user', (req, res) => {
  // TODO: make and save ARmarker

  fs.readFile('views/regist_user.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  })
})

//////////////
//ユーザ登録//
/////////////
app.post('/function/my_page', (req, res) => {
  // TODO: パラメータを取得
  // userName : {adana: 'UNC_Saikyouman'}
  let userName = req.body._userName;
  let birthday = req.body._birthday;

  // TODO: databaseへの登録 => dao
  const dao = require('./model/dao.js')
  // dao.登録メソッド（パラメータ）
  dao.savewithId('user_detail', user_id, {userName:userName , birthday:birthday});

  // TODO: マイページへの遷移
  fs.readFile('views/my-page.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

/////////////////////
//マイページへの遷移//
////////////////////
app.get('/function/my_page', (req, res) => {
  fs.readFile('views/my-page.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

///////////////////////
//プロフィールへの遷移//
//////////////////////
app.get('/function/profile', (req, res) => {
  fs.readFile('views/profile.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// update profile
app.put('/function/profile', (req, res) => {
  // get req.body
  let userName = req.body._userName;
  let birthday = req.body._birthday;

  // TODO: require dao and throw datas for update

  fs.readFile('views/profile.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  })
})

/////////////////
//ヘルプへの遷移//
////////////////
app.get('/function/help', (req, res) => {
  fs.readFile('views/help.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

//////////////////////////////
//ハンバーガーメニューへの遷移//
/////////////////////////////
app.get('/function/hamburger', (req, res) => {
  fs.readFile('views/hamburger.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

/////////////////
//カメラへの遷移//
////////////////
app.get('/function/camera', (req, res) => {
  fs.readFile('views/camera.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

//////////////////////////
//マイオブジェクトへの遷移//
//////////////////////////
app.get('/function/my_object', (req, res) => {
  fs.readFile('views/my-object.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

//////////////////////////
//オブジェクト共有への遷移//
//////////////////////////
app.get('/function/object_share', (req, res) => {
  fs.readFile('views/object-share.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

/////////////////////
//クラン機能への遷移//
////////////////////
app.get('/function/clan', (req, res) => {
  fs.readFile('views/clan.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});
