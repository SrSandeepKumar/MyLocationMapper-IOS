document.addEventListener('deviceready', function() {
   
   window.plugins.navBar.setTitle("My run's Details");
 
    window.plugins.navBar.setupRightButtons(''," ",''," ",
      function(){ }, 

      function(){ }
);

    window.plugins.tabBar.hide();

  });

  


$(document).ready(function(){

	$('#name').tooltip({
		trigger: 'focus'
	});

});

$(".clr").on('click',function(){
	$("#name").val('');
	$("#Edesc").val('');
});

$(".sub").on('click',function(){

	if(/^[ a-zA-Z0-9]{3,23}$/.test($("#name").val())){
		var f1 = JSON.parse(localStorage.getItem('nar'));
		if($("#name").val() == " " || $("#name").val() == null ){f1[f1.length-1].name = "NotSpecified"}
			else
			{
				f1[f1.length-1].name = $("#name").val();}
				console.log(f1[f1.length-1]);
				if($("#name").val() === null){f1[f1.length-1].desc = " "}
					else{
						f1[f1.length-1].desc = $("#Edesc").val();}
						console.log(f1[f1.length-1]);
						 window.plugins.toast.showLongCenter('Successfully Stored', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
						localStorage.setItem( 'nar',JSON.stringify(f1));
						console.log(JSON.parse(localStorage.getItem('nar')));
						location.href = "history.html";
					}
					else{

function alertDismissed() {
        // do something
        
    }

   
   
        navigator.notification.confirm(
            'Make sure fields are not empty and conditions are satisfied!',  // message
            alertDismissed,         // callback
            'Warning !',            // title
            'Done'                  // buttonName
        );
    


}
						
						 
				});

document.addEventListener("backbutton", function(){
	alert("Your Name and Description will be stored as undefined !!!");
	window.location = "history.html";
}, false);