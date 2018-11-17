
function sendAJAX(){
	var request = new XMLHttpRequest();
	var city =  document.getElementById("city").value;
	var state = document.getElementById("state").value;
	var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.' + 
			'forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22+city+%2C%20+state+%22)' +
			'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
	console.log(url);
	request.open('GET', url);
	request.onreadystatechange = function(){
		if (request.readyState === 4){
			console.log(request.responseText);
			var response = JSON.parse(request.responseText);
			document.getElementById('wc').innerHTML = response.query.results.channel.wind.chill;
			document.getElementById('wd').innerHTML = response.query.results.channel.wind.direction;
			document.getElementById('ws').innerHTML = response.query.results.channel.wind.speed;
			var newContent = '';
			for(var i = 0; i < response.query.results.channel.item.forecast.length; i++){
				newContent += '<div class = "table">';
				newContent += '<tr><td><b>' +  '  '+ response.query.results.channel.item.forecast[i].code + ',  ' + response.query.results.channel.item.forecast[i].date + ' ,  '+ response.query.results.channel.item.forecast[i].day + '  ,  '+ response.query.results.channel.item.forecast[i].high +','+' '+ response.query.results.channel.item.forecast[i].low + '  ,' + response.query.results.channel.item.forecast[i].text + '  ' + '</b></td></tr>';
				newContent += '</div>';
				console.log('Hello');
			}
			document.getElementById('table').innerHTML = newContent;
		}
	};
	request.send();
	//document.getElementById('seeweather').style.display = 'none';
}
