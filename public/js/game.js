


function ui_left_button0()
{
    console.log("button0 press");
}


class UI
{

    constructor()
    {

        this.m_RightDiv = $(".game-ui-right");
        this.m_LeftDiv = $(".game-ui-left");
        this.m_IsFullscreen = false;

        var self = this;

        var canvasElement = $(".game-canvas");

        canvasElement.on("swipeleft", function()
        {
            self.canvasLeftSwipe();
        });
        canvasElement.on("swiperight", function()
        {
            self.canvasRightSwipe();
        });
        canvasElement.on("swipeup", function()
        {
            self.canvasUpSwipe();
        });

        canvasElement[0].width = canvasElement[0].offsetWidth;
        canvasElement[0].height = canvasElement[0].offsetHeight;

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

        this.m_RightVisible = false;
        this.m_LeftVisible = false;

        this.hideRight();
        this.hideLeft();

        var buttons = [];

        for(var i = 0; i < 14; i++)
        {
            buttons.push($("#" + i));
        }
        console.log(buttons);
        buttons[0].on("click", ui_left_button0);
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













$(document).ready(function ()
{
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

    var interface = new UI();

    var requestURI = "/requestNode/";
    $.getJSON( requestURI ).done(function(data)
    {
        console.log(data);
    });

});


$(document).on("mobileinit", function()
{
    $.mobile.autoInitializePage = false;
    $.mobile.loadingMessage = false;
});

$.mobile.autoInitializePage = false;












