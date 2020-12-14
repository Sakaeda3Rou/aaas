const sao = require('./sao.js')
const {createCanvas, loadImage} = require('canvas')
const canvas = createCanvas()
const context = canvas.getContext('2d')

exports.create_image = async(uid) => {

  // 基礎imageをロード
  let image = await loadImage('images/wappenQR.png')

  // キャンバンスのサイズを設定
  canvas.width = image.width
  canvas.height = image.height

  // imageにuidを書き込む
  image = await draw_uid_to_image(uid, image)

  // pattFileStringを作成
  const pattFileString = await create_patt(image)

  // imageに黒枠を追加
  image = await add_black_frame(image)

  sao.upload_patt(`${uid}.patt`, pattFileString)

  // imageをストレージに保存
  sao.upload_image(`${uid}.png`, image.src)

}

// uidを描画
async function draw_uid_to_image(uid, image) {
  const text1 = uid.substr(0, 14);
  const text2 = uid.substr(14, 14);

  context.drawImage(image, 0, 0, canvas.width, canvas.height)

  // 文字のスタイルを指定
  context.font = '20px sans-serif'
  context.fillSyle = '#c23a1e'

  // 文字の配置を指定
  context.textBaseline = 'center'
  context.textAlign = 'center'

  // 座標を指定して文字を描画
  var x = (canvas.width/2)
  var y = (canvas.height*3.5)
  context.fillText(text2, x, y)
  y = (canvas.height/2)
  context.fillText(text1, x, y)

  image.src = canvas.toDataURL()

  return image
}

// 黒枠を追加
async function add_black_frame(image) {
  const frame = await loadImage('images/black.png')

  // キャンバスのサイズを指定
  canvas.width = frame.width
  canvas.height = frame.height

  // 全面黒に染め上げる
  context.drawImage(frame, 0, 0, canvas.width, canvas.height);

  // qrを被せる
  context.drawImage(image, 103, 103, image.width, image.height);

  console.log(`toDataURL(add_black_frame) => ${canvas.toDataURL()}`)

  image.src = canvas.toDataURL();

  return image;
}

// pattファイルを作成
async function create_patt(image) {

  canvas.width = 16;
  canvas.height = 16;

  var patternFileString = ''
  for(var orientation = 0; orientation > -2*Math.PI; orientation -= Math.PI/2) {

    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width/2, canvas.height/2, canvas.width, canvas.height);
    context.rotate(orientation);
    context.drawImage(image, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    context.restore();

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height)

    if (orientation !== 0) patternFileString += '\n'

    for(var channelOffset = 2; channelOffset >= 0; channelOffset--) {
      for(var y = 0; y < imageData.height; y++) {
        for(var x = 0; x < imageData.width; x++) {
          if(x !== 0) patternFileString += ' '

          var offset = (y*imageData.width*4) + (x * 4) + channelOffset
          var value = imageData.data[offset]

          patternFileString += String(value).padStart(3);
        }
        patternFileString += '\n'
      }
    }
  }

  return patternFileString
}
