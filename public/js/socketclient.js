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

    socket.on("data", function(data)
    {
        console.log(data.data);

        var cv = document.createElement("canvas");
        var ctx = cv.getContext("2d");

        cv.width = 100;
        cv.height = 100;

        var img = atob(data.data);

        var cimgd = ctx.createImageData(100, 100);
        cimgd.data.set(img);
        ctx.putImageData(cimgd, 0, 0);
        document.body.appendChild(cv);
    });

});



