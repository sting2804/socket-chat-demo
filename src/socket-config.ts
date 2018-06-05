import * as service from './services/conversation.service'

exports = function initSocket(io) {
    // Set socket.io listeners.
    io.on('connection', (socket) => {
        console.log('a user connected');

        // On conversation entry, join broadcast channel
        socket.on('enter conversation', (conversation) => {
            socket.join(conversation);
            console.log('joined ' + conversation);
        });

        socket.on('leave conversation', (conversation) => {
            socket.leave(conversation);
            console.log('left ' + conversation);
        });

        socket.on('new message', (conversation) => {
            io.sockets.in(conversation).emit('refresh messages', conversation);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('chat message', function (msg) {
            messagesCollection.insertOne({text: msg}, function (err, res) {
                console.log("inserted a doc to the db");
            });
            io.emit('chat message', msg);
        });
    });
};
