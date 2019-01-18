import {JSEncrypt} from 'jsencrypt'
import Jsrsasign from 'jsrsasign'

const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm/Mo8LHDV+t24KsJj3uHZsSLgsU23yxlT20k/xUQKXxIaaedeRhYXod0cC4iAhnk5UNFT7caDw0jCTyD7Y4vPq05+jgpqlUiexNZTZNQ/09lPXneD1Y132W5osUMFi30/izGe3MKOoB2Ooe1RHuD8hYc36r01oQHn8D72Z4BI9pVo+sk+jisHgNvd8gviLKTNtPSwOuKkrYXZDvuaIQfOMWDVia3UvMNMB2cW/puBwL5jyxFqDJ1bUYSdnB9hnMNcGD4PbWE4PzOwEyPKBAeTVqx98NbPdW4p/i6PuVR///Tq/ZcNssILZih6TWvKxLclAfhTp2+dtonG1np1CdFUwIDAQAB';

const privateKey  = '' +
            'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDP0i3gtvAdggUv' +
            'cLpO7+99PMqdYiGp1/WCssdEX3v/pg13yB9IVZkfh+9yvAjooEu+TCidmKRaMrd7' +
            'sSzgStE7oBvpfjBGWx0FSYyooky/ajpbEHOFRN1hNHQhMDvRcMgW2wh6/Mt4VX2M' +
            'W1H1SU9cXXVuQhHFsQhejEpX8Pn1Ehnus+KTR/9ip1OHAlig37L7IAP10S7MURRO' +
            'NCdPb43rLgUATatA9BbEtjQlVJkbGkz/VXi9jH9sFfmN0iK9USdH7GB5JT72+F4g' +
            'sNN76E6jXWjI99tsjsBCGuunk0pqVH+LRXFYqlSnBDZBFXoxJHsVi0m+Ufb4dwBt' +
            's9U9FxHFAgMBAAECggEAd6C4EfucWpAGphlQ1bGd/UxqIZBkal1LEPISbJQ+T5np' +
            'dML45u2HGDRqrHP6+NWU5DT4yEcejGFXZ1dEytOmf5kZmB2wcj9uhCWjV0sdvK3M' +
            'a7EbnmJWwOat1pDqThSKyUVKK2mrQliLzaifk/+gND4EI/TaQB84/xvoi5jGeb/p' +
            'JPiFijUnQ3WLZHevLouP9j0iJdDd8Jz1ggk8osOZQMr9/eLMbzypsV1bl5CKNOY0' +
            'THMNFX2As7MAGn1GOCQL6cYQd4tXy09gL2nBu5wjBuP/x9ddhbvPeA4D4DRD80m/' +
            'nUmqvYLRVWhd7tLS5CceZEnwE9Z01qtWXTGmVhEQYQKBgQDpyHb8VBRtE1NWWenv' +
            '/GGaGMX1TF0WYyNHGvQENVIsC71n6v/Qsrjg0pZwcld8cwk1zgqM6kUlMPIAQv9J' +
            'hR1jXQarX2OMkpA2i025DmhfDuOtEXhnFI2oukwiS16zTuKFi1lZVi7FBI93fR8O' +
            '/TqfniRnf9x2nw7fVe1Q6wJuSQKBgQDjkhpUC5+e+1wqw5typngRXeA0w/Bf+qEy' +
            'ImxQ3dAvaqbqjyrq4CTTCJlLWdIHjJnqFPc59/khJyvmsExVJEpZPKJcrPA7i6Dl' +
            'N+d9RrSR9fgXBBw6Ur4uWkHWBy7sRh/Fr8IFTLQffscMtuNAGTzkrdDyGPTJovxS' +
            'FXYbRqn3nQKBgBn62BY0dcylUCaReWjdAC+yvxUCdnnNbJczTJjHICma6GKLAAC+' +
            'S8NYQ7WdT1GaKxTan9uHEUYPyWT0DRCrhVeMd/hFcneltfcJxgphqoGd0vlhrqKt' +
            '6wwsH9fTzmNYyd2TXcuKw0nLtvHNas0soP4qAduqnuJjzLBPCT9rzmpZAoGBAN91' +
            'mrbGhyHUjsdLNjwZbLMY7EzDzihg8aJKHPQ3KvM0ldyjYrAqEt7KhcRw2YUiMgyi' +
            'M7VPYumEDl7C5OGB9iO0H3ZDNs4xqHcMMxpXsH3W+pqXJaS7lRXs+NLSUOgfX5l9' +
            'oVYU4JZApfI9L97EKYAfkZn4mX3Ztkxf2I6mD8YdAoGAFEN1uBu7WpzUszdckCja' +
            'mD2H0LSfoBRTBINowhkZJR7SXbkU0iaEXMH6e29idyweDvcQ8iec97fwTYQOzl1Q' +
            'moQaTurcAifoPLCGBPNRaMVg7+zlwNRaw8FoqkUfOV/K75JSK1PCkP0j2EOOwo0p' +
            'v3M5bYM3d3JzyNISTTwca9k=';


export const  RSADecrypt = (encrptData) => {
    var encypt = new JSEncrypt()
    encypt.setPrivateKey(privateKey)
    var a = encypt.decryptLong2(encrptData)

    return a;
}

export const  RSAEncrypt = (data) => {
    var encypt = new JSEncrypt();
    encypt.setPublicKey(publicKey)
    var a = encypt.encryptLong(data)
    return a;
}

