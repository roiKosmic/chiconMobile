console.log("Hdw Details script imported");


$("#hdwDetailedPage").on("pagebeforeshow",function(){
			console.log("in Detail Page");
			getHardwareDetails();
			
	}
);

$("#hdwDetailedPage").on("pageshow",function(){
		console.log("binding click");
		$(".ledBtn").on("click",function(event){
				$target = $( event.target );
				console.log("a clicked");
				currentLed = $target.attr("ledId");
			});

}
);

function getHardwareDetails(){
	console.log("Getting Hardwares Details for:"+currentSerial);
	$.getJSON(serviceURL+"/userRelatedWebService.php",{cmd: "getHdwConfig",hdwSerial: currentSerial},
			function(data){
				
				$('#ledList li').remove();
				$('#ledList').append('<li data-role="list-divider">Hardwares LED</li>');
				console.log("Code :"+data.result['code']);
				if(data.result['code']==200){
					for( var i in data.result['data'].hdw.ledList){
						htmlCode="";
						if(data.result['data'].hdw.ledList[i].icon){
							htmlCode += "<img  globalId="+data.result['data'].hdw.ledList[i].srv.globalId+" localId="+data.result['data'].hdw.ledList[i].srv.localId+" src='"+imgURL+data.result['data'].hdw.ledList[i].srv.icon+"' height='35' width='35'/>";						
							htmlCode += "<img  ledSrvId="+data.result['data'].hdw.ledList[i].srv.ledId+" globalId="+data.result['data'].hdw.ledList[i].srv.globalId+" localId="+data.result['data'].hdw.ledList[i].srv.localId+" src='"+imgURL+data.result['data'].hdw.ledList[i].icon+"' height='35' width='35'/>";
						}else{
							htmlCode +="No service Defined";
						}
						
						$('#ledList').append("<li><a class='ledBtn' href='#confirmPage' ledId='"+data.result['data'].hdw.ledList[i].id+"'  data-transition='slide' ><div style='float:right;display:inline;padding-top:0px;margin-top:0px'>"+htmlCode+"</div><div style='float:left;padding-right:20px;'>LED&nbsp;"+data.result['data'].hdw.ledList[i].id+"</div></a></li>");
				
					 }
				
				}
				
				$('#ledList').listview('refresh');
				
			}
	);
}