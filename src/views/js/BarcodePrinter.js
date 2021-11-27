document.write('<script src="js/jquery-3.5.1.min.js"></script>');
document.write('<script src="js/jquery.base64.js"></script>');

var RootUrl = "http://localhost:8050/";

export function SendToPrinter(FuncName, JsonObject)
{
	// Response Data
	var RetArray = [];
	
	// Combine WebAPI URL
	var SendUrl = RootUrl + FuncName + "/";

	// Get Json Text
	var SendData = JSON.stringify(JsonObject);
	
	// Debug
	//alert("Url = " + SendUrl + "\r\nData = " + SendData);
	
	// Encrypt Data
	if (SendData != "")
	{
		SendData = this._encode(SendData);
	}
	
	// Send Ajax Request
	$.ajax(
	{
		url: SendUrl, 			
		type: "POST",
		cache: false,
		dataType: 'json',
		data: { EncodeData:SendData },
		async: false,
		
		success: function (data) 
		{
			// Get Json Text
			var JsonData = JSON.stringify(data);
			//alert(JsonData);
			
			// JsonData = {"AAA","BBB","CCC"}
			if (JsonData.length > 4)
			{
				// JsonData = AAA","BBB","CCC
				JsonData = JsonData.substr(2, JsonData.length - 4);
			}
			
			// ItemList[0] = AAA
			// ItemList[1] = BBB
			// ItemList[2] = CCC
			var ItemList = JsonData.split('\",\"');
			for (i = 0; i < ItemList.length; i++) 
			{
				//alert(ItemList[i]);
				var str = $.base64.decode(ItemList[i]);
				RetArray.push(str);	
			}			
		},
		
		error: function (xhr, ajaxOptions, thrownError) 
		{
			//alert(xhr.status);
			//alert(thrownError);
		}
	});	
	
	return RetArray;	
}

export function QueryUsbList()
{
	return SendToPrinter("UsbList", "");
}