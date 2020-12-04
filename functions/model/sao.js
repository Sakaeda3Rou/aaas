const admin = require('firebase-admin');
const functions = require('firebase-functions');

const bucket = admin.storage().bucket();

// マーカーファイルのアップロード
exports.upload_marker = (file_name, body) => {
  return new Promise((resolve, reject) => {

    // 整形
    body = body.replace(/.+,/, '');
    body = new Buffer(body, 'base64');

    const upload_file = bucket.file(`marker_images/${file_name}`);

    upload_file.save(body, {
      predefinedAcl: 'publicRead',
      metadata: {
        contentType: 'image/png',
      },
    });
  });
};

// パターンファイルのアップロード
exports.upload_patt = (file_name, body) => {
  return new Promise((resolve, reject) => {

    const upload_file = bucket.file(`patterns/${file_name}`);

    upload_file.save(body, {
      predefinedAcl: 'publicRead',
      metadata: {
        contentType: 'application/octet-stream',
      },
    });
  });
};

// ファイルのメディアURLを取得
exports.get_file_url = async (file_name) => {

  // 指定ファイルのメタデータを取得
  const file = await buket.file(`patterns/${file_name}`).getMetadata();

  // メタデータからメディアURLを取得
  const file_url = file[0].mediaLink

  return file_url;
};