export const SHASign = (data)=>{
    var rsa = new Jsrsasign.RSAKey();
     //因为后端提供的是pck#8的密钥对，所以这里使用 KEYUTIL.getKey来解析密钥
     var k = `-----BEGIN PRIVATE KEY-----
        ${privateKey}
-----END PRIVATE KEY-----`
     // 将密钥转码
     rsa = Jsrsasign.KEYUTIL.getKey(k);  
     // 创建Signature对象，设置签名编码算法
     var sig = new Jsrsasign.KJUR.crypto.Signature({"alg": "SHA1withRSA"});
     // 初始化
     sig.init(rsa)
     // 传入待加密字符串
     sig.updateString(data)
     // 生成密文
     var sign = Jsrsasign.hextob64(sig.sign());
     // 对加密后内容进行URI编码
     //sign = encodeURIComponent(sign);
     //把参数与密文拼接好，返回
     
     return sign;
}
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function hex2b64(h) {
    var i;
    var c;
    var ret = "";
    for (i = 0; i + 3 <= h.length; i += 3) {
        c = parseInt(h.substring(i, i + 3), 16);
        ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }
    if (i + 1 == h.length) {
        c = parseInt(h.substring(i, i + 1), 16);
        ret += b64map.charAt(c << 2);
    }
    else if (i + 2 == h.length) {
        c = parseInt(h.substring(i, i + 2), 16);
        ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
    }
    while ((ret.length & 3) > 0) {
        ret += b64pad;
    }
    return ret;
}


JSEncrypt.prototype.encryptLong = function(string) {
    var k = this.getKey();
    
	try {
		var lt = "";
		var ct = "";
		//RSA每次加密117bytes，需要辅助方法判断字符串截取位置
		//1.获取字符串截取点
		var bytes = new Array(); 
		bytes.push(0);
		var byteNo = 0;
	    var len,c;  
	    len = string.length;
	    var temp = 0;
	    for(var i = 0; i < len; i++){
	        c = string.charCodeAt(i);  
	        if(c >= 0x010000 && c <= 0x10FFFF){  
	        	byteNo += 4; 
	        }else if(c >= 0x000800 && c <= 0x00FFFF){  
	        	byteNo += 3; 
	        }else if(c >= 0x000080 && c <= 0x0007FF){  
	        	byteNo += 2; 
	        }else{  
	        	byteNo += 1; 
	        }
	        if((byteNo % 117) >= 114 || (byteNo % 117) == 0){
	        	if(byteNo-temp >= 114){
	        		bytes.push(i);
	        		temp = byteNo;
	        	}
	        }
	    }  
		//2.截取字符串并分段加密
	    if(bytes.length > 1){
	    	for(var i=0;i< bytes.length-1; i++){
	    		var str;
	    		if(i == 0){
	    			str = string.substring(0,bytes[i+1]+1);
	    		}else{
	    			str = string.substring(bytes[i]+1,bytes[i+1]+1);
	    		}
	    		var t1 = k.encrypt(str);
	    		ct += t1;
	    	};
	    	if(bytes[bytes.length-1] != string.length-1){
	    		var lastStr = string.substring(bytes[bytes.length-1]+1);
	    		ct += k.encrypt(lastStr);
	    	}
	    	return hex2b64(ct);
	    }
		var t = k.encrypt(string);
		var y = hex2b64(t);
		return y;
	} catch (ex) {
		return false;
	}

}
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
function int2char(n) {
    return BI_RM.charAt(n);
}
function b64tohex(s) {
    var ret = "";
    var i;
    var k = 0; // b64 state, 0-3
    var slop = 0;
    for (i = 0; i < s.length; ++i) {
        if (s.charAt(i) == b64pad) {
            break;
        }
        var v = b64map.indexOf(s.charAt(i));
        if (v < 0) {
            continue;
        }
        if (k == 0) {
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 1;
        }
        else if (k == 1) {
            ret += int2char((slop << 2) | (v >> 4));
            slop = v & 0xf;
            k = 2;
        }
        else if (k == 2) {
            ret += int2char(slop);
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 3;
        }
        else {
            ret += int2char((slop << 2) | (v >> 4));
            ret += int2char(v & 0xf);
            k = 0;
        }
    }
    if (k == 1) {
        ret += int2char(slop << 2);
    }
    return ret;
}





JSEncrypt.prototype.decryptLong = function(string) {
    debugger
    var k = this.getKey();
     var maxLength = 256;
    try {
      var string = b64tohex(string);
      var ct = "";
      if (string.length > maxLength) {
        var lt = string.match(/.{1,256}/g);
        lt.forEach(function(entry) {
          var t1 = k.decrypt(entry);
          ct += t1;
        });
        return ct;
      }
      var y = k.decrypt(b64tohex(string));
      return y;
    } catch (ex) {
      return false;
    }
}

JSEncrypt.prototype.decryptLong2 = function(string) {
    var k = this.getKey();
   
            // var maxLength = ((k.n.bitLength()+7)>>3);
    var MAX_DECRYPT_BLOCK = 256;
    try {
        var ct = "";
        var t1;
        var bufTmp;
        var hexTmp;
        var str = b64tohex(string);
        var buf = hexToBytes(str);
        var inputLen = buf.length;
        //开始长度
        var offSet = 0;
        //结束长度
        var endOffSet = MAX_DECRYPT_BLOCK;

        //分段加密
        while (inputLen - offSet > 0) {
            if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
                bufTmp = buf.slice(offSet, endOffSet);
                hexTmp = bytesToHex(bufTmp);
                t1 = k.decrypt(hexTmp);
                ct += t1;
                
            } else {
                bufTmp = buf.slice(offSet, inputLen);
                hexTmp = bytesToHex(bufTmp);
                t1 = k.decrypt(hexTmp);
                ct += t1;
                
            }
            offSet += MAX_DECRYPT_BLOCK;
            endOffSet += MAX_DECRYPT_BLOCK;
        }
        return ct;
    } catch (ex) {
        return false;
    }
}
function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

// Convert a byte array to a hex string
function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return hex.join("");
}



