const fs = require('fs');

fs.stat('newfile1.txt', (err, stats) => {
    if(err) {
        console.log('Cannot get stats of file '+err);
        return;
    }
    
    // stats.isDirectory();
    // stats.isFile();
    // stats.size;

    console.log(`isDirectory: ${stats.isDirectory()}, isFile : ${stats.isFile()}, size: ${stats.size}`)
})