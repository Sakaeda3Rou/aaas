const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const dao = require('./static/model/dao.js');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('static'));

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

// post login
app.post('/login', (req, res) => {
  console.log('welcom to login page');

  // TODO: save user at session
  const uid = req.body.uid;

  const user = {uid: uid};

  req.session.user = user;
  // TODO: make and save ARmarker

  // TODO: select * from user_detail where userId = userId
  // NB: insert userId at userId from session
  const result = dao.selectDocOneColumn('user_detail', 'userId', '==', req.session.user.uid);

  if(result == null){
    // no document
    // fs.readFile('views/profile.html', 'utf-8', (err, data) => {
    //   res.writeHead(200, {'Content-Type': 'text/html'});
    //   res.write(data);
    //   res.end();
    // });
    res.render('views/profile')
  }else{
    // not first login
    // fs.readFile('views/my_page.html', 'utf-8', (err, data) => {
    //   res.writeHead(200, {'Content-Type': 'text/html'});
    //   res.write(data);
    //   res.end();
    // });
    res.render('views/my-page')
  }
})

// get resist user
app.get('/resist_user', (req, res) => {
  // TODO: send official clan to ejs
  const result = dao.selectDocOneColumn('clan', 'official', '==', true);

  result.forEach(doc => {
    // send to ejs
  }).catch(err => {
    // has error
  })

  fs.readFile('views/profile.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// post resist user
app.post('/resist_user', (req, res) => {
  // TODO: パラメータを取得
  // FIXME: userName : {adana: 'UNC_Saikyouman'}
  let userName = req.body._userName;
  let birthday = req.body._birthday;

  // TODO: databaseへの登録 => dao
  const result = dao.savewithId('user_detail', user_id, {userName:userName , birthday:birthday});

  if(result.hasOwnProperty(err)){
    // has error
  }

  // マイページへの遷移
  fs.readFile('views/my_page.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// get my page
app.get('/my_page', (req, res) => {
  fs.readFile('views/my_page.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// get profile
app.get('/profile', (req, res) => {
  // TODO: get userName, birthday
  const result = dao.selectDocById('user_detail', req.session.user.uid);

  const userName = result.userName;
  const birthday = result.birthday;

  // TODO: insert to html's textbox by ejs

  fs.readFile('views/profile.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// update profile
app.post('/profile', (req, res) => {
  // get req.body
  let userName = req.body._userName;
  let birthday = req.body._birthday;

  // TODO: throw datas for update
  const userDetail = require('./static/model/user_detail.js');
  userDetail.setUserDetail(userName, birthday);

  const result = dao.updateDoc('user_detail', req.session.user.uid, userDetail.getUserDetail());

  if(result.hasOwnProperty(err)){
    // has error
  }

  fs.readFile('views/my_page.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  })
})

// get help
app.get('/help', (req, res) => {
  fs.readFile('views/help.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  })
})

// get camera
app.get('/camera', (req, res) => {
  fs.readFile('views/camera.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// post camera
app.post('/camera', (req, res) => {
  // TODO: get parameter and prepare camera session
  const camera = require('./static/model/camera.js');

  // return camera
  fs.readFile('views/camera.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// get object_selected
app.get('/object_selected', (req, res) => {
  fs.readFile('views/object_selected.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// post object_selected
app.post('/object_selected', (req, res) => {
  // TODO: send parameter about object
  const newObjectId = req.body._newObjectId;

  const result = dao.changeSelected(req.session.user.uid, newObjectId);

  if(result.hasOwnProperty(err)){
    // has error
  }

  // return camera
  fs.readFile('views/camera.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// get clan_selected
app.get('/clan_selected', (req, res) => {
  fs.readFile('views/clan_selected.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// post clan_selected
app.post('/clan_selected', (req, res) => {
  // TODO: send parameter about clan
  //       make data about clan for camera
  const clanId = req.body._clanId;

  // return camera
  fs.readFile('views/camera.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// get my_object
app.get('/my_object', (req, res) => {
  fs.readFile('views/my-object.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// post my_object
app.post('/my_object', (req, res) => {
  // TODO: search my_object about category
  // and sort about 'numberOfAdd'

  // return my_object
  fs.readFile('views/my_object.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// get add_object
app.get('/add_object', (req, res) => {
  fs.readFile('views/add_object.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// post add_object
app.post('/add_object', (req, res) => {
  // TODO: save in storage and make object
  //       require sao, dao
  //       then save object make var about objectId

  // TODO: send data about my_object and save
  const locationX = req.body._locationX;
  const locationY = req.body._locationY;
  const locationZ = req.body._locationZ;

  const myObject = require('./static/model/my_object.js');

  myObject.setMyObject(req.session.user.uid, objectId, true, locationX, locationY, locationZ);

  const result = dao.saveWithoutId('my_object', myObject.getMyObject());

  if(result.hasOwnProperty(err)){
    // has error
  }

  // return my_object
  fs.readFile('views/my_object.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// get share_object
app.get('/share_object', (req, res) => {
  fs.readFile('views/share_object.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

// post share_object
app.post('/share_object', (req, res) => {
  // TODO: send word for search
  //       and do search, return result

  // return share_object
  fs.readFile('views/share_object.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// get share_my_object
app.get('/share_my_object', (req, res) => {
  // return my_object table page
  fs.readFile('views/my_object_table.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// post share_my_object
app.post('/share_my_object', (req, res) => {
  // TODO: send id about my_object's documentId
  const docId = req.body._docId;

  const result = dao.selectDocById('my_object', docId);

  if(result.hasOwnProperty(err) || result == null){
    // has error
  }

  // return config my_object page
  fs.readFile('views/config_my_object.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// put share_my_object
app.put('/share_my_object', (req, res) => {
  // TODO: send id about my_object's objectId
  //       and update 'isShared'
  const objectId = req.body._objectId;

  const result = dao.updateDoc('object', objectId, {isShared: true});

  if(result.hasOwnProperty(err)){
    // has error
  }

  // return my_object table page
  fs.readFile('views/my_object_table.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

//get clan
app.get('/clan', (req, res) => {
  // return clan page
  fs.readFile('views/clan.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// post clan
app.post('/clan', (req, res) => {
  // TODO: search clan by category
  //       and sort by 'numberOfAdd'

  // return clan page
  fs.readFile('views/clan.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// get clan_make
app.get('/clan_make', (req, res) => {
  // return make clan page
  fs.readFile('views/make_clan.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

// post clan_make
app.post('/clan_make', (req, res) => {
  // TODO: send clanName for make clan
  //       save clan
  const clanName = req.body._clanName;

  const clan = require('./static/model/clan.js');
  clan.setclan(clanName, 0, false);

  const result = dao.saveWithoutId('clan', clan.getClan());

  if(result.hasOwnProperty(err)){
    // has error
  }

  // return clan page
  fs.readFile('views/make_clan.html', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
})

exports.style = functions.https.onRequest((req, res) => {
  fs.readFile('static/css/style.css', 'utf-8', (err, data) => {
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(data);
    res.end();
  });
});

exports.reset = functions.https.onRequest((req, res) => {
  fs.readFile('static/css/reset.css', 'utf-8', (err, data) => {
    res.write(data);
    res.end();
  })
})
