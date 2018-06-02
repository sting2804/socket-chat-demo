$(document).ready(function () {
    var socket = io(),
        messageForm = $('#messageForm'),
        messageField = $('#message'),
        messagesList = $('#messages'),
        usernameField = $('#usernameField'),
        usernameInput = $('#usernameInput'),
        usernameForm = $('#usernameForm')
    ;

    messageForm.submit(function () {
        socket.emit('chat message', messageField.val());
        messageField.val('');
        return false;
    });
    usernameForm.submit(function () {
        $.cookie('chat_username', usernameInput.val());
        usernameField.val(usernameInput.val());
        return false;
    });
    socket.on('connect', function () {
        if ($.cookie('chat_username')) {
            username = $.cookie('chat_username')
        } else {
            username = 'Anonymous ' + (new Date()).getTime()
        }
        $.cookie('chat_username', username);
        usernameField.val(username);
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