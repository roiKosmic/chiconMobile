console.log("home script imported");



$("#hdwListPage").on("pagebeforecreate",function(){
			console.log("in Home Page");
			$('#closeApp').bind("click",
				function(event){
					event.preventDefault();
					console.log("closing App");
					$.getJSON(serviceURL+"/loginWebService.php",{logout: "now"},
						function(data){
							
							navigator.app.exitApp();
					
						}
					);
				});
			getHardwares();
		}
);

function getHardwares(){
	console.log("Getting Hardwares");
	$.getJSON(serviceURL+"/userRelatedWebService.php",{cmd: "getHardwares"},
			function(data){
				$('#hdwList li').remove();
				$('#hdwList').append('<li data-role="list-divider" role="heading">Your Hardwares</li>');
				console.log("Code" + data.result['code']);
				if(data.result['code']==200){
					 for( var i in data.result['data'].hdwList){
						if(data.result['data'].hdwList[i].model=="chicon_virtual"){
							targetPage = '#virtualLampPage';
						}else{
							targetPage = '#hdwDetailedPage';
						}
						$("#hdwList").append("<li><a href='"+targetPage+"' data-transition='slide' magicNumber='"+data.result['data'].hdwList[i].mn+"' serial='"+data.result['data'].hdwList[i].serial+"'>"+data.result['data'].hdwList[i].model+"&nbsp;-&nbsp;"+data.result['data'].hdwList[i].serial+"</a></li>");
					 }
					
					$('#hdwList').listview('refresh');
				}
				
				$("#hdwList a").bind("click",
					function(event){
						$target = $( event.target );
						currentSerial = $target.attr("serial");
						magicn = $target.attr("magicNumber");
						return true;
					}
				);
			}
	);

}