import CryptoJS from 'crypto-js'  //引用AES源码js
var keyArray = new Array(0x6e, 0x26, 0x5f, 0xa, 0x30, 0x16, 0x29, 0x20, 0x30, 0x29, 0x1c, 0x52, 0x42, 0x1c, 0x19, 0x6a);

var ivArray= new Array(0x55, 0x6, 0x70, 0x16, 0x39, 0x20, 0x5a, 0x29, 0x66, 0x7d, 0x73, 0x7, 0x2c, 0x45, 0x35, 0x47);
var key = CryptoJS.enc.Utf8.parse(byteToString(keyArray));//十六位十六进制数作为秘钥
var iv = CryptoJS.enc.Utf8.parse(byteToString(ivArray));//十六位十六进制数作为秘钥偏移量


//解密方法
export function Decrypt(word) {
  // var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  // var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
//加密方法
export function Encrypt(word) {

  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
  return encrypted.toString();
}

function byteToString(arr) {
    if (typeof arr === 'string') {
      return arr;
    }
    var str = '',
      _arr = arr;
    for (var i = 0; i < _arr.length; i++) {
      var one = _arr[i].toString(2),
        v = one.match(/^1+?(?=0)/);
      if (v && one.length == 8) {
        var bytesLength = v[0].length;
        var store = _arr[i].toString(2).slice(7 - bytesLength);
        for (var st = 1; st < bytesLength; st++) {
          store += _arr[st + i].toString(2).slice(2);
        }
        str += String.fromCharCode(parseInt(store, 2));
        i += bytesLength - 1;
      } else {
        str += String.fromCharCode(_arr[i]);
      }
    }
    return str;
  }  