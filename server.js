var express = require('express'),
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + ''));
var countPlayer = 0;
var players = [
    {
        'isUsed': false
    },
    {
        'isUsed': false
    },
    {
        'isUsed': false
    },
    {
        'isUsed': false
    },
    {
        'isUsed': false
    },
];

// event handler in server
io.on('connection', function (socket) {

    socket.on('newPlayer', function () {
        if (countPlayer >= 5) return;
        let i = null;
        for (let j = 1; j <= players.length; j++) {
            // if the player slot is available
            if (!players[j - 1].isUsed) {
                players[j - 1].isUsed = true;
                i = j;
                countPlayer++;
                break;
            }
        }
        // return player number for user
        io.emit('newPlayer', i);
    });

    socket.on('Unload', function (i) {
        countPlayer--;
        console.log('unload: ' + i);
        players[i-1].isUsed = false;
    });
    socket.on('disconnection', function () {
        console.log('disconnection');
    })
});

http.listen(8088);