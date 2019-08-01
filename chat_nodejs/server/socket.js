
const MessageModel = require('./models/messages')


module.exports = io =>{
    io.on('connection', function (socket) {
        socket.emit('connected', "You are connected! YEAH!");
    
        socket.join('all');
    
        socket.on('msg', (content) =>{
            const obj = {
                date: new Date(),
                content: content,
                username: "Farhod"
            };

            MessageModel.create(obj, err=>{
                if(err) return console.error("MessageModel", err);
                socket.emit('message', obj );
                socket.to('all').emit('message', obj)
            })
        });

        socket.on('receiveHistory', () =>{
            MessageModel
                .find({}) 
                .sort({date: -1})
                .limit(5)
                .sort({date: 1})
                .lean()
                .exec( (err, messages) =>{
                    if(!err){
                        socket.emit('history', messages );
                    }
                })   
        })
    
      });
};