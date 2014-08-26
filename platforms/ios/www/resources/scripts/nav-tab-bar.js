var target = [];
var alpha = false ;
var locArray = [];
// var toasting = true;
errorInGettingPostion = true;

document.addEventListener('deviceready', function() {
  // navigator.notification.confirm(
  //       'You are the winner!', // message
  //        null,            // callback to invoke with index of button pressed
  //       'Game Over',           // title
  //       'Restart,Exit'         // buttonLabels
  //   );

                         
window.plugins.navBar.create('Default',{'tintColorRgba':"163,30,24,1"});

 window.plugins.navBar.setLogo('play.png');
window.plugins.navBar.setTitle('Location Mapper');

// window.plugins.navBar.setupLeftButton('', "back.png", function(){
//    if(confirm("want to exit ?")){
//         navigator.app.exitApp();
//     }
// }, {"useImageAsBackground":true});
                          
//window.plugins.navBar.setupLeftButton("start", function(){goBack();}, {"useImageAsBackground":true});
window.plugins.navBar.setupRightButtons('',"stop1.png",'',"play.png",
                      function(){
                           if(alpha == true){   alert("blah");
            // toasting == true;
navigator.notification.confirm(
        'Do you want to save the trail!', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Stoping',           // title
        'Yes,No'         // buttonLabels
    );
            function onConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
    if(buttonIndex === 1){
                storeLoc(locArray);
                map.refreshLayout();
                map.setVisible(false);

                window.location = "stopInput.html";
                if (watchID != null) {
                    navigator.geolocation.clearWatch(watchID);
                    watchID = null;
                }
                locArray.length = 0;
            }else{window.location = "index.html";}
        }
}

                     
        
                      }, 

                      function(){ 
                            watchPosition();
                            if(errorInGettingPostion == false){
                              if(alpha == false){
                             window.plugins.toast.showLongCenter('Starting to Mark your track', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
                            show();
                            start();
                            alpha = true;
                      }
                      }  else{
            window.plugins.toast.showLongCenter('Could not determine your current Location , Kindly ensure GPS and Internet is enabled !', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
            alpha = false;
        }                            
                      },

                       {"useImageAsBackground":true});


window.plugins.navBar.show();
//selectTabs();

                          window.plugins.tabBar.createItem(
                                                           "map",
                                                           "MAP",
                                                           "map32.png",
                                                           {onSelect:selectMap});


                          
                          window.plugins.tabBar.createItem(
                                                           "history",
                                                           "HISTORY",
                                                           "history32.png",
                                                           {onSelect:selectHistory});

                          
                          
                          window.plugins.tabBar.showItems('map','history');
                         
                          window.plugins.tabBar.show();
                          window.plugins.tabBar.setSelectedTab("map");

});

function selectMap(){
    map.clear();
    map.setVisible(true);
     window.location.href = "index.html";
}

function selectHistory(){
     map.refreshLayout();
     map.setVisible(false);
     window.location.href = "history.html";

     
}

function storeLoc(pos){
     if(isNaN(parseInt(dist)) ){ var dist = 0 ; }
     else{
    var dist = findDistance(locArray);}
    var nar = new Date().valueOf();
    var t = $('#time').text();
    console.log(t);
    console.log(t);
    var formattedDate = native5.utils.DateUtils.formatDate(new Date(), {"format" : "d M -h:i a"});
   
    if( localStorage.getItem('nar') === null){
        console.log(formattedDate);
        localStorage.setItem( 'nar'  ,JSON.stringify([{"location":pos, "displayDate": formattedDate , 'idd': nar , 'time':t ,'distance' : (dist) }]));
    }
    else
    {
        var temp = JSON.stringify({"location":pos, "displayDate": formattedDate , 'idd': nar ,'time':t , 'distance' : dist});
        var f = JSON.parse(localStorage.getItem('nar'));
        f.push(JSON.parse(temp));
        localStorage.setItem('nar',JSON.stringify(f));
    }
}

function watchPosition(){
     window.plugins.toast.showLongCenter('Starting to Mark your track', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    var option = { timeout: 30000 };
   watchID = navigator.geolocation.watchPosition(onSuccess, onError, option);
}

function onSuccess(position){
    
    var abc = new plugin.google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    locArray.push(abc);
    var d = findDistance(locArray);
    if(parseInt(d  * 1000) > 5 ) points.plotLine(locArray);
    
    errorInGettingPostion = false;
}



function onError(error) {
    
    // alert("Could not determine your current Location , Kindly ensure GPS and Internet is enabled !");
    errorInGettingPostion = true;
    console.log(errorInGettingPostion);
}


function findDistance(pos){
    
    var lat1 = pos[0].lat;
    console.log(lat1);
    var lon1 = pos[0].lng;
    console.log(lon1);
    var l = pos.length ;
    console.log(l);
    var lat2 = pos[l-1].lat;
    var lon2 = pos[l-1].lng;
    var theta = lon1-lon2;
console.log(theta);

    if (theta === 0) {
        $distance = document.getElementById('distance');
        $distance.innerHTML = "0 Km" ;
    }
else
    {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var radlon1 = Math.PI * lon1/180;
        var radlon2 = Math.PI * lon2/180;


        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        distk = dist * 1.609344;
        distm = (dist * 1.609344) * 1000;
        $distance = document.getElementById('distance');
        $distance.innerHTML = parseInt(distk) + " Kms" ;
        
        var clicks = false;
        $(".distance").click(function() {
            if (clicks) { 
                /*$('#distance').html(parseInt(distk)+"Kms");*/
                $distance = document.getElementById('distance');
                $distance.innerHTML = parseInt(distk) + " Kms" ;
                clicks = false;
            } else {
                clicks = true;
                /* $('#distance').html(parseInt(distm)+"Meters");*/
                $distance = document.getElementById('distance');
                $distance.innerHTML = parseInt(distm) + " Meters" ;
            }
        });

        console.log(distk);
        return distk ; 

    }
}