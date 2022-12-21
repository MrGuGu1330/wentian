const fs = require('fs').promises
function delFile(fileName,fileDir){
     return  fs.unlink(`public/${fileDir}/${fileName}`).catch(err=>err)
}


module.exports = delFile