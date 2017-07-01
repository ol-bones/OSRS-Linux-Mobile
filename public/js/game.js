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

    var ui = new UI(client);
    var client = new NetworkClient(ui);

 //   var requestURI = "/requestNode/";
 //   $.getJSON( requestURI ).done(function(data)
 //   {
 //       console.log(data);
 //   });

});

$(document).on("mobileinit", function()
{
    $.mobile.autoInitializePage = false;
    $.mobile.loadingMessage = false;
});

$.mobile.autoInitializePage = false;




