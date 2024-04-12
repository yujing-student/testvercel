
// Importeer het npm pakket express uit de node_modules map
import express from 'express'
import path from "path"


// Importeer de zelfgemaakte functie fetchJson uit de/helpers map


const app = express()

app.set('view engine', 'ejs')
app.set('views', '../views')
import fetchJson from '../helpers/fetch-json.js'
const messages = []

app.use(express.static('../public'))


const allData_houses = await fetchJson('https://fdnd-agency.directus.app/items/f_houses')
// file:///D:/OneDrive%20-%20HvA/jaar1/periode3/sprint7/lesmatariaal/S07W2-02-Filteren-sorteren.pdf
const favorite_houses = await fetchJson('https://fdnd-agency.directus.app/items/f_list')
// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));

// Maak een GET route voor de index


app.get('/', async function (request, response) {
	// Haal alle personen uit de WHOIS API op
	// hier werkt de zoekfunite niet helemaal zoals gehoopt scroll naar het einde van de pagina
	try {
		const userQuery = request.query; /*dit is het id wat de gebruiker ingeeft bij het zoekvak en die word opgelsagen in een vairable en qeury gebruik je omdat dit een zoekopdracht is*/
		const filterHouses = allData_houses.data.filter((informationHouses) => { /*dit is een array met daarin de filter waarin de gegevens van een specifieke student staan*/
			let true_or_false;/*deze waarden is leeg omdat dit true of false moet returen */
			let isValid = true;
			for (let key in userQuery) {


				let correctinformation = informationHouses[key] == userQuery[key];//check of dit klopt zo ja dan is correct information true
				true_or_false = isValid && correctinformation;/*is de ingegeveninformatie juist zo ja return*///     https://www.freecodecamp.org/news/loose-vs-strict-equality-in-javascript/
			}
			return true_or_false;
		});

		response.render('index', {
			datahouse: filterHouses,
			messages: messages,
			houses: allData_houses.data
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

