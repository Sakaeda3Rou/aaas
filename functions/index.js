const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const dao = require('./model/dao.js');

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

<<<<<<< HEAD
exports.app = functions.https.onRequest(app);


// get regist user
app.get('function/regist_user', (req, res) => {
=======
// get login
app.get('function/login', (req, res) => {
>>>>>>> 3b09420d9c9e0128b0eb66437fe43d5acd31162c
  // TODO: make and save ARmarker

  // TODO: select * from user_detail where userId = userId
  // NB: insert userId at userId from session
  const res = dao.selectDocOneColumn('user_detail', 'userId', '==', userId)

  if(res == null){
    // no document
    // TODO: containment_clan
    fs.readFile('views/profile.html', 'utf-8', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }else{
    // not first login
    fs.readFile('views/my_page.html', 'utf-8', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
});

// post login
app.post('/function/login', (req, res) => {
  // TODO: save user at session

  res.end();
})

// get resist user
app.get('/function/resist_user', (req, res) => {
  fs.readFile('views/profile.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// post resist user
app.post('/function/resist_user', (req, res) => {
  // TODO: パラメータを取得
  // FIXME: userName : {adana: 'UNC_Saikyouman'}
  let userName = req.body._userName;
  let birthday = req.body._birthday;

  // TODO: databaseへの登録 => dao
  const res = dao.savewithId('user_detail', user_id, {userName:userName , birthday:birthday});

  // TODO: マイページへの遷移
  fs.readFile('views/my_page.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// get my page
app.get('/function/my_page', (req, res) => {
  fs.readFile('views/my-page.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// get profile
app.get('/function/profile', (req, res) => {
  fs.readFile('views/profile.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// update profile
app.post('/function/profile', (req, res) => {
  // get req.body
  let userName = req.body._userName;
  let birthday = req.body._birthday;

  // TODO: require dao and throw datas for update

  fs.readFile('views/my_page.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  })
})

// get help
app.get('function/help', (req, res) => {
  fs.readFile('views/help.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  })
})

// get camera
app.get('/function/camera', (req, res) => {
  fs.readFile('views/camera.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// post camera
app.post('/function/camera', (req, res) => {
  // TODO: get parameter and prepare camera session
  // return camera
})

// get object_selected
app.get('/function/object_selected', (req, res) => {

})

// post object_selected
app.post('/function/object_selected', (req, res) => {
  // TODO: send parameter about object
  // return camera
})

// get clan_selected
app.get('/function/clan_selected', (req, res) => {

})

// post clan_selected
app.post('/function/clan_selected', (req, res) => {
  // TODO: send parameter about clan
  // return camera
})

// get my_object
app.get('/function/my_object', (req, res) => {
  fs.readFile('views/my-object.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// post my_object
app.post('/function/my_object', (req, res) => {
  // TODO: send data about object and save
  // return my_object
})

// get add_object
app.get('/function/add_object', (req, res) => {

})

// post add_object
app.post('/function/add_object', (req, res) => {
  // TODO: send data about object and save
  // return my_object
})

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
