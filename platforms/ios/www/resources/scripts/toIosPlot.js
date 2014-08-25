var map;

document.addEventListener("deviceready", function() {
    alert("comming inside toplot");
    var plot = $.parseJSON(localStorage.mPlot);
    $('#mapType').html("Map");
    $('#time').html(plot.time);
    $('#distance').html(parseInt(plot.distance)+"Kms") 
    var clicks = true;
    var div = document.getElementById("map_canvas");
    map = plugin.google.maps.Map.getMap(div);

    $(".mapType").click(function() {
        if (clicks) {
            map.setMapTypeId(plugin.google.maps.MapTypeId.ROADMAP);
            clicks = false;
            var type = document.getElementById('mapType');
            type.innerHTML = "Map";
        } else {
            map.setMapTypeId(plugin.google.maps.MapTypeId.HYBRID);
            clicks = true;
            var type = document.getElementById('mapType');
            type.innerHTML = "Earth";
        }
    });
    alert("after initilazing everything in bottom bar");

 window.plugins.navBar.setupLeftButton('', "back.png", function(){
    map.refreshLayout();
    map.setVisible(false);
    window.location.href = "history.html";
}, {"useImageAsBackground":true});

window.plugins.navBar.setTitle(plot.name);

window.plugins.navBar.setupRightButtons(''," ",''," ",
                      function(){ }, 

                      function(){ },

                       {"useImageAsBackground":true});

window.plugins.tabBar.hide();

    map.clear();
    map.setVisible(true);
    points.plotLine(plot.location);

alert("end");


});