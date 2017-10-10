var express = require('express'),
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + ''));
app.listen(8088);