class NetworkClient
{
    constructor(ui)
    {
        var NodeAddress = "192.168.11.20";
        var NodePort = "7990";

        var cvs = $(".game-canvas")[0];
        var ctx = cvs.getContext("2d");
        var cimgd = null;
        var cimgPos = { x:20, y:20 };

        var connectionOptions =
        {
            "force new connection": true,
            "reconnectionattempts": "Infinity",
            "timeout": 10000,
            "transports": ["websocket"],
            "rememberTransport": false,
            "transports": ['websocket']
        };

        var socket = io(NodeAddress + ":" + NodePort, connectionOptions);

        function setRealCanvasSize()
        {
            cvs.width = cvs.offsetWidth;
            cvs.height = cvs.offsetHeight;
            if (cimgd != null)
            {
                ctx.putImageData(cimgd, cimgPos.x, cimgPos.y);
            }
        }

        setRealCanvasSize();

        $(window).resize(function()
        {
            setRealCanvasSize();
        });

        socket.emit("connect");

        socket.on("data", function(data)
        {
            var imgWidth = new DataView(data, 0, 2).getUint16(0, false);
            var imgData = new Uint8Array(data.slice(2));
            var imgHeight = (imgData.byteLength / 3) / imgWidth;

            // var b64imgData = btoa(imgData); // Binary to ASCII
            // var img = new Image();
            // img.src = "data:image/jpeg;base64," + b64imgData;

            // ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        
            cimgd = ctx.createImageData(imgWidth, imgHeight);

            var dataIndex = 0;
            var cimgdSize = imgWidth * imgHeight * 4;

            for(var i = 0; i < cimgdSize; i+=4)
            {
                cimgd.data[i] = imgData[dataIndex++];
                cimgd.data[i+1] = imgData[dataIndex++];
                cimgd.data[i+2] = imgData[dataIndex++];
                cimgd.data[i+3] = 255;
            }

            ctx.putImageData(cimgd, cimgPos.x, cimgPos.y);
        });

        setInterval(function()
        {
            socket.emit("ui_data", {"x": ui.m_LastTap.clientX, "y": ui.m_LastTap.clientY});
        }, 2500);
    }
}
