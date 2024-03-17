const path = require('path')
const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))
// Haal alle images uit de WHOIS API op
const messages = []


//fetchson is the function and url and playload zijn de optionele parameters die meegegeven worden
export default async function fetchJson(url, payload = {}) {
	try{//de reden voor een try and catch is zotat er een betere error adhandeling is en dat ik de error in de console log kan zien
		//en de then als die niet reageert dan gaat die automatisch naar de catch
		return await fetch(url, payload)
			.then((response) => response.json())//reageeer op de aanroep en pas de informatie aan aar een json

	}catch (error){
		console.error('Error:', error);
	}

}
const allData_houses = await fetchJson('https://fdnd-agency.directus.app/items/f_houses')
// file:///D:/OneDrive%20-%20HvA/jaar1/periode3/sprint7/lesmatariaal/S07W2-02-Filteren-sorteren.pdf
const favorite_houses = await fetchJson('https://fdnd-agency.directus.app/items/f_list')
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

module.exports = app
