console.log("Confirm Page script imported");


$("#confirmPage").on("pagebeforeshow",function(event,data){
			console.log("in confirm Page");
			 
			$("#ledId").html("id "+currentLed);
			$("#selectBtn").bind("click",
				function(event){
					$.getJSON(serviceURL+"/userRelatedWebService.php",{cmd: "ledSelected",hdwSerial: currentSerial,led: currentLed},
						function(data){
							if(data.result['code']==200){
								$("#confirmPopup").html("<p>Selection confirm by server</p>");
							}else{
								$("#confirmPopup").html("<p>Selection error</p>");
							}
			
						}
					);
					setTimeout(function ()
{
    $("#confirmPopup").popup("close");
    history.go(-2);
	
	
}, 3000);
					$("#confirmPopup").popup("open");
					
				}
			);
		}
);