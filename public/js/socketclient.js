class NetworkClient
{
    constructor(ui)
    {
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

        socket.emit("connect");

        socket.on("data", function(data)
        {
            var imgData = (JSON.parse(data.data));
            var ctx = $(".game-canvas")[0].getContext("2d");
            var cimgd = ctx.createImageData(100, 100);

            for(var i = 0; i < 40000; i+=3)
            {
                cimgd.data[i] = imgData[i];
                cimgd.data[i+1] = imgData[i+1];
                cimgd.data[i+2] = imgData[i+2];
                cimgd.data[i+3] = 255;
            }

            ctx.putImageData(cimgd, 0, 0);
        });

        setInterval(function()
        {
            socket.emit("ui_data", {"x": ui.m_LastTap.clientX, "y": ui.m_LastTap.clientY});
        }, 2500);
    }
}
