const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath );
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));


app.get('', (req, res)=>{
	res.render('index', {
		title: 'Weather',
		name: 'Washiul'
	});
})

app.get('/about', (req, res)=>{
	res.render('about', {
		title: 'About',
		name: 'Washiul'
	});
})

app.get('/help', (req, res)=>{
	res.render('help', {
		title: 'Help',
		name: 'Washiul'
	});
})

app.get('/weather', (req, res)=>{
	if(!req.query.address){
		return res.send({error:'You must provide an address.'});
	}

	geocode( req.query.address, (error, {latitude, longitude, location}={})=>{

		if( error ){
			return res.send({error});
		}
		
		forecast(latitude, longitude, (error, forecastData)=>{
			if( error ){
				return res.send({error});
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			});
		})
	});

})

app.get('*', (req, res)=>{
	res.render('404',{
		title: '404 Page',
		name: 'Washiul',
		errorMessage: 'Page not found.'
	});
})

app.listen(3000, ()=>{
	console.log('Server is running.');
})