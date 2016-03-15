console.log("virtual Lamp script imported");

$("#virtualLampPage").on("pageshow",function(){
			console.log("in virtualLamp Page :"+currentSerial);
			$("#virtualLampPage path").attr("style","fill:grey;");
			$("#virtualLampPage path").bind("click",
					function(event){
					$.getJSON(serviceURL+"/userRelatedWebService.php",{cmd: "getHdwConfig",hdwSerial: currentSerial},
						function(data){
							$('#virtualLedList li').remove();
							$('#virtualLedList').append('<li data-role="list-divider">Virtual LEDs</li>');
						
							if(data.result['code']==200){
								for( var i in data.result['data'].hdw.ledList){
									htmlCode="";
									if(data.result['data'].hdw.ledList[i].icon){
										htmlCode += "<img  globalId="+data.result['data'].hdw.ledList[i].srv.globalId+" localId="+data.result['data'].hdw.ledList[i].srv.localId+" src='"+imgURL+data.result['data'].hdw.ledList[i].srv.icon+"' height='35' width='35'/>";						
										htmlCode += "<img  ledSrvId="+data.result['data'].hdw.ledList[i].srv.ledId+" globalId="+data.result['data'].hdw.ledList[i].srv.globalId+" localId="+data.result['data'].hdw.ledList[i].srv.localId+" src='"+imgURL+data.result['data'].hdw.ledList[i].icon+"' height='35' width='35'/>";
									}else{
										htmlCode +="No service Defined";
									}
								
									$('#virtualLedList').append("<li><a class='virtualLedBtn' href='#confirmPage' ledId='"+data.result['data'].hdw.ledList[i].id+"'  data-transition='slide' ><div style='float:right;display:inline;padding-top:0px;margin-top:0px'>"+htmlCode+"</div><div style='float:left;padding-right:20px;'>LED&nbsp;"+data.result['data'].hdw.ledList[i].id+"</div></a></li>");
				
								}
									$('#virtualLedList').listview('refresh');
									$("#popupVirtual").popup("open");
								
							}
						}
					);
						return true;
						

					}
				);
			
			$(".virtualLedBtn").on("click",function(event){
				$target = $( event.target );
				console.log("a clicked");
				currentLed = $target.attr("ledId");
			});

			configVirtualLamp();
		}
);

function configVirtualLamp(){
			
			$.getJSON(serviceURL+"/hdwWS.php",{cfg:"",mn: magicn},
			function(data){
				//{"srvconfig":[{"id":67,"led":[{"id":2,"type":1}],"freq":1000},{"id":68,"led":[{"id":3,"type":8}],"freq":1000},{"id":69,"led":[{"id":1,"type":2}],"freq":1000}]}
				if(data.srvconfig){
					
					for( var i in data.srvconfig){
						var service = new Object();
						service["id"] = data.srvconfig[i].id;
						service["led"] = new Object();
						for( var j in data.srvconfig[i].led){
							service["led"]["id_"+data.srvconfig[i].led[j].id] = new Object();
							service["led"]["id_"+data.srvconfig[i].led[j].id]["type"] =data.srvconfig[i].led[j].type;
							//service["led"]["id_"+data.srvconfig[i].led[j].id]["value"] = [0,0,0,0];
						
						}
						service["freq"] = data.srvconfig[i].freq;
						srvTab["id_"+data.srvconfig[i].id] = service;
					 }
					 processServices(); //To change - getJson async
				}else{
					console.log(data);
				
				}
				
				
			}
	);

}

function processServices(){
	
	var block = true;
		for(var i in srvTab){
			$.getJSON(serviceURL+"/hdwWS.php",{srv:srvTab[i]["id"],mn: magicn},
				function (data){
					//{"srvset":{"id":69,"led":[{"id":1,"value":[0]}]}}
					if(data.srvset){
						processLed(data.srvset.id,data.srvset.led);
					}
					
				}
			);
		
		}
}

function rgb2hex(r,g,b) {
    if (g !== undefined) 
        return Number(0x1000000 + r*0x10000 + g*0x100 + b).toString(16).substring(1);
    else 
        return Number(0x1000000 + r[0]*0x10000 + r[1]*0x100 + r[2]).toString(16).substring(1);
}

function processLed(srvId,led){
	for(var i in led){
		var ledType  = srvTab["id_"+srvId]["led"]["id_"+led[i].id]["type"];
		switch(ledType){
			case LTYPE_BINARY:
				if(led[i].value[0] == 0){
					$("#id_"+led[i].id).attr("style","fill:grey;");
				}else{
					$("#id_"+led[i].id).attr("style","fill:#00f4f4;");
				}
			break;
			case LTYPE_TRICOLOR:
				if(led[i].value[0] == 0){
					$("#id_"+led[i].id).attr("style","fill:grey;");
				}else if(led[i].value[0] == 1){
					$("#id_"+led[i].id).attr("style","fill:green;");
				}else if(led[i].value[0] == 2){
					$("#id_"+led[i].id).attr("style","fill:orange;");
				}else if(led[i].value[0] == 3){
					$("#id_"+led[i].id).attr("style","fill:red;");
				}
			break;
			case LTYPE_RGB:
				var color = "#"+rgb2hex(led[i].value[0],led[i].value[1],led[i].value[2]);
				$("#id_"+led[i].id).attr("style","fill:"+color+";");
			break;
			case LTYPE_BRIGHTNESS:
				var color = "#"+rgb2hex(led[i].value[0],led[i].value[0],led[i].value[0]);
				$("#id_"+led[i].id).attr("style","fill:"+color+";");
			break;
			case LTYPE_BLINKING:
				setInterval("blinkVirtualLed('"+led[i].id+"')",led[i].value[0]);
			break;
		}
	
	}

}
function blinkVirtualLed(id){
	switch ($("#id_"+id).attr("style")){
		case "fill:grey;":
			$("#id_"+id).attr("style","fill:#00f4f4;");
		break;
		case "fill:#00f4f4;":
			$("#id_"+id).attr("style","fill:grey;");
		break;
	}
	
}