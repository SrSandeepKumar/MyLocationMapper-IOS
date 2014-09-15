document.addEventListener('deviceready', function() {

   window.plugins.navBar.setupLeftButton('', "", function(){}
    );
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

var count = 0;

function retrieveName(name) {
    console.log(name);
    if ($.type(name) == "undefined" || name.trim() == "" )
        return "Not specified";
    else
        return name;
}

function display(){
    count++;
    console.log("In display block, times: " + count);
    var getNar = JSON.parse(localStorage.getItem('nar'));
    if(getNar) {
        console.log("Nar from DB" +getNar);
        var obj = getNar.length;
        
        for (var index = 0; index < getNar.length; index++) {
            console.log(getNar[index].idd);
            console.log(getNar[index].name);
            console.log(getNar[index].desc);
            console.log(getNar[index].displayDate);
        }

        if(getNar.length !== null) { 
            var toDisplay = "";
            for (var index = 0; index < getNar.length; index++) {

                toDisplay = "<div class='panel panel-default'><div class='panel-heading'><h4 class='panel-title'><a class='col-xs-8 col-sm-8 col-md-8 col-lg-8' data-toggle='collapse' data-parent='#accordion' href=#" + getNar[index].idd + ">" + retrieveName(getNar[index].name) + "</a><i class=' toPlot fa fa-map-marker fa-1x fa-1x col-xs-2 col-sm-2 col-md-2 col-lg-2'data-position=" + index + "></i><i class=' toDelete fa fa-trash-o fa-1x col-xs-01 col-sm-01 col-md-01 col-lg-01' data-position=" + index + "></i></h4></div><div id="+getNar[index].idd+" class='panel-collapse collapse'><div class='bg-info panel-body' style='text-align:left;'><small><strong>Name :</strong> <small>" + retrieveName(getNar[index].name) + "</small><br/><small><strong> Description : </strong></small><small>" +retrieveName(getNar[index].desc) + "</small> .<br/><small><strong> Date :</strong></small><small> " + getNar[index].displayDate + "</small><br/> <small><strong>Time Taken: </strong></small><small>" + getNar[index].time + "</small>.<br/><small><strong>Distance :</strong></small> <small>" + parseInt(getNar[index].distance) + "Kms</small>.<br/></div></div></div></div>";
                $(".list").append(toDisplay);
            }  
        }
        return getNar;
    }
}

$(document).ready(function(){

    var retrievedObject = display();

    console.log(retrievedObject);
    


    if (typeof(retrievedObject)!= "undefined") {


        $(".toDelete").on('click',function(){
            var that = this;


            navigator.notification.confirm(
                'Are you sure of deleting the trail!',
                function(buttonIndex){
                    if(buttonIndex === 1){   
                    
                        var position = parseInt($(that).data("position"));
                        console.log(position);
                        var nar = $.parseJSON(localStorage.nar);
                        console.log(nar);
                        console.log(nar.length);
                        nar.splice(position,1);
                        console.log(nar.length);
                        localStorage.setItem("nar" , JSON.stringify(nar));
                        console.log(nar);
                        $(that).parents(".panel").remove();
                        console.log(localStorage);
                    }   
                },            
                'Delete ?',         
                'Yes,No'         
                );     
        });


$(".toPlot").click(function(){  
   var that = this;
   var mPlot;
   console.log("before confirm");


   navigator.notification.confirm(
    'Are you sure to Plot this Run ?', 
    function(buttonIndex){
        if(buttonIndex === 1){ 
            var position = parseInt($(that).data("position"));
            console.log("position " + position);
            console.log("plot");
            console.log(retrievedObject[position]);
            localStorage.setItem("mPlot",JSON.stringify(retrievedObject[position]));
            var temp =  localStorage.getItem("mPlot");
            console.log(temp);
            console.log("temp " + temp);
            location.href = "toPlot.html";
        }
    },            
    'plot ?',          
    'Yes,No'        
    );

   console.log("after confirm");
});

}
});



