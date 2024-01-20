const util = require('util');
const Multer = require("multer");
const maxSize = 2 * 1024 * 1024;

// let processFile = Multer({
//     storage: Multer.memoryStorage(),
//     limits: {
//         fileSize: maxSize,
//     }
// })

// let uploadFile = util.promisify(processFile);

var storage = Multer.memoryStorage();
var limits = {
    fileSize: maxSize
}


module.exports = uploadFile;