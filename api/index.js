
// Importeer het npm pakket express uit de node_modules map
import express from 'express'
import path from 'path'

import { dirname } from 'path';

// Import the path module for dirname function
// Importeer de zelfgemaakte functie fetchJson uit de/helpers map

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

import fetchJson from '../helpers/fetch-json.js'



app.use(express.static('../public'))


const allData_houses = await fetchJson('https://fdnd-agency.directus.app/items/f_houses')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript

app.use(express.urlencoded({extended: true}));

// Maak een GET route voor de index




app.get('/', async function (request, response) {
	// Haal alle personen uit de WHOIS API op
	// hier werkt de zoekfunite niet helemaal zoals gehoopt scroll naar het einde van de pagina
	try {



		response.render('index', {
			text: 'vercel werkt:)',
			// persons: allData_houses.data,filteredimagesfirst/*hier zeg ik dat iedereen getoond moet worden*/
		});
		// https://dev.to/callmefarad/simple-query-search-in-node-express-api-4c0e


	} catch (err) {
		response.send(err.message)
	}
})

// https://medium.com/@alizhdanov/list-manipulations-in-javascript-c77ce1f2a234

// in deze code heb ik ebwust gekozen voor asyinc en await omdat de fetchjson een promise is


// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
	// Toon een bericht in de console en geef het poortnummer door
	console.log(`Application started on http://localhost:${app.get('port')}`)
})

module.exports = app