var express = require('express'),
    app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 8088;

app.use(express.static(path.join(__dirname, 'public')));
var countPlayer = 0;
var users = [];

// event handler in server
io.on('connection', function (socket) {

    socket.on('join', function (data) {
        console.log("Join: ", data);
        socket.nickname = data.nickname;
        users[socket.nickname] = socket;

        var userObj = {
            nickname: data.nickname,
            socketid: socket.id,
            color: 'red'
        }

        users.push(userObj);
        io.emit('all-users', users);
    })

    socket.on('get-users', function () {
        socket.emit('all-users', users);
    });

    socket.on('update-position', function (data) {
        io.emit('update-position', {
            oldPosition: data.old,
            position: data.current,
            nickname: data.nickname
        })
    })
    socket.on('Unload', function (i) {
        countPlayer--;
        console.log('unload: ' + i);
        players[i - 1].isUsed = false;
    });
    socket.on('disconnection', function () {
        console.log('disconnection');
    })
});

http.listen(port, function () {
    console.log('server is starting at localhost: ' + port);
});
