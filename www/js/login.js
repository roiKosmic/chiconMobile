


console.log("login script imported");

$("#login").on("pagebeforeshow",function(){
			console.log("in login page");
			$('#log').val(localStorage.getItem('login'));
			$('#password').val(localStorage.getItem('password'));
			if($('#log').val()!=''){
				console.log("login retrieve from local Storage");
				$('#rememberMe').attr("checked",true).checkboxradio("refresh");
			}

 
$("#loginForm").submit(function(){

	var login_ = $('#log').val();
	var password_ =$('#password').val();
	if($('#rememberMe').is( ":checked" )){
		console.log("RememberMer is checked");
		localStorage.setItem('login',login_ );
		localStorage.setItem('password',password_);
	}else{
		localStorage.removeItem('login');
		localStorage.removeItem('password');
	}
	var url_= serviceURL+"loginWebService.php?username="+login_+"&password="+password_;
	showLoader();
	
	$.ajax({
			type: "GET",
			url: url_,
			crossDomain: true,
			dataType: "json",
			timeout:10000,
			success: function(data) {
				result = data.result['code'];
				$.mobile.loading( "hide");
				if(result==200){
					console.log("login success");
					$.mobile.changePage("#hdwListPage");
				}else{
					$.mobile.loading( "hide");
					$("#popupFailed").popup("open");
				}
				
				},
			error: function(){
					$.mobile.loading( "hide");
					$("#popupFailed").html("<p>Server unreachable - Error</p>");
					$("#popupFailed").popup("open");
				}
			}
			
			);
			
  			
			return false;
});
}
);

function showLoader(){
	   $.mobile.loading( "show", {
            text: "loading - Please wait",
            textVisible: true,
			theme:"a",
			html:""
    	});


}