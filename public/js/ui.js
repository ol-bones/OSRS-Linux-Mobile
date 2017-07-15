class UI
{
    constructor()
    {

        this.m_Canvas = $(".game-canvas");
        this.m_RightDiv = $(".game-ui-right");
        this.m_LeftDiv = $(".game-ui-left");
        this.m_IsFullscreen = false;

        this.m_Events = [];

        var self = this;

        $(window).on("orientationchange", (evt) =>
        {
            self.orientationChange(evt);
        });
        $(".game-canvas").on("tap", (evt) =>
        {
            self.canvasTap(evt);
        });
        $(".game-canvas").on("swipeleft", function(evt)
        {
            self.canvasLeftSwipe(evt);
        });
        $(".game-canvas").on("swiperight", function(evt)
        {
            self.canvasRightSwipe(evt);
        });
        $(".game-canvas").on("swipeup", function()
        {
            self.canvasUpSwipe();
        });
        $(document).on("webkitfullscreenchange", function(evt)
        {
            self.m_IsFullscreen = !self.m_IsFullscreen;

            setTimeout(function()
            {
                if(!self.m_IsFullscreen)
                {
                    console.log("exit fs");
                    $(".navbar").show();
                    $(".game-content").css({"top":"0%", "position": "absolute"});
                }
                else
                {
                    console.log("enter fs");
                    $(".navbar").hide();
                    $(".game-content").css({"top":"0%", "position": "absolute"});
                }
            }, 100);
        });

        $("#fullscreen-button").on("click", function()
        {
            $('.navbar').hide();
            var el = document.documentElement,
            rfs = el.requestFullscreen
                || el.webkitRequestFullScreen
                || el.mozRequestFullScreen
                || el.msRequestFullscreen;

            rfs.call(el);

            // wait for DOM update from hide()^
            setTimeout(function()
            {
                $(".game-content").css({"top":"0%", "position": "absolute"});
            }, 100);
        });

        this.m_RightVisible = false;
        this.m_LeftVisible = false;

        this.hideRight();
        this.hideLeft();

        var buttons = [];

        for(var i = 0; i < 14; i++)
        {
            buttons.push($("#" + i));
            buttons[i].on("click", function(){});
        }
        console.log(buttons);
    }

    orientationChange(evt)
    {
        this.m_Events.push(
        {
            "Type": "UIDimensions",
            "Data": [this.m_Canvas[0].width, this.m_Canvas[0].height]
        });
    }

    canvasTap(evt)
    {
        this.m_Events.push(
        {
            "Type": "UITap",
            "Data": [evt.clientX, evt.clientY]
        });
    }

    canvasUpSwipe()
    {
        $(".navbar").hide();
        console.log("herp");
    }

    canvasLeftSwipe(evt)
    {
        var xStart = evt.swipestart.coords[0];
        var xEnd   = evt.swipestop.coords[0];
        var xDist  = Math.abs(xEnd-xStart);

        if(this.m_LeftVisible && xStart < window.innerWidth*0.2)
        {
            this.hideLeft();
            return;
        }
        else if(!this.m_RightVisible && xStart > window.innerWidth*0.8)
        {
            this.showRight();
        }
        else if(window.innerHeight > window.innerWidth)
        {
            this.m_Events.push(
            {
                "Type": "UIMoveLeft",
                "Data": xDist
            });
        }
    }

    canvasRightSwipe(evt)
    {
        var xStart = evt.swipestart.coords[0];
        var xEnd   = evt.swipestop.coords[0];
        var xDist  = Math.abs(xEnd-xStart);

        if(this.m_RightVisible && xStart > window.innerWidth*0.8)
        {
            this.hideRight();
            return;
        }
        else if(!this.m_LeftVisible && xStart < window.innerWidth*0.2)
        {
            this.showLeft();
        }
        else if(window.innerHeight > window.innerWidth)
        {
            this.m_Events.push(
            {
                "Type": "UIMoveRight",
                "Data": xDist
            });
        }
    }

    showRight()
    {
        this.m_RightDiv.show();
        this.m_RightVisible = true;
    }

    hideRight()
    {
        $(".game-ui-right").hide();
        this.m_RightDiv.hide();
        this.m_RightVisible = false;
    }

    showLeft()
    {
        this.m_LeftDiv.show();
        this.m_LeftVisible = true;
    }

    hideLeft()
    {
        $(".game-ui-left").hide();
        this.m_LeftDiv.hide();
        this.m_LeftVisible = false;
    }
}













