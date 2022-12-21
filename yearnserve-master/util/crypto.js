const crypto = require("crypto");
let key = "abcdef1234567890";
let iv = "abcdef1234567890";

const cy = {
// 定义加密算法
 encrypt(data) {
  // 定义传来的key值符合aes-128-cbc格式
  let dep = crypto.createCipheriv("aes-128-cbc", key, iv);
  return dep.update(data, "binary", "hex") + dep.final("hex");
},
// 定义解密算法
 decrypt(crypted) {
  crypted = Buffer.from(crypted, "hex").toString("binary");
  let decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  return decipher.update(crypted, "binary", "utf8") + decipher.final("utf8");
}
}
module.exports  =cy
