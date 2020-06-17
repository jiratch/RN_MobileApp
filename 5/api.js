

export default function(code,TimeSeries) {
	var rootURL = `https://www.alphavantage.co/query?function=TIME_SERIES_${TimeSeries}&symbol=`;
	var url = `${rootURL}${code}&apikey=9O9FZH7KVD1S7TU8`;
	return fetch (url).then(function(response){
		return response.text();
	}).then(function(text){
		//console.log(text);
		let json = JSON.parse(text);
		//console.log(json);
		
		return json;
		
	});
}

