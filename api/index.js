const path = require('path')
const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

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
