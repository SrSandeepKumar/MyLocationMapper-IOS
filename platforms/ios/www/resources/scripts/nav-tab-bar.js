var target = [];
var alpha = true ;
var locArray = [];
// var toasting = true;
errorInGettingPostion = true;

document.addEventListener('deviceready', function() {
    
                         
window.plugins.navBar.create('Default',{'tintColorRgba':"163,30,24,1"});

// window.plugins.navBar.setLogo('logo_header.png');
window.plugins.navBar.setTitle('Location Mapper');

window.plugins.navBar.setupLeftButton('', "back.png", function(){}, {"useImageAsBackground":true});
                          
//window.plugins.navBar.setupLeftButton("start", function(){goBack();}, {"useImageAsBackground":true});
window.plugins.navBar.setupRightButtons('',"stop1.png",'',"play1.png",
                      function(){
                          if(confirm("Do you want to save trail ?")){
                            alert("yes");
                              storeLoc(locArray);
                              map.refreshLayout();
                              map.setVisible(false);

                              window.location = "stopInput.html";

                              if (watchID != null) {
                                    navigator.geolocation.clearWatch(watchID);
                                    watchID = null;
                              }
                            locArray.length = 0;
                          }else{

                            alert("no");
                            window.location = "index.html";
                        }
        
                      }, 

                      function(){ 
                            watchPosition();

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
    alert("in watch pos");
    var option = { timeout: 30000 };
   watchID = navigator.geolocation.watchPosition(onSuccess, onError, option);
}

function onSuccess(position){
    alert("in success");
    var abc = new plugin.google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    locArray.push(abc);
    var d = findDistance(locArray);
    if(parseInt(d  * 1000) > 5 ) points.plotLine(locArray);
    errorInGettingPostion = false;
}



function onError(error) {
    alert("in on error");
    // alert("Could not determine your current Location , Kindly ensure GPS and Internet is enabled !");
    errorInGettingPostion = true;
    console.log(errorInGettingPostion);
}