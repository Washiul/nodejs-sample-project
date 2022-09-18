const request = require('request');
const geocode = (address, callback)=>{

	const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoid2FzaGl1bCIsImEiOiJja3ZuZjAyZTIwa2FjMnhqcHNyZTdqeWJlIn0.3rx1KT-Wb4fewN9-GFUmqg";
	request( { url,json: true}, function( error, response, body ){
		if( error ){
			callback("Unable to connect", undefined);
		}else if( body.features.length == 0 ){
			callback("Unable to find location", undefined);
		}else{
			const latitude = body.features[0].center[1];
			const longitude = body.features[0].center[0];
			const location = body.features[0].place_name;
			console.log(location);
			const data = {
				latitude,
				longitude,
				location
			};
			callback(undefined, data);
		}
	})

}
module.exports = geocode;