/*const EventEmitter = require('events'); //here EventEmmiter is an class

const emitter = new EventEmitter(); //create obj for the class

//register a listener
emitter.on('messageLogged',function(e){
    console.log('messageLogged listener in called ',e);
})

//raise an event
emitter.emit('messageLogged',{id:1,url:'https://'});

*/

const EventEmitter = require('events');
const Eventclass = require('./Eventclass');
const logger = new Eventclass();
logger.on('messageLogged',function(e){
    console.log('messageLogged listener in called ',e);
});
logger.log('logger message');





