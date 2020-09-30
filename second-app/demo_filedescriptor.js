const fs = require('fs');

fs.open('newfile1.txt', 'r', (err, fd) => {
    if(err) console.log(err);
    console.log('file description '+fd);
})