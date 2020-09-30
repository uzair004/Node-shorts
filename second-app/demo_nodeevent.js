const fs = require('fs')
const events = require('events');

const eventEmitter = new events.EventEmitter();

const rs = fs.createReadStream('./newfile1.txt');

rs.on('open', () => {
    console.log('file is opened..');
});