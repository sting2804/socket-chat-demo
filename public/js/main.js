$(document).ready(function () {
    const socket = io(),
        messageForm = $('#messageForm'),
        messageField = $('#message'),
        messagesList = $('#messages'),
        usernameLabel = $('#username')
    ;

    messageForm.submit(function () {
        socket.emit('chat message', messageField.val());
        messageField.val('');
        return false;
    });
    socket.on('connect', function () {
        console.log("connect event");
        if ($.cookie('chat_username')) {
            username = $.cookie('chat_username')
        } else {
            username = 'Anonymous ' + (new Date()).getTime()
        }
        $.cookie('chat_username', username);
        usernameLabel.text(username);
        console.log("username: "+username);
    });
    socket.on('chat message', function (msg) {
        messagesList.append($('<li>').text(msg));
        window.scrollTo(0, document.body.scrollHeight);
    });
    socket.on('chat history', function (docs) {
        docs.forEach(function (msg) {
            messagesList.append($('<li>').text(msg.text));
            window.scrollTo(0, document.body.scrollHeight);
        });
    });
});