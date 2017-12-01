var express = require('express'),
    app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 8088;

app.use(express.static(path.join(__dirname, 'public')));
var countPlayer = 0;
var users = [];
var dest = {
    x: 0,
    y: 14
};
var winners = [];
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

function isFinish(curPos, dest) {
    console.log('curPos: ', curPos);
    console.log('dest: ', dest);
    return ((curPos.x === dest.x) && (curPos.y === dest.y));
};
// event handler in server
io.on('connection', function (socket) {

    socket.on('join', function (data) {
        console.log("Join: ", data);
        socket.nickname = data.nickname;
        users[socket.nickname] = socket;

        var userObj = {
            nickname: data.nickname,
            socketid: socket.id,
            color: getRandomColor(),
        }

        users.push(userObj);
        io.emit('all-users', users);
    })

    socket.on('get-users', function () {
        socket.emit('all-users', users);
    });

    socket.on('update-position', function (data) {
        var user = users.find(function (user) {
            return user.nickname === data.nickname;
        });
        // console.log("current user update: ", user);
        io.emit('update-position', {
            oldPosition: data.old,
            position: data.current,
            nickname: data.nickname,
            color: user.color
        });
        if (winners.indexOf(data.nickname) == -1 && isFinish(data.current, dest)) {
            winners.push(data.nickname);
            console.log('server: ', winners);
            io.emit('update-leaderboard', winners);
        }
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
