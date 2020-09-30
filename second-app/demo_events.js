const events = require('events');
const eventEmitter = new events.EventEmitter();

function myEventHandler() {
    console.log('custom event fired...');
}

eventEmitter.on('scream', myEventHandler);

eventEmitter.emit('scream');