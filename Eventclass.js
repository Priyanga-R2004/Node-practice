const EventEmitter =require('events');

class Eventclass extends EventEmitter
{
    log(msg)
    {
        console.log(msg);
    
    this.emit('messageLogged',{id:1,url:'https://'});
    }
}

module.exports = Eventclass;