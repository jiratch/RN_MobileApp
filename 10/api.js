let URL = 'https://us-central1-cloud-function-tutorial-8b196.cloudfunctions.net/products?key=1234567';

export default function() {
	return fetch(URL).then(function(response) {
		return response.text();
	}).then(function(text) {
        let json = JSON.parse(text);
        console.log(json);
		return json;
	});
}


