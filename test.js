const fs = require('fs')
const srcimage = fs.readFileSync('./public/product_images/image-1702526296436.jpg')
var buf = Buffer.from(srcimage);
const rawBuf= Buffer.toString('base64')
const imageSrc = "data:image/png;base64," + rawBuffer;
const image = document.createElemment("img");
image.src = imageSrc;
console.log(baseimg)