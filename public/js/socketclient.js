var NodeAddress = "localhost";
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

var addressPort = NodeAddress + ":" + NodePort;

var socket = io(addressPort, connectionOptions);

var NodeURI = "ws://" + addressPort;

var cimgd = null;

$(document).ready(function()
{
    socket.connect(NodeURI + "/");

    socket.emit("connect");

    socket.on("data", function(data)
    {
        var imgData = (JSON.parse(data.data));
        var ctx = $(".game-canvas")[0].getContext("2d");
        cimgd = ctx.createImageData(100, 100);

        var dataIndex = 0;
        var cimgdSize = 100 * 100 * 4;

        for(var i = 0; i < cimgdSize; i+=4)
        {
            cimgd.data[i] = imgData[dataIndex++];
            cimgd.data[i+1] = imgData[dataIndex++];
            cimgd.data[i+2] = imgData[dataIndex++];
            cimgd.data[i+3] = 255;
        }

        ctx.putImageData(cimgd, 20, 20);
    });

});

$(window).resize(function()
{
    var cvs = $(".game-canvas")[0];
    var ctx = cvs.getContext("2d");
    if (cimgd != null)
    {
        cvs.width = cvs.offsetWidth;
        cvs.height = cvs.offsetHeight;
        ctx.putImageData(cimgd, 20, 20);
    }
});



