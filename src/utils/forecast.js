const request = require('request');

const forecast = (lat,lng, callback)=>{
	const url = 'http://api.weatherstack.com/current?access_key=3596d3a31b9d665ebb160bd4310e7e88&query='+lat+','+lng;
	request( { url,json: true}, function( error, response, body ){
		if( error ){
			callback("Unable to connect", undefined);
		}else if( body.error ){
			callback(body.error.info, undefined);
		}else{
			const data = body.current;
			callback(undefined, "It is "+data.temperature+" degree temperature. But it feels like "+data.feelslike+" degree temperature.");
		}
	})
}

module.exports = forecast;