const express = require('express');
const app = express();
const http = require('http').Server(app);
const MongoClient = require('mongodb').MongoClient;
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const url = "mongodb://admin:Gagarina18@ds141870.mlab.com:41870/ws-test";
MongoClient.connect(url, {useNewUrlParser: true}, function (err, database) {
    let db = database.db();
    if (err !== null)
        console.log("Error: " + err.message);
    let messagesCollection = db.collection('chat-messages');

    io.on('connection', function (socket) {
        console.log("a new user connected. ");

        messagesCollection.find().toArray().then(function (docs) {
            socket.emit('chat history', docs);
        });

        socket.on('chat message', function (msg) {
            messagesCollection.insertOne({text: msg}, function (err, res) {
                console.log("inserted a doc to the db");
            });
            io.emit('chat message', msg);
        });
    });
});

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
