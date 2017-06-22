var NodeAddress = "80.255.0.159";
var NodePort = "7990";


var connectionOptions =
{
    "force new connection": true,
    "reconnectionattempts": "Infinity",
    "timeout": 10000,
    "transports": ["websocket"],
    "rememberTransport": false,
    "transports": ['websocket']
};

var socket = io("80.255.0.159:7990", connectionOptions);

var NodeURI = "ws://" + NodeAddress + ":" + NodePort;

$(document).ready(function()
{
    socket.connect(NodeURI + "/");

    socket.emit("connect");


});



