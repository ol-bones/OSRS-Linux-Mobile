class NetworkClient
{
    constructor(ui)
    {
        var NodeAddress = "80.255.0.159";
        var NodePort = "7990";

        var cvs = $(".game-canvas")[0];
        var ctx = cvs.getContext("2d");
        var cimgd = null;
        var cimgPos = { x:0, y:0 };

        this.m_ImageDataQueue = [];

        this.m_LastReceived = 0;

        var connectionOptions =
        {
            "force new connection": true,
            "reconnectionattempts": "Infinity",
            "timeout": 10000,
            "transports": ["websocket"],
            "rememberTransport": false
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

        socket.on("data", (data) =>
        {
            var imgData = new Uint8Array(data[0].image);

            var imgWidth = data[0].width;
            var imgHeight = data[0].height;

            cimgd = ctx.createImageData(imgWidth, imgHeight);

            var dataIndex = 0;
            var cimgdSize = imgWidth * imgHeight * 4;

            for(var i = 0; i < cimgdSize; i+=4)
            {
                cimgd.data[i] = imgData[dataIndex++];
                cimgd.data[i+1] = imgData[dataIndex++];
                cimgd.data[i+2] = imgData[dataIndex++];
                cimgd.data[i+3] = imgData[dataIndex++];
            }

            this.m_ImageDataQueue.push([cimgd, cimgPos, Date.now() - this.m_LastReceived, Date.now() - data[1]]);
            this.m_LastReceived = Date.now();

            //ctx.putImageData(cimgd, cimgPos.x, cimgPos.y);
        });


        setInterval(() =>
        {
            let lastImage = this.m_ImageDataQueue.pop();
            console.log(lastImage);
            console.log(this.m_ImageDataQueue.length);
            if(lastImage === undefined || lastImage.length === 0) { return; }
            ctx.putImageData(lastImage[0], lastImage[1].x, lastImage[1].y);
        }, 50);

        setInterval(function()
        {
            socket.emit("ui_data", {"x": ui.m_LastTap.clientX, "y": ui.m_LastTap.clientY});
        }, 2500);
    }
}
