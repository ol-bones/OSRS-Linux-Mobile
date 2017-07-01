class UI
{
    constructor()
    {

        this.m_RightDiv = $(".game-ui-right");
        this.m_LeftDiv = $(".game-ui-left");
        this.m_IsFullscreen = false;

        this.m_LastTap = {};

        var self = this;

        $(".game-canvas").on("tap", function(evt)
        {
            // clientX + clientY
            self.m_LastTap = evt;
        });
        $(".game-canvas").on("swipeleft", function()
        {
            self.canvasLeftSwipe();
        });
        $(".game-canvas").on("swiperight", function()
        {
            self.canvasRightSwipe();
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

    canvasUpSwipe()
    {
       $(".navbar").hide();
        console.log("herp");
    }

    canvasLeftSwipe()
    {
        if(this.m_LeftVisible)
        {
            this.hideLeft();
            return;
        }
        else if(!this.m_RightVisible)
        {
            this.showRight();
        }
    }

    canvasRightSwipe()
    {
        if(this.m_RightVisible)
        {
            this.hideRight();
            return;
        }
        else if(!this.m_LeftVisible)
        {
            this.showLeft();
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













