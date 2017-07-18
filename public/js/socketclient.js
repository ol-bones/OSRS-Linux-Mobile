class NetworkClient
{
    constructor(ui)
    {
        var NodeAddress = "80.255.0.159";
        var NodePort = "7990";

        this.cvs = $(".game-canvas")[0];
        this.ctx = this.cvs.getContext("2d");

        this.cimgPos = { x:0, y:0 };

        this.m_ImageDataQueue = [];

        this.m_LastReceived = 0;

        var self = this;

        var connectionOptions =
        {
            "force new connection": true,
            "reconnectionattempts": "Infinity",
            "timeout": 10000,
            "transports": ["websocket"],
            "rememberTransport": false
        };

        var socket = io(NodeAddress + ":" + NodePort, connectionOptions);

        function ResizeCanvas()
        {
            self.cvs.width = self.cvs.offsetWidth;
            self.cvs.height = self.cvs.offsetHeight;
        }

        ResizeCanvas();

        $(window).resize(function()
        {
            ResizeCanvas();
        });

        socket.emit("connect");

        socket.on("data", (data) =>
        {
            var imgData = new Uint8Array(data[0].image);

            var imgWidth = data[0].width;
            var imgHeight = data[0].height;

            var cimgd = this.ctx.createImageData(imgWidth, imgHeight);

            var dataIndex = 0;
            var cimgdSize = imgWidth * imgHeight * 4;

            for(var i = 0; i < imgData.length; i+=4)
            {
                // goodenough.jpg
                cimgd.data[i]   = 255/4 + imgData[dataIndex++];// + imgData[dataIndex++];
                cimgd.data[i+1] = 255/4 + imgData[dataIndex++];// + imgData[dataIndex++];
                cimgd.data[i+2] = 255/4 + imgData[dataIndex++];// + imgData[dataIndex++];
                cimgd.data[i+3] = 255/4 + imgData[dataIndex++];//imgData[dataIndex++] + imgData[dataIndex++];
            }

            if(Date.now() - this.m_LastReceived > 2000)
            {
                this.m_ImageDataQueue = [];
            }
            this.m_ImageDataQueue.push([cimgd, this.cimgPos, imgWidth, imgHeight, Date.now() - this.m_LastReceived, Date.now() - data[1]]);
            this.m_LastReceived = Date.now();

            //ctx.putImageData(cimgd, cimgPos.x, cimgPos.y);
        });

        function draw()
        {
            let lastImage = self.m_ImageDataQueue.pop();
            //console.log(lastImage);
            //console.log(this.m_ImageDataQueue.length);
            if(lastImage === undefined || lastImage.length === 0)
            {
                window.requestAnimationFrame(draw);
                return;
            }
            if(lastImage[4] >= 1500)
            {
                self.m_ImageDataQueue = [];
            }
            if(window.innerWidth >= window.innerHeight && self.cvs.width != lastImage[2])
            {
                self.cvs.width = lastImage[2];
                self.cvs.height = lastImage[3];
            }
            self.ctx.putImageData(lastImage[0], lastImage[1].x, lastImage[1].y);
            window.requestAnimationFrame(draw);
        }

        setInterval(()=>
        {
        //    console.log(ui.m_Events);
            socket.emit("ui_data", ui.m_Events);
            ui.m_Events = [];
        }, 25);

        window.requestAnimationFrame(draw);
    }
}
