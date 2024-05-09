
// Importeer het npm pakket express uit de node_modules map
// import express from 'express'
// import path from 'path'
 async function fetchJson(url, payload = {}) {
	try{//de reden voor een try and catch is zotat er een betere error adhandeling is en dat ik de error in de console log kan zien
		//en de then als die niet reageert dan gaat die automatisch naar de catch
		return await fetch(url, payload)
			.then((response) => response.json())//reageeer op de aanroep en pas de informatie aan aar een json

	}catch (error){
		console.error('Error:', error);
	}

}
const path = require('path')
const express = require('express')
// Import the path module for dirname function
// Importeer de zelfgemaakte functie fetchJson uit de/helpers map

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))
// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));//deze regel code gebruiken vanwege middelware zodat de data leesbaar gemaakt word


app.get('/', async function (request, response) {
	const url = `https://fdnd-agency.directus.app/items/f_list/?fields=*.*.*`;


	try {
		const favorite_houses = await fetchJson(url); // dit gebruiken vanwege meerdere arrays
		if (favorite_houses.data) {
			// console.log(JSON.stringify(favorite_houses.data[1].houses[1].f_houses_id.poster_image));

			// 2 nested arrays
			const housedetails = favorite_houses.data.map(listItem => ({
				id: listItem.id,
				title: listItem.title,
				// houses arrya is de nummers van die huizen en de inhoud daarvan
				houses_array: listItem.houses.map(house => ({
					id: house.id,
					image: house.f_houses_id.poster_image
				}))
			}));

			response.render('index', {lists: housedetails});
		} else {
			console.error('No favorite houses data found');
		}
	} catch (error) {
		console.error('Error fetching house data:', error);
	}
});

app.get('/lijsten/:id', function (request, response) {
	const listId = request.params.id;
	// console.log('Fetching data for list ID:', listId);


	fetchJson(`https://fdnd-agency.directus.app/items/f_list/${listId}?fields=*.*.*`)
		.then((apiData) => {
			if (apiData.data && apiData.data.houses) { // Checken of deze 2 bestaan
				response.render('lijst.ejs',
					{
						list: apiData.data,
						houses: apiData.data.houses
					});
			}
		})
		.catch((error) => {
			console.error('Error fetching house data:', error);
		});
});

app.get('/Detailpage/:id', function (request, response) {
	const id = request.params.id

	fetchJson(`https://fdnd-agency.directus.app/items/f_houses/${id}/?fields=*.*.*`)


		.then((apiData) => {
			// request.params.id gebruik je zodat je de exacte student kan weergeven dit is
			// een routeparmater naar de route van die  specifieke persoon
			if (apiData.data) {/*als data voer dan dit uit */
				// console.log('data bestaat u gaat nu naar de Detailpage page' + JSON.stringify(apiData))
				// info gebruiken om die te linken aan apidata.data

				// console.log(JSON.stringify(favorite_houses.data));
				response.render('Detailpage', {
					house: apiData.data

				});

			} else {
				console.log('No data found for house with id: ' + request.params.id);
				//     laat de error zien als de data al niet gevonden word
			}
		})
		.catch((error) => {
			console.error('Error fetching house data:', error);
		});
});





// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)


// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
	// Toon een bericht in de console en geef het poortnummer door
	console.log(`Application started on http://localhost:${app.get('port')}`)
})
module.exports = app

