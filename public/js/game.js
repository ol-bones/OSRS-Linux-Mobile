


function ui_left_button0() {
    console.log("button0 press");
}


class UI {

    constructor() {

        this.m_RightDiv = $(".game-ui-right");
        this.m_LeftDiv = $(".game-ui-left");
        var self = this;

        $(".game-canvas").on("swipeleft", function() {
            self.canvasLeftSwipe();
        });
        $(".game-canvas").on("swiperight", function() {
            self.canvasRightSwipe();
        });
        $(".game-canvas").on("swipeup", function() {
            self.canvasUpSwipe();
        });


        this.m_RightVisible = false;
        this.m_LeftVisible = false;

        this.hideRight();
        this.hideLeft();

        var buttons = [];

        for(var i = 0; i < 14; i++) {
            buttons.push($("#" + i));
        }
        console.log(buttons);
        buttons[0].on("click", ui_left_button0);
    }

    canvasUpSwipe() {
       $(".navbar").hide();
    }

    canvasLeftSwipe() {
        if(this.m_LeftVisible) {
            this.hideLeft();
            return;
        }
        else if(!this.m_RightVisible) {
            this.showRight();
        }
    }

    canvasRightSwipe() {
        if(this.m_RightVisible) {
            this.hideRight();
            return;
        }
        else if(!this.m_LeftVisible) {
            this.showLeft();
        }
    }

    showRight() {
        this.m_RightDiv.show();
        this.m_RightVisible = true;
    }

    hideRight() {
        $(".game-ui-right").hide();
        this.m_RightDiv.hide();
        this.m_RightVisible = false;
    }

    showLeft() {
        this.m_LeftDiv.show();
        this.m_LeftVisible = true;
    }

    hideLeft() {
        $(".game-ui-left").hide();
        this.m_LeftDiv.hide();
        this.m_LeftVisible = false;
    }
}













$(document).ready(function () {

    $("#fullscreen-button").on("click", function() {
        var el = document.documentElement,
        rfs = el.requestFullscreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
            || el.msRequestFullscreen;

        rfs.call(el);
    });

    var interface = new UI();

    var requestURI = "/requestNode";
    $.getJSON( requestURI ).done(function( data ) {
        console.log(data);
    });

});


$(document).on("mobileinit", function() {
        $.mobile.autoInitializePage = false;
        $.mobile.loadingMessage = false;
});

$.mobile.autoInitializePage = false;












