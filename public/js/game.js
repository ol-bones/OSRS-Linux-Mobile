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

        this.m_RightVisible = false;
        this.m_LeftVisible = false;

        this.hideRight();
        this.hideLeft();
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


    var interface = new UI();

    var requestURI = "/requestNode";
    $.getJSON( requestURI ).done(function( data ) {
        console.log(data);
    });

});

















